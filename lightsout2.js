'use-strict';

var N = 3;
var moves = 0;
var lit = "#d6c755";
var unlit = "#545659";

class Button {
	constructor(b) {
		var seed = Math.random();
		this.button = document.getElementById("b"+b);
		var on = seed < 0.5 ? false : true;
		var clr = on ? lit : unlit;
		this.button.style.backgroundColor = clr;
		this.adjacent = [];
		this.col = b%N;
		this.row = 0;

		// determine row based on button number and dimensions of game
		// could be improved?
		if(b < N) {
			this.row = 0;
		} else if(N <= b && b < 2*N) {
			this.row = 1;
		} else if(2*N <= b && b < 3*N) {
			this.row = 2;
		}

		this.toggle = function(event) {
			// toggle self
			clr = on ? unlit : lit;
			on = on ? false : true;
			event.srcElement.style.backgroundColor = clr;

			// toggle adjacent
			for(var i = 0; i < this.adjacent.length; i++) {
				this.adjacent[i].clr = this.adjacent[i].on ? unlit : lit;
				this.adjacent[i].on = this.adjacent[i].on ? false : true;
				this.adjacent[i].button.style.backgroundColor = clr;
			}

			document.getElementById("h3").textContent = ("Moves: "+ ++moves);
		}

		// reset to original state based on seed
		this.reset = function() {
			on = seed < 0.5 ? false : true;
			clr = on ? lit : unlit;
			this.button.style.backgroundColor = clr;
		}

		// generate a new seed and re-colour
		this.newSeed = function() {
			seed = Math.random();
			on = seed < 0.5 ? false : true;
			clr = on ? lit : unlit;
			this.button.style.backgroundColor = clr;
		}

		this.button.addEventListener("click", this.toggle);
	}
}

class Game {
	constructor() {
		var buttons = [];
		var isSolved = false;
		
		// populate list of buttons
		for(var i = 0; i < N*N; i++) {
			buttons[i] = new Button(i);
		}

		// find which buttons are adjacent to each other
		for(var i = 0; i < N*N; i++) {
			for(var j = 0; j < N*N; j++) {
				if(buttons[i].row == buttons[j].row && Math.abs(buttons[i].col - buttons[j].col) == 1) {
					buttons[i].adjacent.push(buttons[j]);
				} else if(buttons[i].col == buttons[j].col && Math.abs(buttons[i].row - buttons[j].row) == 1) {
					buttons[i].adjacent.push(buttons[j]);
				}
			}
		}

		var resetButton = document.getElementById("reset");
		var newGame = document.getElementById("newgame");

		// reset the game to its beginning state
		this.reset = function(event) {
			moves = 0;
			document.getElementById("h3").textContent = ("Moves: "+ moves);
			for(var i = 0; i < N*N; i++) {
				buttons[i].reset();
			}
		}

		// generate a new seed and reset the game
		this.newGame = function(event) {
			moves = 0;
			document.getElementById("h3").textContent = ("Moves: "+ moves);
			for(var i = 0; i < N*N; i++) {
				buttons[i].newSeed();
			}
		}

		resetButton.addEventListener("click", this.reset);
		newGame.addEventListener("click", this.newGame);
	}
}

window.onload = function() {

	var game = new Game();

}