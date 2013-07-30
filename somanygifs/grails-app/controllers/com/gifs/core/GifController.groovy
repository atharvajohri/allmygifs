package com.gifs.core

import groovy.json.JsonSlurper
import org.codehaus.groovy.grails.web.json.JSONObject
import grails.plugins.springsecurity.Secured


class GifController {

	def utilService
	def secUserService
	def springSecurityService
	
	def beforeInterceptor = {
		if (params.signed_request){
			log.info "got a signed request"
			def userDataJSON = new JsonSlurper().parseText(utilService.decodeBase64(params.signed_request))
			def userDataObject = userDataJSON as JSONObject
			if (userDataObject.user_id){
				secUserService.loginUser(userDataObject.user_id, false)
			}
			log.info "user data object: $userDataObject"
		}
	}
	
	def home(){
	}
	
	def add(){
		[message: flash.message]
	}

	@Secured(['ROLE_USER'])
	def addGif(){
		def user = springSecurityService.getCurrentUser()
		def gif = new Gif(addedBy:user, link:params.link, title:params.title)
		if (gif.save()){
			user.addToAddedGifs(gif)
			flash.message = "Added a new gif successfully"
		}else{
			gif.errors.each {println it}
			flash.message = "Unable to add gif"
		}
		redirect action: "add"
	} 
	
}
