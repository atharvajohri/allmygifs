package com.gifs.core

import java.text.SimpleDateFormat

class GifService {
	def obtainGifPackage(params){
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss")
		params.gifDate = params.gifDate ? df.parse(params.gifDate.toString()) : new Date()
		def gifs = []
		gifs.addAll(Gif.findAllByDateCreatedLessThan(params.gifDate, [offset:Long.parseLong(params.offset.toString()), max:Long.parseLong(params.size.toString())]))
		if (params.id){
			def requestedGif = Gif.get(Long.parseLong(params.id.toString()))
			gifs = gifs - [requestedGif]
			gifs = [requestedGif] + gifs
		}
		return gifs
	}
	
	def renderComment(comment){
		def outString = """
			<div class="gif-comment">
				<span class="gif-commenter"><a href="http://www.facebook.com/${comment.user.username.encodeAsHTML()}">${comment.user.name.encodeAsHTML() ?: comment.user.username.encodeAsHTML()}</a></span>
				${comment.comment.encodeAsHTML()}
			</div>
		"""
		
		return outString
	}
	
	def generateGifMapping(title){
		return title.encodeAsHTML().replaceAll(" ", "-")
	}
}
