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
			$(this).val('');
		}
	});
	$(".gif-comments-list").mCustomScrollbar();
}

function postComment(commentText, id){
	asyncLoader("/comment", "POST", {"comment":commentText, "id":id}, function(data){
		console.log("success")
		if (data.success){
			var currentGif = gifListManager.gifs[gifListManager.currentGifIndex]
			if (!currentGif.comments)
				currentGif.comments = $(".gif-comments-list .mCSB_container").html();
			currentGif.comments = data.html + currentGif.comments;
			$(".gif-comments-list .mCSB_container").html(currentGif.comments);
			$(".gif-comments-list").mCustomScrollbar("update");
		}
	}, function(data){
		console.log("err")
		console.log(data)
	});
}

