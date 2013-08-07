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
	
	def renderComment(comment, deleteAllowed){
		def deleteCommentHtml = ""
		if (deleteAllowed){
			deleteCommentHtml = """
				<div class="gif-comment-delete" rel="${comment.id}">
					x
				</div>
			"""
		}
		def outString = """
			<div class="gif-comment" id="comment-${comment.gif.id}-${comment.user.id}-${comment.id}">
				$deleteCommentHtml
				<span class="gif-commenter"><a href="http://www.facebook.com/${comment.user.username.encodeAsHTML()}">${comment.user.name.encodeAsHTML() ?: comment.user.username.encodeAsHTML()}</a></span>
				${comment.comment.encodeAsHTML()}
			</div>
		"""
		
		return outString
	}
	
	def generateGifMapping(title){
		return title.encodeAsHTML().replaceAll(" ", "-")
	}
	
	def isCommentSpam(gif, user){
		def previousComment = Comment.findAllByUserAndGif(user, gif, [max:1])[0]
		if (previousComment){
			log.info "user has commented before at: ${previousComment.dateCreated}"
			Calendar cal=Calendar.getInstance()
			cal.setTime(previousComment.dateCreated)
			cal.add(Calendar.MINUTE, 0)
			def newDate = cal.getTime()
			log.info "comparing ${previousComment.dateCreated} > ${new Date()} "
			if (newDate > (new Date())){
				log.info "${newDate} is within 5 mins"
				return true
			}
		}
		
		return false
	}
}
