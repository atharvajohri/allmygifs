package com.gifs

class SecUserTagLib {
	
	static namespace = "user"
	
	def showUser = { attrs ->
		def user = attrs.user
		if (user.username != "admin"){
			def outString = """
				<div class="user-info-box">
					<div class="floatL" style="display:none">
						<img src="https://graph.facebook.com/${user.username.encodeAsHTML()}/picture" class="user-thumb" />
					</div>
					<div class="floatR user-name-container">
						<a target="_blank" class="user-name" href="http://www.facebook.com/${user.username.encodeAsHTML()}">${(user.name ?: user.username).encodeAsHTML()}</a>
					</div>
				</div>
			"""
			
			out << outString
		}
	}
}
