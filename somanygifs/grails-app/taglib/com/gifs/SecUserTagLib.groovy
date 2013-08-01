package com.gifs

class SecUserTagLib {
	
	static namespace = "user"
	
	def showUser = { attrs ->
		def user = attrs.user
		def outString = """
			<div class="user-info-box">
				<div class="floatL" style="display:none">
					<img src="https://graph.facebook.com/${user.username}/picture" class="user-thumb" />
				</div>
				<div class="floatR user-name-container">
					<a target="_blank" class="user-name" href="http://www.facebook.com/${user.username}">${user.name ?: user.username}</a>
				</div>
			</div>
		"""
		
		out << outString
	}
}
