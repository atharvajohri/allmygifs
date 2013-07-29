package com.gifs.core

import groovy.json.JsonSlurper

class GifController {

	def utilService
	
    def index() { 
		log.info "\n--->" + params.signed_request + ", " + params.signed_request.size() + ", " + params.signed_request.size() % 4
		def data = new JsonSlurper().parseText(utilService.decodeBase64(params.signed_request))
		
		[data: data]
	}
}
