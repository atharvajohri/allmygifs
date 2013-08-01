package com.gifs

class GifTagLib {

	static namespace = "gif"

	def springSecurityService
	def secUserService
	
	def showStats = { attrs ->
		def gif = attrs.gif
		def outString = "";
		def likeButtonHtml = "";
		def user = springSecurityService.getCurrentUser()
		if (user){
			log.info "liked gifs are: \n ${user.popularityCounts}"
			if (secUserService.isGifPopularizedByUser(gif, user)){
				likeButtonHtml += g.remoteLink(controller:"gif", action:"unlikeGif", id:gif.id, onComplete:"handleLikeAction(XMLHttpRequest)"){
					"""
					<div class="like-button floatL">
						Unlike
					</div>
				"""
				}
			}else{
				likeButtonHtml += g.remoteLink(controller:"gif", action:"likeGif", id:gif.id, onComplete:"handleLikeAction(XMLHttpRequest)"){
				"""
					<div class="like-button floatL">
						Like
					</div>
				"""
				}
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
				<div class="separator floatL">|</div>
				<div class="floatL">
					${gif.popularityCounts.size() } <span class="smaller-text-80">likes</span>
				</div>
			</div>
		""" 
		out << outString
	}
}
