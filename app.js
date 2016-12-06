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
		this.furry = new Furry(0, 0);
		this.coin = new Coin();
		this.board = document.querySelectorAll("#board div");
		this.score = 0;
		this.scoreBoard = document.querySelector("#score span");
		this.interval = setInterval(this.oneMove, 240);
		this.generator();
	}	
	
	Game.prototype.generator = function() {
		
		for (var i = 0; i < this.board.length; i++) {
			this.board[i].classList.remove("furry");
		}
		
		var furryBox = this.furry.x + this.furry.y * 10;
		this.board[furryBox].classList.add("furry");
		
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
		self.oneMove();
		});
	}
						
	Game.prototype.oneMove = function () {
//		console.log(self.furry.direction);
//		console.log(self.furry.x, self.furry.y);
		
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
		self.control();
		self.collision();
		self.generator();
	}
	
	Game.prototype.wall = function () {
		
		if (self.furry.x < 0 || self.furry.x > 9 || self.furry.y < 0 || self.furry.y > 9) {
        document.getElementById("board").classList.add("hidden");
		clearInterval(this.interval);
        document.querySelector(".gameOver").classList.remove("hidden");
		}
	}
	
	Game.prototype.collision = function () {
		
		if ((self.furry.x + (self.furry.y * 10)) === (self.coin.x + (self.coin.y * 10))) {
			this.board[this.coin.x + this.coin.y * 10].classList.remove("coin");
			this.coin = new Coin;
			this.score++;
			this.scoreBoard.innerHTML = this.score;
//			this.levels();
//			console.log(this.interval);
//			var coinSound = document.getElementsByTagName("audio")[1];
//			coinSound.play();
		}
	}
	
//	Game.prototype.levels = function () {
//		
//		let level = this.score;
//		
//		switch (level) {
//			case 1:
//				this.interval = setInterval(this.oneMove, 500);
//				break;
//			case 2:
//				this.interval = setInterval(this.oneMove, 410);
//				break;
//			case 3:
//				this.interval = setInterval(this.oneMove, 390);
//				break;
//			case 4:
//				this.interval = setInterval(this.oneMove, 270);
//				break;
//		}
//	}
	
	function start () {
		
		var mariano = document.getElementById("avatarContainer");
		var gameBody = document.getElementById("gameBody");
		
		mariano.addEventListener("click", function(){
			
			var startGame = document.getElementById("startGame");
			startGame.classList.add("hidden");
			var startGame = new Game;
			gameBody.classList.remove("hidden");
			
		});
		
	}
	start();
	

});