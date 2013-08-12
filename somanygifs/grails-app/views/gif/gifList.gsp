<!doctype html>
<html>
	<head>
		<meta name="layout" content="main"/>
		<link rel="stylesheet" href="${resource(dir: 'css', file: 'add.css')}" type="text/css">
	</head>
	<body>
		GIF List
		<br>
		<table>
			<tr>
				<th>Id</th><th>Title</th><th>Link</th><th>Enabled</th>
			</tr>
		<g:each in = "${gifs }" var="gif"> 
			<tr>
				<td>${gif.id }</td><td>${gif.title }</td><td>${gif.link }</td><td>${gif.enabled }</td>
			</tr>
		</g:each>
		</table>
		<g:paginate controller="gif" action="gifList" total="${gifCount}"  max="10" />
	</body>
</html>