<!doctype html>
<html>
	<head>
		<meta name="layout" content="main"/>
		<link rel="stylesheet" href="${resource(dir: 'css', file: 'add.css')}" type="text/css">
	</head>
	<body>
		<div id="add-gifs-container">
			<div class="page-titles">Add a GIF:</div>
			<g:form controller="gif" action="addGif">
				<table id="add-gif-table">
					<tr>
						<td>Title:</td><td><g:textField name="link"/></td>
					</tr>
					<tr>
						<td>Link:</td><td><g:textField name="title"/></td>
					</tr>
					<tr>
						<td colspan=2 align="center">
							<g:submitButton name="Submit Gif" value="Submit"/>
						</td>
					</tr>
				</table>
			</g:form>
		</div>	
	</body>
</html>