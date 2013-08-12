package com.gifs.secure

import grails.plugins.springsecurity.Secured
import grails.plugins.springsecurity.SpringSecurityService;

class SecUserController {

	def secUserService
	
    def facebookLogin() {
		if (session.facebook.uid){
			secUserService.loginUser(session.facebook.uid, false);
//			message = "You are now logged in with facebook!"
		}
		
		if (params.redirect_to)
			redirect uri: params.redirect_to
		else
			redirect controller: "Gif", action:"home"
	}
	
	@Secured(['ROLE_ADMIN'])
	def newSupervisor() {
	}
	
}
