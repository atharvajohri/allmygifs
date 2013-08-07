var fb_redirect_url = "";

function asyncLoader(url, type, data, successCallback, errorCallback){
	$.ajax({
		url: url,
		type: type ? type : "GET",
		data: data,
		success: function(data){
			successCallback(data);
		},
		error: function(data){
			errorCallback(data);
		}
	})
}

function showCustomMessage(message){
	$("#custom-message-container").html(message).stop().fadeIn(200).fadeOut(2500);
}

function handleLikeAction(xhr){
	console.log (xhr)
	if (xhr.status == 401){
		redirectToLogin();
	}else if (xhr.status == 200){
		var response = $.parseJSON(xhr.responseText);
		if (response.message){
			showCustomMessage(response.message)
		}
		if (response.success){
			if (response.gifLikes != undefined && response.gifLikes != null){
				$("#gif-"+response.gifId+" .gif-likes-count").html(response.gifLikes + (response.gifLikes == 1 ? " like" : " likes"));
			}
			$(".like-unlike-button").addClass("hide");
			$("#gif-"+response.gifId+" ."+response.updateAction+"-button").removeClass("hide");
		}else{
			//show message here
		}
	}
}

function shareGif(){
	var gifData = gifListManager.gifs[gifListManager.currentGifIndex].gifData;
	shareFBPost(DOMAIN + "/show/" + gifData.urlMapping, gifData.link, gifData.title, null, null, function(response){
		if (!response.post_id){
			console.log ("could not post, something went wrong")
		}
	})
}

function shareFBPost(link, picture, title, caption, footer, callback){
	console.log (link + "\n" + picture)
	FB.ui({
		method: 'feed',
		link: link,
		picture: picture,
		name: title,
		caption: caption ? caption : "Browse the best GIFs from around the internet",
		description: footer ? footer : ''
	}, function(response){
		if (callback)
			callback(response);
	});
}

function setImageDimensions(){
	var ele = $(".gif-image");
	var curW = ele.width();
	var curH = ele.height();
	if (!curW || !curH){ //image has not loaded
		setTimeout(function(){
			setImageDimensions();
		}, 300);
	}
	
	var maxW = ($(window).width() * 385/1366), maxH = ($(window).height() * 400/768);
	
	if (curW > maxW){
		ele.animate({"max-width":maxW+"px"}, 1, function(){
			setImageDimensions();
		})
	}
	
	if (curH > maxH){
		ele.animate({"max-height":maxH+"px"}, 1, function(){
			setImageDimensions();
		})
	}
}

function openPopup(element){
	$("#main-overlay").fadeIn(200, function(){
		element.fadeIn(200);
		element.find(".close-popup").click(function(){
			element.fadeOut(200);
			$("#main-overlay").fadeOut(200);
			fb_redirect_url = "";
		});
	});
}

function showFbLogin(){
	openPopup($("#fb-login"));
}

function redirectToLogin(ele_id, redirectUrl){
	if (FB_MODE == "external"){
		if (redirectUrl)
			fb_redirect_url = redirectUrl;  
		showFbLogin();
	}else{
		var redirectUri;
		if (ele_id == "header-option-add")
			redirectUri = "https://apps.facebook.com/somanygifs/add";
		else if (ele_id == "header-option-browse")
			redirectUri = "https://apps.facebook.com/somanygifs/home";
		else
			redirectUri = FB_APP_CANVASPAGE;
		top.location.href = "https://www.facebook.com/dialog/oauth?client_id="+FB_APP_ID+"&redirect_uri="+redirectUri;		
	}
}