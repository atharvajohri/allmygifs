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