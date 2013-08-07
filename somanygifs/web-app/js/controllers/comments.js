function initializeComments(){
	var txt = $('.user-gif-comment'), hiddenDiv = $(document.createElement('div')), content = null;
	hiddenDiv.addClass('hidden-comment');
	$('body').append(hiddenDiv);
	
	txt.on('keypress', function () {
		if ($(this).val().length < 1000){
		    content = escape($(this).val());
		    content = content.replace(/\n/g, '<br>');
		    hiddenDiv.html(content + '<br class="lbr">');
		    $(this).css('height', hiddenDiv.height());
		}
	});

	txt.on("keyup", function(){
		$(".comment-char-count").html(1000 - $(this).val().length);
	});
	
	$(".user-gif-comment").click(function(e){
		e.stopPropagation();
		e.preventDefault();
	});
	$(".user-gif-comment").keydown(function(e){
		if (e.ctrlKey && e.keyCode == 13){
			console.log($(this).val() + ", " + $(this).attr("rel"))
			postComment($(this).val(), $(this).attr("rel"));
			$(this).attr("disabled","disabled");
		}
	});
	$(".gif-comments-list").mCustomScrollbar({
		theme:"dark-2"
	});
	
	initializeCommentDelete();
	
}

function initializeCommentDelete(){
	$(".gif-comment-delete").click(function(){
		if ($(this).attr("rel")){
			asyncLoader("/commentDelete", "POST", {"id":$(this).attr("rel")}, function(data){
				if (data.success){
					$(data.selector).remove();
					var currentGif = gifListManager.gifs[gifListManager.currentGifIndex];
					var updatedHtml = $("#gif-viewport .gif-comments-list .mCSB_container").html().trim();
					if (updatedHtml)
						currentGif.comments = $("#gif-viewport .gif-comments-list .mCSB_container").html();
					else{
						$(".no-comments").show();
						delete currentGif.comments;
					}
				}
				if (data.message){
					showCustomMessage(data.message)
				}
			}, function(data){
				console.log(data)
			});
		}
	});
}

function postComment(commentText, id){
	if (commentText.length){
		asyncLoader("/comment", "POST", {"comment":commentText, "id":id}, function(data){
			if (data.success){
				var currentGif = gifListManager.gifs[gifListManager.currentGifIndex]
				if (!currentGif.comments)
					currentGif.comments = $(".gif-comments-list .mCSB_container").html();
				currentGif.comments = data.html + currentGif.comments;
				$(".gif-comments-list .mCSB_container").html(currentGif.comments);
				$(".gif-comments-list").mCustomScrollbar("update");
				$(".no-comments").hide();
				$(".user-gif-comment").val("");
				initializeCommentDelete();
			}
			if (data.message){
				showCustomMessage(data.message)
			}
			$(".user-gif-comment").removeAttr("disabled");
		}, function(data){
			console.log(data)
		});
	}else{
		showCustomMessage("Please enter some comment text")
	}
}

