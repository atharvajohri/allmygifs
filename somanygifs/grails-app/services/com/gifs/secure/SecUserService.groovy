package com.gifs.secure

class SecUserService {

	def springSecurityService
	def utilService
	
	//login a user with a facebook id, if not found, will automatically create unless "dontcreate" is true
    def loginUser(fbId, dontCreate) {
		def user = springSecurityService.getCurrentUser()
		if (!user){
			user = SecUser.findByUsername(fbId)
			if (!user && !dontCreate){
				log.info "User does not exist.. creating new."
				createUser(fbId)
			}else{
				log.info "Logging in $fbId"
				springSecurityService.reauthenticate(user.username)
			}
		}else{
			log.info "User $user.username is already logged in.." 
		}
    }
	
	def createUser(fbId){
		def existingUser = SecUser.findByUsername(fbId)
		if (!existingUser){
			//create a new user
			def newUser = new SecUser(username:fbId, password:utilService.generator( (('A'..'Z')+('0'..'9')).join(), 9 ))
			if (newUser.save(flush:true)){
				//user created successfully
				SecUserSecRole.create newUser, SecRole.findByAuthority('ROLE_USER')
				log.info "Created a new user $newUser.username"
				springSecurityService.reauthenticate(newUser.username)
			}
		}
	}
}