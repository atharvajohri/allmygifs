<!DOCTYPE html>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
		<title><g:layoutTitle default="GIFbook"/></title>
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<link rel="shortcut icon" href="${resource(dir: 'images', file: 'favicon.ico')}" type="image/x-icon">
		<link rel="stylesheet" href="${resource(dir: 'css', file: 'main.css')}" type="text/css">
		<g:javascript library="jquery" plugin="jquery"></g:javascript>
		<g:javascript library="application"/>
		<g:javascript library="constants"/>
		<g:layoutHead/>
		<r:layoutResources />
	</head>
	<body>
<%--		Header code starts here--%>
		<div id="main-container">
			<g:if test="${message }">
				<div id="server-message-container" class="containers centered-elements">
					${message }
				</div>
			</g:if>
			<div id="header-container">
				<div id="logo-container">
					<img src="${resource(dir:'images', file:'gb-logo.png') }" />
				</div>
				<div id="header-options-container">
					<g:link controller="gif" action="home">
						<div class="login-triggers header-options" id="header-option-browse">
							Browse
						</div>
					</g:link>
					<sec:ifLoggedIn>
						<g:link controller="gif" action="add">
							<div class="header-options" id="header-option-add">
								Add
							</div>
						</g:link>
					</sec:ifLoggedIn>
					<sec:ifNotLoggedIn>
						<div class="login-triggers header-options" id="header-option-add">
							Add
						</div>
					</sec:ifNotLoggedIn>
				</div>	
			</div>
			<div id="body-container">
				<g:layoutBody/>
			</div>
			<div id="footer-container" class="containers">
				Developed and maintained by <b><a href="http://www.facebook.com/atharva.johri">Atharva Johri</a></b>
			</div>
		</div>
		<r:layoutResources />
	</body>
</html>
