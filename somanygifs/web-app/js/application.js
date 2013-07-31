function GifListManager(gifs){
	var self = this;
	self.gifs = gifs;
	self.currentGif = null;
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
			//all data loaded
			self.loadGifImages();
			if (!gifLoadBuffer.length && loadCompleteCallback)
				loadCompleteCallback();
		}
	}
	
	self.loadGifImages = function(){
		for (i in gifs){
			$('<img/>', {
				'src': gifs[i].gifData.link, // url
				'load': function(){
					console.log (this.src + " has been loaded");
				}
		    });
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
	this.viewed = false;
	this.gifLoaded = false;
}

function showNextGif(){
	console.log ("shwing next..")
	
}

var gifListManager, offset = 0;

function getNextGifPackage(url, count, loadCompleteCallback){
	asyncLoader(
		url ? url : "/gif/getGif", 
		"GET", 
		{"size":(count ? count : 3), "offset":offset},
		function(response){
			var gifsObject = response.gifPackage;
			offset = response.offset;
			var gifBuffer = [];
			for (i in gifsObject){
				gifBuffer.push(new Gif(gifsObject[i], null) );
			}
			gifListManager = new GifListManager(gifBuffer);
			gifListManager.loadGifs(loadCompleteCallback);
			
		}, function(data){
			console.log("error: ")
			console.log(data);
		}
	);
}

function initializeGifLoader(url, count){
	getNextGifPackage(url, count, function(){
		showNextGif();
		initializeKeyEvents();
	});
}

var tab = false;

function initializeKeyEvents(){
	$(document).keydown(function(e){
		if (e.keyCode == 9 && e.shiftKey){
			e.preventDefault();
			e.stopPropagation();
			if (!tab){
				console.log("sh tab")
				tab = true;
			}
		} else if (e.keyCode == 9){
			e.preventDefault();
			e.stopPropagation();
			if (!tab){
				console.log("tab tab")
				tab = true;
			}
		}
	});
	$(document).keyup(function(e){
		if (tab)
			tab = false
	});
	console.log("keys init")
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