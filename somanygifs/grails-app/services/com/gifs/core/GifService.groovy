package com.gifs.core

import java.text.SimpleDateFormat

class GifService {
	def obtainGifPackage(params){
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss")
		params.gifDate = params.gifDate ? df.parse(params.gifDate.toString()) : new Date()
		return Gif.findAllByDateCreatedLessThan(params.gifDate, [offset:Long.parseLong(params.offset.toString()), max:Long.parseLong(params.size.toString())])
	}
	
	def renderComment(comment){
		def outString = """
			<div class="gif-comment">
				<span class="gif-commenter"><a href="http://www.facebook.com/${comment.user.username}">${comment.user.name ?: comment.user.username}</a></span>
				${comment.comment}
			</div>
		"""
		
		return outString
	}
}
