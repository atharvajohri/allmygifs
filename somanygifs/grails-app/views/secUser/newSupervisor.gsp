<!doctype html>
<html>
	<head>
		<meta name="layout" content="main"/>
		<link rel="stylesheet" href="${resource(dir: 'css', file: 'add.css')}" type="text/css">
	</head>
	<body>
		<div class="containers">
			Add a supervisor:
			<div class="containers">
				<g:form controller="secUser" action="addSupervisor">
					<table>
						<tr>
							<td>Email</td><td><g:textField name="email"/></td>
							<td valign="top">About You: ()</td><td><g:textArea name="email"/></td>
							<td>Email</td><td><g:textField name="email"/></td>
						</tr>
					</table>
				</g:form>
			</div>
		</div>
	</body>
</html>