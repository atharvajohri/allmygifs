import com.gifs.secure.SecRole
import com.gifs.secure.SecUserSecRole
import com.gifs.secure.SecUser

class BootStrap {

    def init = { servletContext ->
		
		def userRole = SecRole.findByAuthority('ROLE_USER') ?: new SecRole(authority: 'ROLE_USER').save(failOnError: true)
		def adminRole = SecRole.findByAuthority('ROLE_ADMIN') ?: new SecRole(authority: 'ROLE_ADMIN').save(failOnError: true)
		
		def adminUser = SecUser.findByUsername("admin")
		if (!adminUser){
			adminUser = new SecUser(username:"admin", password:"iamanadmin").save(failOnError: true)
			SecUserSecRole.create adminUser, SecRole.findByAuthority('ROLE_ADMIN')
			log.info "created admin"
		}
    }
    def destroy = {
    }
}
