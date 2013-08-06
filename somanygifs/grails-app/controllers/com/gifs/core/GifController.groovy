package com.gifs.core

import groovy.json.JsonSlurper
import org.codehaus.groovy.grails.web.json.JSONObject
import grails.converters.JSON
import grails.plugins.springsecurity.Secured
import grails.plugins.springsecurity.SpringSecurityService;

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
		[gifUrl: "/gif/getGif"]
	}
	
	def getGif(){
		params.type = params.type ?: "JSON"
		
		if (params.type.equalsIgnoreCase("JSON")){ //return a package of gifs
			def returnData = [:]
			params.size = Integer.parseInt((params.size ?: 3).toString())
			params.offset = Integer.parseInt((params.offset ?: 0).toString())
			
			returnData.gifPackage = gifService.obtainGifPackage(params)
			returnData.offset = params.offset + params.size
			returnData.gifDate = (returnData.gifPackage.size() ? returnData.gifPackage[returnData.gifPackage.size()-1].dateCreated.toString() : null)  
			render returnData as JSON
		}else if(params.type.equalsIgnoreCase("HTML")){ //return html for a single gif
			render template: "gifHtmlTemplate", model: [gif: Gif.get(Long.parseLong(params.id.toString()))]
		}else{
			
			//todo for other formats
		}
	}
	
	@Secured(['ROLE_ADMIN'])
	def add(){
		request.message = flash.message ?: null
	}
	
	@Secured(['IS_AUTHENTICATED_FULLY'])
	def likeGif(){
		def returnData =[:]
		def user = springSecurityService.getCurrentUser()
		def likedGif = Gif.get(Long.parseLong(params.id.toString()))
		if (!secUserService.isGifPopularizedByUser(likedGif, user)){
			def popularityCount = new PopularityCount(popularizedBy: user)
			if (popularityCount.save(flush:true)){
				//add pop to gif & user
				likedGif.addToPopularityCounts(popularityCount)
				
				returnData.updateAction = "unlike"
				returnData.success = true
				returnData.gifLikes = likedGif.popularityCounts.size()
				returnData.gifId = likedGif.id
				log.info "gif ${likedGif.id} liked successfully by ${user.id} \n users likes are ${user.popularityCounts}"
			} else{
				popularityCount.errors.each {
					println it
				}
				returnData.success = false
				returnData.message = "Something went wrong. Try again later."
				//TODO parse errors and return
			}
		}else{
			log.info "gif already liked"
			returnData.success = true
			returnData.message = "Gif is already liked"
		}
		
		render returnData as JSON
	}
	
	@Secured(['IS_AUTHENTICATED_FULLY'])
	def unlikeGif(){
		def returnData = [:]
		def user = springSecurityService.getCurrentUser()
		def unlikedGif = Gif.get(Long.parseLong(params.id.toString()))
		def existingPopularityCount = secUserService.isGifPopularizedByUser(unlikedGif, user) 
		if (existingPopularityCount){
			unlikedGif.removeFromPopularityCounts(existingPopularityCount)
			existingPopularityCount.delete()
			
			returnData.success = true
			returnData.updateAction = "like"
			returnData.gifLikes = unlikedGif.popularityCounts.size()
			returnData.gifId = unlikedGif.id
			log.info "gif ${unlikedGif.id} liked successfully by ${user.id} \n users likes are ${user.popularityCounts}"
		}else{
			returnData.success = true
			returnData.message = "Gif is not liked"
		}
		
		render returnData as JSON
	}

	@Secured(['IS_AUTHENTICATED_FULLY'])
	def comment(){
		log.info "request to add comment $params.comment $params.id"
		def gif = Gif.get(Long.parseLong(params.id.toString()))
		def user = springSecurityService.getCurrentUser()
		def previousComment = Comment.findAllByUserAndGif(user, gif, [max:1])[0]
		log.info previousComment
		
		def comment = new Comment(gif: gif, user: user, comment: params.comment )
		def returnData = [:]
		if (comment.save()){
			gif.addToComments(comment)
			returnData.success = true
			returnData.html = gifService.renderComment(comment)
		}else{
			comment.errors.each {println it}
			returnData.success = false
		}
		
		render returnData as JSON
	}
	
	def show(){
		def gif;
		if (params.id){
			gif = Gif.findByUrlMapping(params.id.toString())
			if (gif){
				render view:"home", model:[gifUrl:"/gif/getGif/${gif.id}"]
				return
			}else{
				render view:'/error'
			}
		}else{
			render view:"home"
		}
	}
	
	@Secured(['ROLE_ADMIN'])
	def addGif(){
		def user = springSecurityService.getCurrentUser()
		def gif = new Gif(addedBy:user, link:params.link, title:params.title, urlMapping: gifService.generateGifMapping(params.title) )
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
