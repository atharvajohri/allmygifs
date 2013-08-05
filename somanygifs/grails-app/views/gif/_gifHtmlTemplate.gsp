<%--and so begins the code for a html template for gif--%>
<div id="gif-${gif.id}" class="gif-container">
	<div class="gif-title-container">
		${gif.title.encodeAsHTML() }	
	</div>
	<div class="gif-content-container">
		<div class="gif-image-container">
			<img src="${gif.link }" class="gif-image">
		</div>
		<div class="gif-info-container">
			<div class="gif-likes floatL">
				<gif:showStats gif="${gif}"/>
			</div>
			<div class="gif-added-by floatR">
				<user:showUser user="${gif.addedBy }"/>
			</div>
		</div>
	</div>
</div>
<div class="gif-comments-container">
	<div class="gif-comments-header">
		Comments 
		<div class="gif-comments-sort">
			<table>
				<tr>
					<td>Top</td>
					<td>Recent</td>
				</tr>
			</table>
		</div>
	</div>
	<div class="gif-comments-content">
		<sec:ifLoggedIn>
			<div class="gif-add-comment">
				<textarea class="user-gif-comment" rel="${gif.id }"></textarea>
				<div class="gif-comment-tips">
					<div class="gif-comment-tip floatL">
						Ctrl + Enter to send
					</div>
					<div class="gif-comment-tip floatR">
						<span class="comment-char-count">1000</span> Characters Left
					</div>
				</div>
			</div>
		</sec:ifLoggedIn>
		<sec:ifNotLoggedIn>
			<div class="gif-login-comment buttons" onClick="redirectToLogin()">
				Login to Comment
			</div>
		</sec:ifNotLoggedIn>
		<div class="gif-comments-list">
			<gif:showComments gif="${gif }"/>
		</div>
	</div>
</div>