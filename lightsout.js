'use-strict';

window.onload = function() {
	var N = 3;
	var moves = 0;
	var lit = "#d6c755";
	var unlit = "#545659";

	var reset = document.getElementById("reset");
	reset.addEventListener("click", function() {
		document.getElementById("h2").textContent = "Not Solved";
		for(b = 0; b < N*N; b++) {
			buttons[b].style.backgroundColor = buttons[b].originalState[1];
			buttons[b].on = buttons[b].originalState[0];
			moves = 0;
			document.getElementById("h3").textContent = "Moves: " + moves;
		}
	});

	var newGame = document.getElementById("newgame");
	newGame.addEventListener("click", function() {
		document.getElementById("h2").textContent = "Not Solved";
		for(b = 0; b < N*N; b++) {
			buttons[b].on = Math.random() < 0.5 ? false : true;
			buttons[b].style.backgroundColor = buttons[b].on ? lit : unlit;
			buttons[b].originalState = [buttons[b].on, buttons[b].style.backgroundColor];
			moves = 0;
			document.getElementById("h3").textContent = "Moves: " + moves;
		}
	});

	var buttons = document.getElementsByClassName("b");
	for(b = 0; b < N*N; b++) {
		buttons[b].on = Math.random() < 0.5 ? false : true;
		buttons[b].style.backgroundColor = buttons[b].on ? lit : unlit;
		buttons[b].originalState = [buttons[b].on, buttons[b].style.backgroundColor];
		buttons[b].column = b%N;

		if(b < N) {
			buttons[b].row = 0;
		} else if(N <= b && b < 2*N) {
			buttons[b].row = 1;
		} else if(2*N <= b && b < 3*N) {
			buttons[b].row = 2;
		}

		buttons[b].addEventListener("click", toggle);
	}

	function toggle() {

		//toggle self
		this.style.backgroundColor = this.on ? unlit : lit;
		this.on = this.on == false ? true : false;

		//check which buttons are adjacent
		function isAdjacent(a, b) {
			if(a.row == b.row && Math.abs(a.column - b.column) == 1) {
				return true;
			} else if(a.column == b.column && Math.abs(a.row - b.row) == 1) {
				return true;
			} else {
				return false;
			}
		}
		
		//toggle adjacent buttons
		for(b = 0; b < N*N; b++) {
			if(isAdjacent(buttons[b], this)) {
				buttons[b].style.backgroundColor = buttons[b].on ? unlit : lit;
				buttons[b].on = buttons[b].on == false ? true : false;
			}
		}

		document.getElementById("h3").textContent = "Moves: " + ++moves;

		//check if all lights are off
		function isSolved() {
			for(b = 0; b < N*N; b++) {
				if(buttons[b].on) {
					return false;
				}
			}
			return true;
		}

		if(isSolved()) {
			document.getElementById("h2").textContent = "Solved!";
		} else {
			document.getElementById("h2").textContent = "Not Solved";
		}
	}
}