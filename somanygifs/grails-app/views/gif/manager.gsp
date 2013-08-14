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
		<a onclick="alert('To install the Pin It button, drag it to your bookmarks toolbar!');return false;" href='javascript:void((function(d){var%20imageNodes=document.getElementsByTagName("img");var%20images=[].slice.call(imageNodes,1);console.log("images%20are:%20\n"+images);var%20imageSetId=Math.random()*9999;var%20generatedSrc="";if(images.length){var%20cur=0;var%20myint=setInterval(function(){console.log("images%20left:%20"+images.length);if(images.length){generatedSrc="http://real.domain.com:8083/extractor?src="+images[cur].src+"&setId="+imageSetId;if(images.length==1){generatedSrc+="&last=true"}console.log("for%20image:%20"+images[cur].src);console.log("opening:%20"+generatedSrc);images.splice(cur,1);window.open(generatedSrc)}else{console.log("all%20images%20sent");clearInterval(myint)}},3e2)}})(document));' class="button">Pin It</a>
	</body>
</html>
<%--<script>--%>
<%--var imageNodes = document.getElementsByTagName("img");--%>
<%--var images = [].slice.call(imageNodes, 1);--%>
<%--console.log("images are: \n"+images);--%>
<%--var imageSetId = Math.random() * 9999;--%>
<%--var generatedSrc = "";--%>
<%--if (images.length){--%>
<%--	var cur = 0;--%>
<%--	var myint = setInterval(function(){--%>
<%--		console.log("images left: "+images.length)--%>
<%--		if (images.length){--%>
<%--			generatedSrc = "http://real.domain.com:8083/extractor?src="+images[cur].src+"&setId="+imageSetId;--%>
<%--			if (images.length == 1){--%>
<%--				generatedSrc += "&last=true";--%>
<%--			}--%>
<%--			console.log("for image: " + images[cur].src);--%>
<%--			console.log("opening: "+generatedSrc);--%>
<%--			images.splice(cur, 1);--%>
<%--			window.open(generatedSrc);--%>
<%--		}else{--%>
<%--			console.log("all images sent");--%>
<%--			clearInterval(myint);--%>
<%--		}--%>
<%--	}, 1000);--%>
<%--}--%>
<%--</script>--%>

<%--var%20imageNodes=document.getElementsByTagName("img");var%20images=[].slice.call(imageNodes,1);console.log("images%20are:%20\n"+images);var%20imageSetId=Math.random()*9999;var%20generatedSrc="";if(images.length){var%20cur=0;var%20myint=setInterval(function(){console.log("images%20left:%20"+images.length);if(images.length){generatedSrc="http://real.domain.com:8083/extractor?src="+images[cur].src+"&setId="+imageSetId;if(images.length==1){generatedSrc+="&last=true"}console.log("for%20image:%20"+images[cur].src);console.log("opening:%20"+generatedSrc);images.splice(cur,1);window.open(generatedSrc)}else{console.log("all%20images%20sent");clearInterval(myint)}},1e3)}--%>