<!doctype html>
<html>
	<head>
		<meta name="layout" content="main"/>
		<link rel="stylesheet" href="${resource(dir: 'css', file: 'add.css')}" type="text/css">
	</head>
	<body>
		<g:if test= "${user.isSupervisor }">
			<div id="add-gifs-container">
				<div class="page-titles">Add a GIF:</div>
				<g:form controller="gif" action="addGif">
					<table id="add-gif-table">
						<tr>
							<td>Title:</td><td><g:textField name="title" class="text-fields"/></td>
						</tr>
						<tr>
							<td>Link:</td><td><g:textField name="link" class="text-fields"/></td>
						</tr>
						<tr>
							<td colspan=2 align="center">
								<g:submitButton name="Submit Gif" value="Submit"/>
							</td>
						</tr>
					</table>
				</g:form>
			</div>
		</g:if><g:else>
			<div class="containers">
				<b>allmyGIFs is currently in beta</b> and only supervisors are allowed to add new GIFs.
				<br>
				If you have a supervisor invitation key, enter it below:<br>
				<g:textField name="inviteKey"/>
				<br>
				Else you may apply for one by clicking <a href="#">here</a>
			</div>
		</g:else>
	</body>
</html>