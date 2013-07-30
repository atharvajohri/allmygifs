<!doctype html>
<html>
	<head>
		<meta name="layout" content="main"/>
		<link rel="stylesheet" href="${resource(dir: 'css', file: 'home.css')}" type="text/css">
	</head>
	<body>
		<div id="gifs-container">
			<div id="gif-viewport">
			</div>
		</div>
		<script>
			$(document).ready(function(){
				initializeGifLoader("${createLink(controller:'gif', action:'getGif')}");
			});
		</script>	
	</body>
</html>