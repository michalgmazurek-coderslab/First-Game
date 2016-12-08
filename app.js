document.addEventListener("DOMContentLoaded", function() {
	var self;
	
	var Furry = function(x, y) {
		this.x = x;
		this.y = y;
		this.direction = "right";
	}
	
	var Coin = function() {
		this.x = Math.floor(Math.random() * 10);
		this.y = Math.floor(Math.random() * 10);
	}
													
	var Game = function() {
		
		self = this;
	
		this.sounds = [];
		this.furry = new Furry(0, 0);
		this.coin = new Coin();
		this.board = document.querySelectorAll("#board div");
		this.score = 0;
		this.scoreBoard = document.querySelector("#score span");
		this.levels();
		this.generator();
		this.control();
		this.soundInit();
		this.sounds.bg.play();
	}	
	
	Game.prototype.soundInit = function(){
		var sounds = document.querySelectorAll("audio");
		console.log(sounds);

		this.sounds.finish = sounds[0];
		this.sounds.coin = sounds[1];
		this.sounds.coin.volume=1;
		this.sounds.bg = sounds[2];
		
		this.sounds.bg.volume=0.15;
	}
	
	Game.prototype.generator = function() {
		
		for (var i = 0; i < this.board.length; i++) {
			this.board[i].classList.remove("furry");
		}
		
		var furryBox = this.furry.x + this.furry.y * 10;
		if(this.board[furryBox]!=undefined){
		this.board[furryBox].classList.add("furry");
		}
		
		var coinBox = this.coin.x + this.coin.y * 10;
		this.board[coinBox].classList.add("coin");
	};
	
	Game.prototype.control = function () {
		
		document.addEventListener("keydown", function(event){
			if (event.keyCode === 39) {
				self.furry.direction = "right";
				return;
			} else if (event.keyCode === 37) {	
				self.furry.direction = "left";
				return;
			} else if (event.keyCode === 38) {
				self.furry.direction = "up";
				return;
			} else if (event.keyCode === 40) {
				self.furry.direction = "down";
				return;
			}	
			//self.oneMove();
		});
	}
						
	Game.prototype.oneMove = function () {
//		console.log(self.furry.direction);
//		console.log(self.furry.x, self.furry.y);
		console.log('lululu');
		
		if (self.furry.direction === "right") {
			self.furry.x++;
		} else if (self.furry.direction === "left") {
			self.furry.x--;
		} else if (self.furry.direction === "up") {
			self.furry.y--;
		} else if (self.furry.direction === "down") {
			self.furry.y++;
		}
		
		self.wall();
		self.collision();
		self.generator();
	}
	
	Game.prototype.wall = function () {
		
		if (self.furry.x < 0 || self.furry.x > 9 || self.furry.y < 0 || self.furry.y > 9) {
			document.getElementById("board").classList.add("hidden");
			clearInterval(this.interval);
			this.sounds.finish.currentTime=0;
			this.sounds.finish.play();
        	document.querySelector(".gameOver").classList.remove("hidden");
		}
	}
	
	Game.prototype.collision = function () {
		
		if ((self.furry.x + (self.furry.y * 10)) === (self.coin.x + (self.coin.y * 10))) {
			this.board[this.coin.x + this.coin.y * 10].classList.remove("coin");
			this.coin = new Coin;
			this.score++;
			this.scoreBoard.innerHTML = this.score;
			this.levels();
//			console.log(this.interval);
			this.sounds.coin.currentTime=0;
			this.sounds.coin.play();
		}
	}
	
	Game.prototype.levels = function () {
		
		var level = this.score;
		clearInterval(this.interval);
		this.interval = setInterval(this.oneMove, 300-(level*15));
//		switch (level) {
//			case 0:
//				clearInterval(this.interval);
//				this.interval = setInterval(this.oneMove, 300);
//				break;
//			case 5:
//				clearInterval(this.interval);
//				this.interval = setInterval(this.oneMove, 200);
//				break;
//			case 15:
//				clearInterval(this.interval);
//				this.interval = setInterval(this.oneMove, 150);
//				break;
//			case 25:
//				clearInterval(this.interval);
//				this.interval = setInterval(this.oneMove, 10);
//				break;
//			case 35:
//				clearInterval(this.interval);
//				this.interval = setInterval(this.oneMove, 150);
//				break;
////			default:
////				this.interval = setInterval(this.oneMove, 100);
//		}
	}
	
	function start () {
		
		var mariano = document.getElementById("avatarContainer");
		var gameBody = document.getElementById("gameBody");
		
		document.addEventListener("keydown", function(event){
			if (event.keyCode === 32) {
				var startGame = document.getElementById("startGame");
				startGame.classList.add("hidden");
				var startGame = new Game;
				gameBody.classList.remove("hidden");
			}
		});
		
		mariano.addEventListener("click", function(){
			
			var startGame = document.getElementById("startGame");
			startGame.classList.add("hidden");
			var startGame = new Game;
			gameBody.classList.remove("hidden");
			
		});
		
	}
	start();
	

});