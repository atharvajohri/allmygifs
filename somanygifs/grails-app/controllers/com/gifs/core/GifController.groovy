package com.gifs.core

import groovy.json.JsonSlurper
import org.codehaus.groovy.grails.web.json.JSONObject
import grails.converters.JSON
import grails.plugins.springsecurity.Secured
import org.codehaus.groovy.grails.commons.DefaultGrailsApplication
import org.codehaus.groovy.grails.web.converters.ConverterUtil


class GifController {

	def utilService
	def secUserService
	def springSecurityService
	def gifService
	
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
	
	def getGif(){
		params.type = params.type ?: "JSON"
		
		if (params.type.equalsIgnoreCase("JSON")){
			def returnData = [:]
			params.size = Integer.parseInt(params.size.toString()) ?: 3
			params.offset = Integer.parseInt(params.offset.toString()) ?: 0
			
			returnData.gifPackage = gifService.obtainGifPackage(params.size, params.offset)
			returnData.offset = params.offset + params.size
			
			render returnData as JSON
		}else if(params.type.equalsIgnoreCase("HTML")){
			render template: "gifHtmlTemplate", model: [gif: Gif.get(Long.parseLong(params.id.toString()))]
		}else{
			
			//todo for other formats
		}
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
