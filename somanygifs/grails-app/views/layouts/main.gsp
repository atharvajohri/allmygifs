<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:fb="http://www.facebook.com/2008/fbml">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
		<title><g:layoutTitle default="Hilarious collection of GIFs from all over the internet!"/></title>
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<link rel="shortcut icon" href="${resource(dir: 'images', file: 'favicon.ico')}" type="image/x-icon">
		<link rel="stylesheet" href="${resource(dir: 'css', file: 'main.css')}" type="text/css">
		<g:javascript library="jquery" plugin="jquery"></g:javascript>
		<g:javascript library="application"/>
		<g:javascript library="constants"/>
		<fbg:resources locale="${Locale.getDefault()}" />
		<g:layoutHead/>
		<r:layoutResources />
	</head>
	<body>
<%--		Header code starts here--%>
		<div id="main-overlay"></div>
		<div id="fb-login" class="popups containers centered-elements">
			<div class="close-popup">
				X
			</div>
			<div class="tip-box">
				<div class="message-to-tip">
					Login with facebook <span id="fb-login-action">to perform this action</span>
				</div>
				<div class="tip-text">[?]</div>
				<div class="tip-content">
					<ul>
						<li>Facebook login helps us identify if you are a real person<br>
						<li>Only basic permissions are required<br>
						<li>Nothing is posted on your wall, unless you click share
					</ul>
				</div>
			</div>
			<br><br>
			<fb:login-button onlogin="facebookLoginCallback();" size="large">
				<g:message code="Login with facebook"/>
			</fb:login-button>
		</div>
		<div id="main-container">
			<g:if test="${flash.message }">
				<div id="server-message-container" class="containers centered-elements">
					${flash.message}
				</div>
			</g:if>
			<div id="header-container">
				<div class="limit-width">
					<div id="logo-container">
						<g:link controller="gif" action="home">
							<img src="${resource(dir:'images', file:'allmygifs-logo.png') }" />
						</g:link>
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
			</div>
			<div id="body-container" class="limit-width">
				<g:layoutBody/>
			</div>
			<div id="footer-container"x>
				<div id="footer-content-container" class="limit-width">
					
				</div>
			</div>
		</div>
		<r:layoutResources />
	</body>
</html>
