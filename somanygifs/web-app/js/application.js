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

function setupDOMEvents(){
	initializeComments();
	$(".gif-image-container").css("height",($(window).height() * 397/768)+"px");
	$(".gif-comments-container").css("height", ($(".gif-image-container").height()+80) + "px");
	$(".gif-comments-list").css("height", ($(".gif-image-container").height()-75) + "px");
	$(".gif-container").click(function(){
		$("#input-catcher").focus();
	});
	$("#input-catcher").focus();
	$(".gif-comments-list").mCustomScrollbar("update");
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

function autoHideMessages(){
	$("#server-message-container").delay(2500).fadeOut(2500);
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

var tab = false;

function initializeKeyEvents(turnOn){
	if (turnOn){
		//capture key events
		$("#input-catcher, .gif-container, .gif-navigators").off();
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
		 $(".gif-container").bind('DOMMouseScroll', function(e){
		     if(e.originalEvent.detail > 0) {
		    	 showNextGif();
		     }else {
		    	 showNextGif(true);
		     }
		     return false;
		 });
	
		 //IE, Opera, Safari
		 $(".gif-container").bind('mousewheel', function(e){
		     if(e.originalEvent.wheelDelta < 0) {
		    	 showNextGif();
		     }else {
		    	 showNextGif(true);
		     }
		     return false;
		 });
	}else{
		$("#input-catcher, .gif-container, .gif-navigators").off();
		$("#input-catcher").keydown(function(e){
			if (e.keyCode == 9 || (e.keyCode == 9 && e.shiftKey) || e.keyCode == 38 || e.keyCode == 40){
				e.preventDefault();
				e.stopPropagation();
			}
		});
		$(".gif-container").bind('DOMMouseScroll', function(e){
			return false;
		});
		$(".gif-container").bind('mousewheel', function(e){
			return false;
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