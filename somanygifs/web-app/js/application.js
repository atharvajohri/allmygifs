if (typeof jQuery !== 'undefined') {
	(function($) {
		$(document).ready(function(){
			centerAbsoluteElements();
			autoHideMessages();
			$(".login-triggers").click(function(){
				var ele_id = $(this).attr("id");
				var redirectUri;
				if (ele_id == "header-option-add")
					redirectUri = "http://apps.facebook.com/somanygifs/add";
				else
					redirectUri = FB_APP_CANVASPAGE;
				top.location.href = "https://www.facebook.com/dialog/oauth?client_id="+FB_APP_ID+"&redirect_uri="+redirectUri;
			})
		});
	})(jQuery);
}

function autoHideMessages(){
	$("#server-message-container").delay(2500).fadeOut(2500);
}

function centerAbsoluteElements(){
	$(".centered-elements").each(function(){
		var ele = $(this);
		var parent = $(this).parent();
		var left = (parent.width() - ele.width())/2;
		ele.css("left",left+"px");
	});
}