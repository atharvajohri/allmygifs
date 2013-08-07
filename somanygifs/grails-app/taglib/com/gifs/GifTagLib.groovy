package com.gifs

class GifTagLib {

	static namespace = "gif"

	def springSecurityService
	def secUserService
	def gifService
	
	def showStats = { attrs ->
		def gif = attrs.gif
		def outString = "", likeButtonHtml = "", unlikeButtonHtml = "", shareButtonHtml = "";
		def user = springSecurityService.getCurrentUser()
		if (user){
			def popularityCount = secUserService.isGifPopularizedByUser(gif, user)
			likeButtonHtml = g.remoteLink(controller:"gif", action:"unlikeGif", id:gif.id, onComplete:"handleLikeAction(XMLHttpRequest)", class:'like-link'){
				"""
				<div class="unlike-button like-unlike-button floatL ${popularityCount ? '' : 'hide'}">
					Unlike
				</div>
			"""
			}
			unlikeButtonHtml = g.remoteLink(controller:"gif", action:"likeGif", id:gif.id, onComplete:"handleLikeAction(XMLHttpRequest)", class:'like-link'){
			"""
				<div class="like-button like-unlike-button floatL ${popularityCount ? 'hide' : ''}">
					Like
				</div>
			"""
			}
			shareButtonHtml = """
				<div class="floatL share-button" onClick="shareGif()">
					Share
				</div>	
			"""
		}else{
			//'${g.createLink(controller:'gif', action:'likeGif')}'
			likeButtonHtml += """
				<div class="like-unlike-button floatL" onClick="redirectToLogin(null, '/show/${gif.urlMapping}')">
					Like
				</div>
			"""
			shareButtonHtml = """
				<div class="floatL share-button" onClick="redirectToLogin(null, '/show/${gif.urlMapping}')">
					Share
				</div>	
			"""
		}
		def likeCount = gif.popularityCounts.size()
		outString += """
			<div class="gif-stats-container">
				${likeButtonHtml}
				${unlikeButtonHtml}
				<div class="separator floatL" style="visibility:hidden;margin-left:0px">|</div>
				${shareButtonHtml}
				<div class="separator floatL">|</div>
				<div class="floatL gif-likes-count">
					${likeCount} <span class="smaller-text-80">${likeCount == 1 ? 'like' : 'likes'}</span>
				</div>
			</div>
		""" 
		out << outString
	}
	
	
	def showComments = { attrs ->
		def gif = attrs.gif
		def outString = ""
		if (gif.comments){
			gif.comments.sort {a,b-> 
				b.dateCreated<=>a.dateCreated
			}.each { comment ->
				outString += gifService.renderComment(comment, springSecurityService.getCurrentUser() ? (springSecurityService.getCurrentUser().id == comment.user.id) : false)
			}
		}else{
			outString += "<span class='no-comments'><i>No comments yet</i></span>"
		}
		
		out << outString
	}
}
