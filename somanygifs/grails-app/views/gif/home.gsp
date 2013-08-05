<!doctype html>
<html>
	<head>
		<meta name="layout" content="main"/>
		<link rel="stylesheet" href="${resource(dir: 'css', file: 'home.css')}" type="text/css">
	</head>
	<body>
		<div id="gifs-container">
			<g:textField name="input-catcher" id="input-catcher" style="position:absolute;top:-100px;z-index:100"/>
			<div id="gif-viewport">
			</div>
			<div id="gif-navigator">
				<div class="gif-navigators" id="gif-navigator-up">
					<img src="${resource(dir: 'images/icons', file: 'uArrow.jpg')}">
				</div>
				<div class="gif-navigators" id="gif-navigator-down">
					<img src="${resource(dir: 'images/icons', file: 'dArrow.jpg')}">
				</div>
			</div>
			<div id="comments-viewport">
			
			</div>
		</div>
		<script>
			$(document).ready(function(){
				initializeGifLoader("${createLink(controller:'gif', action:'getGif')}");
				$("#gifs-container").click(function(){
					$("#input-catcher").focus();
				});
				$("#input-catcher").focus();
			});
		</script>	
	</body>
</html>