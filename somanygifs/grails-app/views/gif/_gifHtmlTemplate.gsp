<%--and so begins the code for a html template for gif--%>
<div id="gif-${gif.id}" class="gif-container">
	<div class="gif-title-container">
		${gif.title.encodeAsHTML() }	
	</div>
	<div class="gif-content-container">
		<img src="${gif.link }" class="gif-image">
	</div>
</div>