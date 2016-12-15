document.addEventListener("DOMContentLoaded", function () {
	var self;
	var Furry = function (x, y) {
		this.x = x;
		this.y = y;
		this.direction = "right";
	}
	var Coin = function () {
		this.x = Math.floor(Math.random() * 10);
		this.y = Math.floor(Math.random() * 10);
	}
	var Game = function () {
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
	Game.prototype.soundInit = function () {
		var sounds = document.querySelectorAll("audio");
		this.sounds.finish = sounds[0];
		this.sounds.coin = sounds[1];
		this.sounds.coin.volume = 0.6;
		this.sounds.bg = sounds[2];
		this.sounds.bg.volume = 0.15;
	}
	Game.prototype.generator = function () {
		for (var i = 0; i < this.board.length; i++) {
			this.board[i].classList.remove("furry");
		}
		var furryBox = this.furry.x + this.furry.y * 10;
		if (this.board[furryBox] != undefined) {
			this.board[furryBox].classList.add("furry");
		}
		var coinBox = this.coin.x + this.coin.y * 10;
		this.board[coinBox].classList.add("coin");
	};
	Game.prototype.control = function () {
		document.addEventListener("keydown", function (event) {
			if (event.keyCode === 39) {
				self.furry.direction = "right";
				return;
			}
			else if (event.keyCode === 37) {
				self.furry.direction = "left";
				return;
			}
			else if (event.keyCode === 38) {
				self.furry.direction = "up";
				return;
			}
			else if (event.keyCode === 40) {
				self.furry.direction = "down";
				return;
			}
		});
	}
	Game.prototype.oneMove = function () {
		if (self.furry.direction === "right") {
			self.furry.x++;
		}
		else if (self.furry.direction === "left") {
			self.furry.x--;
		}
		else if (self.furry.direction === "up") {
			self.furry.y--;
		}
		else if (self.furry.direction === "down") {
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
			this.sounds.finish.currentTime = 0;
			this.sounds.finish.play();
			document.querySelector(".gameOver").classList.remove("hidden");
			setTimeout(function(){
				document.querySelector(".gameOver").classList.add("hidden");
				document.querySelector(".yourScore").classList.remove("hidden");
				self.addScore();
			}, 3000);
		}
		
	}
	Game.prototype.collision = function () {
		if ((self.furry.x + (self.furry.y * 10)) === (self.coin.x + (self.coin.y * 10))) {
			this.board[this.coin.x + this.coin.y * 10].classList.remove("coin");
			this.coin = new Coin;
			this.score++;
			this.scoreBoard.innerHTML = this.score;
			this.levels();
			this.sounds.coin.currentTime = 0;
			this.sounds.coin.play();
		}
	}
	Game.prototype.levels = function () {
		var level = this.score;
		clearInterval(this.interval);
		this.interval = setInterval(this.oneMove, 300 - (level * 15));
	}
	Game.prototype.addScore = function () {
		var scoreToAdd = document.getElementById("scoreToAdd");
		scoreToAdd.innerHTML = this.score;
		
		var url = "https://first-game-4ca11.firebaseio.com/";
		var firebaseRef = new Firebase("https://first-game-4ca11.firebaseio.com/leaderboard");
		var submitButton = document.querySelector(".button");
		
		

		    function submitScore() {
		    	var name = document.getElementById("nameInput").value;
		    	var score = scoreToAdd;
		    	firebaseRef.set({
		    		name: +name
		    		, score: +score
		    	});
		    }
		    submitButton.onclick = submitScore();
	}

	function start() {
		var mariano = document.getElementById("avatarContainer");
		var gameBody = document.getElementById("gameBody");
	
		document.addEventListener("keydown", function spaceStart (event) {
			if (event.keyCode === 32) {
				var startGame = document.getElementById("startGame");
				startGame.classList.add("hidden");
				var startGame = new Game;
				gameBody.classList.remove("hidden");
				document.removeEventListener("keydown", spaceStart);
			}
		});
//		mariano.addEventListener("click", function () {
//			var startGame = document.getElementById("startGame");
//			startGame.classList.add("hidden");
//			var startGame = new Game;
//			gameBody.classList.remove("hidden");
//			document.removeEventListener("keydown", spaceStart);
//		});
		
	}
	start();
});