<!doctype html>
<html>
	<head>
		<meta name="layout" content="main"/>
		<link rel="stylesheet" href="${resource(dir: 'css', file: 'add.css')}" type="text/css">
	</head>
	<body>
		GIF Manager
		<br>
		<g:link controller="gif" action="gifList">Manage GIFs</g:link><br>
		<g:link controller="gif" action="gifList">Manage Users</g:link><br>
		<g:link controller="SecUser" action="addSupervisor">Add Supervisor</g:link><br>
	</body>
</html>