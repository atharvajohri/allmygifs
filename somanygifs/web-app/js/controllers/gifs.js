var gifListManager, curGifDate;

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

function Gif(gifData, html){
	this.gifData = gifData;
	this.html = html;
	this.comments;
	this.viewed = false;
	this.gifLoaded = false;
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
			currentGif.comments = $("#gif-viewport .gif-comments-list .mCSB_container").html();
			$("#gif-navigator-up").addClass("gif-navigator-disabled");
			setupDOMEvents(firstLoad);
			$("#gifs-container").css("height", $("#gifs-container").height() + "px");
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
			setTimeout(function(){
				if (currentGif.comments){
					$(".gif-comments-list .mCSB_container").html(currentGif.comments);
					$(".no-comments").hide();
				}
				else
					currentGif.comments = $(".gif-comments-list .mCSB_container").html();
				initializeCommentDelete();
			}, 10);
			$("#input-catcher").focus();
			initializeKeyEvents(true);
			setImageDimensions();
			setupDOMEvents();
		});
	});	
	updateNavigatorClasses();
}

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
