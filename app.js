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
		this.interval = setInterval(this.oneMove, 250);
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
		console.log(self.furry.direction);
		console.log(self.furry.x, self.furry.y);
		
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
		clearInterval(self.interval);
        document.querySelector(".gameOver").classList.remove("hidden");
		}
	}
	
	Game.prototype.collision = function () {
		
		if ((self.furry.x + (self.furry.y * 10)) === (self.coin.x + (self.coin.y * 10))) {
			this.board[this.coin.x + this.coin.y * 10].classList.remove("coin");
			this.coin = new Coin;
			this.score++;
			this.scoreBoard.innerHTML = this.score;	
//			var coinSound = document.getElementsByTagName("audio")[1];
//			coinSound.play();
		}
	}
	var startGame = new Game;
});