function GifListManager(gifs){
	var self = this;
	self.gifs = gifs;
	self.currentGif;
	var gifLoadBuffer = [];
	
	self.loadGifs = function(loadCompleteCallback){
		for (i in gifs){
			if (!gifs[i].loaded)
				gifLoadBuffer.push(gifs[i]);
		}
		self.loadNextGif(loadCompleteCallback);
	}
	
	self.loadNextGif = function(loadCompleteCallback){
		if (gifLoadBuffer.length){
			var nextGif = self.getNextGifForLoad();
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
			//all loaded
			if (!gifLoadBuffer.length && loadCompleteCallback)
				loadCompleteCallback();
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

if (typeof jQuery !== 'undefined') {
	(function($) {
		$(document).ready(function(){
			centerAbsoluteElements();
			autoHideMessages();
			$(".login-triggers").click(function(){
				var ele_id = $(this).attr("id");
				var redirectUri;
				if (ele_id == "header-option-add")
					redirectUri = "https://apps.facebook.com/somanygifs/add";
				else if (ele_id == "header-option-browse")
					redirectUri = "https://apps.facebook.com/somanygifs/home";
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

function Gif(gifData, html){
	this.gifData = gifData;
	this.html = html;
}

function showNextGif(){
	console.log (gifBuffer)
	
//	asyncLoader(
//		
//	)
}

var gifListManager, offset = 0;

function initializeGifLoader(url, count){
	asyncLoader(
		url ? url : "/gif/getGif", 
		"GET", 
		{"size":(count ? count : 3), "offset":offset},
		function(response){
			var gifsObject = response.gifPackage;
			offset = response.offset;
			var gifBuffer = [];
			for (i in gifsObject){
				gifBuffer.push(new Gif(gifsObject[i], false) );
			}
			gifListManager = new GifListManager(gifBuffer);
			gifListManager.loadGifs();
			
		}, function(data){
			console.log("error: ")
			console.log(data);
		}
	);
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