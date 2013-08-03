if (typeof jQuery !== 'undefined') {
	(function($) {
		$(document).ready(function(){
			centerAbsoluteElements();
			autoHideMessages();
			setupTipboxEvents();
//			setupFooter();
			$(".login-triggers").click(function(e){
				var ele_id = $(this).attr("id");
				redirectToLogin(ele_id);
			});
		});
	})(jQuery);
}

function setupFooter(){
	var width = $(window).width() - 100;
	$("#footer-container").css("width",width+"px");
}

function setupTipboxEvents(){
	$(".tip-text").hover(
		function(){
			$(this).parent().find(".tip-content").css("display","block");
		},
		function(){
			$(this).parent().find(".tip-content").css("display","none");
		}
	);
}

var fb_redirect_url;

function facebookLoginCallback(){
	FB.getLoginStatus(function(response) {
		if (response.status === 'connected') {
			// logged in and connected user, someone you know
			window.location ="/facebookLogin?redirect_to="+fb_redirect_url;
		}
	});
}

function centerAbsoluteElements(){
	$(".centered-elements").each(function(){
		var ele = $(this);
		var parent = $(this).parent();
		var left = (parent.width() - ele.width())/2;
		var cssOptions = {};
		cssOptions.left = left + "px";
		if (ele.hasClass("popups")){ //vertically center popups
			var totalHt = $(window).height();
			var marTop = totalHt/5 + "px";
			cssOptions["margin-top"] = marTop;
		}
		ele.css(cssOptions);
	});
}

function openPopup(element){
	$("#main-overlay").fadeIn(200, function(){
		element.fadeIn(200);
		element.find(".close-popup").click(function(){
			element.fadeOut(200);
			$("#main-overlay").fadeOut(200);
		});
	});
}

function showFbLogin(){
	openPopup($("#fb-login"));
}

function redirectToLogin(ele_id){
	if (FB_MODE == "external"){
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

function GifListManager(gifs){
	var self = this;
	self.gifs = gifs;
	self.currentGifIndex = -1;
	var gifLoadBuffer = [];
	var gifLoadAfter = 2;
	
	self.loadGifs = function(loadCompleteCallback){
		for (var i in gifs){
			if (!gifs[i].loaded)
				gifLoadBuffer.push(gifs[i]);
		}
		self.loadNextGif(loadCompleteCallback);
	}
	
	self.addNewGifs = function(newGifBuffer){
		for (var i in newGifBuffer){
			self.gifs.push(newGifBuffer[i]);
		}
	}
	
	self.retrieveNextGif = function(prev){
		if (prev)
			self.currentGifIndex--;
		else
			self.currentGifIndex++;
		
		if (self.currentGifIndex > 0 && self.currentGifIndex % gifLoadAfter == 0){
			console.log("loading gifs")
			self.loadGifs();
		}
		
		if (self.currentGifIndex == (gifs.length - 2)){ // user viewing second last gif
			console.log("retrieving gifs")
			getNextGifPackage(null, null, function(){
				console.log("next gifs have been retrieved...")	
			});
		}
		return self.gifs[self.currentGifIndex];
	}
	
	self.loadNextGif = function(loadCompleteCallback){
		var nextGif = self.getNextGifForLoad();
		if (gifLoadBuffer.length && nextGif){
			asyncLoader(
				"/gif/getGif",
				"POST",
				{type:"HTML", id:nextGif.gifData.id},
				function(data){
					nextGif.html = data;
					gifLoadBuffer.splice(0,1);
					self.loadNextGif(loadCompleteCallback);
				},
				function(data){
					console.log("err while loading 1 gif html")
					console.log(data)
				}
			);
		}else{
			//all data loaded
			self.loadGifImages();
			if (!gifLoadBuffer.length && loadCompleteCallback)
				loadCompleteCallback();
		}
	}
	
	self.loadGifImages = function(index){
		var found = false;
		for (var i in gifs){
			if (!gifs[i].gifLoaded){
				console.log ("Now trying to load: " + gifs[i].gifData.link);
				found = true;
				var curGif = gifs[i];
				$('<img/>', {
					'src': curGif.gifData.link, // url
					'load': function(){
						for (var i in gifs){
							if (gifs[i] == this.src){
								gifs[i].gifLoaded = true;
								console.log (this.src + " has been loaded");
							}
						}
					}
			    });
			}
		}
/*Following is to load gifs synchronously */	
/* this function ensures that all gifs are loaded 1 by 1. 
 * multiple requests are not sent to retrieve gifs, so each
 * one is retrieved faster. 
 * multiple requests can only be sent if user asks for next.
 */
//		if (!index)
//			index = 0;
//		for (i in gifs){
//			if (i==index){
//				found = true;
//				var curGif = gifs[i];
//				$('<img/>', {
//					'src': curGif.gifData.link, // url
//					'load': function(){
//						console.log (curGif.gifData.link + " has been loaded");
//						curGif.gifLoaded = true;
//						index++;
//						self.loadGifImages(index);
//					}
//			    });
//				break;
//			}
//		}
		if (!found){
			console.log("all gif images are loaded");
		}
	}
	
	self.getNextGifForLoad = function(){
		for (i in gifLoadBuffer){
			if (!gifLoadBuffer[i].html){
				return gifLoadBuffer[i]
			}
		}
	}
}

function autoHideMessages(){
	$("#server-message-container").delay(2500).fadeOut(2500);
}

function Gif(gifData, html){
	this.gifData = gifData;
	this.html = html;
	this.viewed = false;
	this.gifLoaded = false;
}

function updateNavigatorClasses(){
	if (gifListManager.currentGifIndex == (gifListManager.gifs.length-1)){
		$("#gif-navigator-down").addClass("gif-navigator-disabled");
	}else if(gifListManager.currentGifIndex == 0){
		$("#gif-navigator-up").addClass("gif-navigator-disabled");
	}else{
		$(".gif-navigators").removeClass("gif-navigator-disabled");
	}
}

function showNextGif(prev, firstLoad){
	var position1, position2, currentGif;
	var positionTop = goUpBy = -1*$("#gif-viewport").height() + "px";
	var positionBot = (parseInt($("#gif-viewport").parent().offset().top) + parseInt($("#gif-viewport").parent().height())) + "px";
	if (!prev){
		if (gifListManager.currentGifIndex == (gifListManager.gifs.length-1)){ //reached last
			return;
		}
		currentGif = gifListManager.retrieveNextGif();
		if (firstLoad){
			$("#gif-viewport").html(currentGif.html);
			$(".gif-image-container").css("height",($(window).height() * 397/768)+"px");
			$("#body-container").css("height",($(window).height() * 525/768)+"px");
			$("#gif-navigator-up").addClass("gif-navigator-disabled");
			return;
		}
		position1 = positionTop;
		position2 = positionBot;
	}else{
		if (gifListManager.currentGifIndex == 0) //reached first
			return;
		currentGif = gifListManager.retrieveNextGif(true);
		position1 = positionBot;
		position2 = positionTop;
	}
	currentGif.viewed = true;
	initializeKeyEvents(false);
	$("#gif-viewport").animate({"top":position1}, 200, "linear", function(){
		$("#gif-viewport").html(currentGif.html);
		$("#gif-viewport").css({"top":position2});
		$("#gif-viewport").animate({"top":"0px"}, 200, "linear", function(){
			$("#input-catcher").focus();
			initializeKeyEvents(true);
			setImageDimensions();
			$(".gif-image-container").css("height",($(window).height() * 397/768)+"px");
		});
	});	
	updateNavigatorClasses();
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

var gifListManager, curGifDate;

function getNextGifPackage(url, count, loadCompleteCallback){
	asyncLoader(
		url ? url : "/gif/getGif", 
		"GET", 
		{"size":(count ? count : 3), "gifDate":curGifDate},
		function(response){
			var gifsObject = response.gifPackage;
			console.log ("obtained " + gifsObject.length + " gifs")
			if (gifsObject.length){
				curGifDate = response.gifDate;
				var gifBuffer = [];
				for (i in gifsObject){
					gifBuffer.push(new Gif(gifsObject[i], null) );
				}
				if (!gifListManager)
					gifListManager = new GifListManager(gifBuffer);
				else{
					gifListManager.addNewGifs(gifBuffer);
				}
					
				gifListManager.loadGifs(loadCompleteCallback);
			}else{
				//handle no gifs received
			}
		}, function(data){
			console.log("error: ")
			console.log(data);
		}
	);
}

function initializeGifLoader(url, count){
	getNextGifPackage(url, count, function(){
		showNextGif(false, true);
		initializeKeyEvents(true);
	});
}

var tab = false;

function initializeKeyEvents(turnOn){
	if (turnOn){
		//capture key events
		$("#input-catcher, #main-container, .gif-navigators").off();
		$("#input-catcher").keydown(function(e){
			if (e.keyCode == 38 ||(e.keyCode == 9 && e.shiftKey)){
				e.preventDefault();
				e.stopPropagation();
				if (!tab){
					tab = true;
					showNextGif(true);
				}
			} else if (e.keyCode == 9 || e.keyCode == 40){
				e.preventDefault();
				e.stopPropagation();
				if (!tab){
					tab = true;
					showNextGif();
				}
			}
		});
		$("#input-catcher").keyup(function(e){
			if (tab)
				tab = false
		});
		$("#gif-navigator-up").click(function(){
			showNextGif(true);
		});
		$("#gif-navigator-down").click(function(){
			showNextGif();
		})
		//capture scroll events
		//Firefox
		 $("#main-container").bind('DOMMouseScroll', function(e){
		     if(e.originalEvent.detail > 0) {
		    	 showNextGif();
		     }else {
		    	 showNextGif(true);
		     }
		     return false;
		 });
	
		 //IE, Opera, Safari
		 $("#main-container").bind('mousewheel', function(e){
		     if(e.originalEvent.wheelDelta < 0) {
		    	 showNextGif();
		     }else {
		    	 showNextGif(true);
		     }
		     return false;
		 });
	}else{
		$("#input-catcher, #main-container, .gif-navigators").off();
		$("#input-catcher").keydown(function(e){
			if (e.keyCode == 9 || (e.keyCode == 9 && e.shiftKey) || e.keyCode == 38 || e.keyCode == 40){
				e.preventDefault();
				e.stopPropagation();
			}
		});
		$("#main-container").bind('DOMMouseScroll', function(e){
			return false;
		});
		$("#main-container").bind('mousewheel', function(e){
			return false;
		});
	}
}

function handleLikeAction(xhr){
	console.log (xhr)
	if (xhr.status == 401){
		redirectToLogin();
	}else if (xhr.status == 200){
		var response = $.parseJSON(xhr.responseText);
		console.log(response)
		if (response.success){
			$("#gif-"+response.gifId+" .gif-likes-count").html(response.gifLikes + (response.gifLikes == 1 ? " like" : " likes"));
			$(".like-unlike-button").addClass("hide");
			$("#gif-"+response.gifId+" ."+response.updateAction+"-button").removeClass("hide");
		}else{
			//show message here
		}
	}
}

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