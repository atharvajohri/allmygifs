package com.gifs.secure

class SecUserController {

	def secUserService
	
    def facebookLogin() {
		def message = "Could not authenticate. Try again later."
		if (session.facebook.uid){
			secUserService.loginUser(session.facebook.uid, false);
			message = "You are now logged in with facebook!"
		}
		
		redirect controller: "Gif", action:"home"
	}
	
}
