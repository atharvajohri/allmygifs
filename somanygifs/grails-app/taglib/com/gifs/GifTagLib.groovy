package com.gifs

class GifTagLib {

	static namespace = "gif"

	def springSecurityService
	def secUserService
	
	def showStats = { attrs ->
		def gif = attrs.gif
		def outString = "", likeButtonHtml = "", unlikeButtonHtml = "";
		def user = springSecurityService.getCurrentUser()
		if (user){
			log.info "liked gifs are: \n ${user.popularityCounts}"
			likeButtonHtml = g.remoteLink(controller:"gif", action:"unlikeGif", id:gif.id, onComplete:"handleLikeAction(XMLHttpRequest)", class:'like-link'){
				"""
				<div class="unlike-button like-unlike-button floatL ${secUserService.isGifPopularizedByUser(gif, user) ? '' : 'hide'}">
					Unlike
				</div>
			"""
			}
			unlikeButtonHtml = g.remoteLink(controller:"gif", action:"likeGif", id:gif.id, onComplete:"handleLikeAction(XMLHttpRequest)", class:'like-link'){
			"""
				<div class="like-button like-unlike-button floatL ${secUserService.isGifPopularizedByUser(gif, user) ? 'hide' : ''}">
					Like
				</div>
			"""
			}
		}else{
			likeButtonHtml += """
				<div class="like-button floatL" onClick="redirectToLogin()">
					Like
				</div>
			"""
		}
		outString += """
			<div class="gif-stats-container">
				${likeButtonHtml}
				${unlikeButtonHtml}
				<div class="separator floatL">|</div>
				<div class="floatL gif-likes-count">
					${gif.popularityCounts.size() } <span class="smaller-text-80">likes</span>
				</div>
			</div>
		""" 
		out << outString
	}
}