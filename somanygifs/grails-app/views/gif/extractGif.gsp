<!doctype html>
<html>
	<head>
		<meta name="layout" content="main"/>
		<style>
			.extracted-image {margin:10px;width:300px;border:1px solid #dedede;}
		</style>
	</head>
	<body>
		<div class="containers">
			<g:if test="${extractedGifs }">
				Extracted:<br>
				<g:each in="${extractedGifs }" var="gif">
					<img src="${gif.src }" class="extracted-image">
				</g:each>
			</g:if>
			<script>
				$(document).ready(function(){
					var last = "${last}"
					if (!last){
						window.close();
					}
				});
			</script>
		</div>	
	</body>
</html>