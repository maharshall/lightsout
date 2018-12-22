// Alexander Marshall

'use-strict';

window.onload = function() {
	/**
	 * N:		the dimension of the board
	 * moves:	the number of moves the player has entered
	 * lit:		the colour of a button that is 'on'
	 * unlit:	the colour of a button that is off
	 */
	var N = 3;
	var moves = 0;
	var lit = "#d6c755";
	var unlit = "#545659";
	
	/**
	 * reset:	resets the game to its starting layout, which is stored as 
	 * property originalState of buttons[b].
	 * Text on the html page is reset as well as the move count
	 */
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

	/**
	 * newGame:	esentially the same as reset, but generates a new starting layout and stores
	 * it as originalSate as a property of buttons[b]
	 */
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

	
	/**
	 * This loop initializes the buttons list, sets its properties, and activates the eventListener.
	 * on:				whether the light is on or off
	 * style:			the color of the button, depending on its state
	 * originalState:	the original state and color of the button, to be used if the game is reset
	 * column:			the column that the button is in
	 * row:				the row the button is in
	 */
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

	/**
	 * This function is called when any of the light buttons are pushed
	 * The button toggles itself, then the adjacent buttons, then checks if the puzzle has been solved
	 * possible improvement: store the adjacent buttons as a list, rather than determining them every time
	 */
	function toggle() {

		// toggle self
		this.style.backgroundColor = this.on ? unlit : lit;
		this.on = this.on == false ? true : false;

		// check which buttons are adjacent
		function isAdjacent(a, b) {
			if(a.row == b.row && Math.abs(a.column - b.column) == 1) {
				return true;
			} else if(a.column == b.column && Math.abs(a.row - b.row) == 1) {
				return true;
			} else {
				return false;
			}
		}
		
		// toggle adjacent buttons
		for(b = 0; b < N*N; b++) {
			if(isAdjacent(buttons[b], this)) {
				buttons[b].style.backgroundColor = buttons[b].on ? unlit : lit;
				buttons[b].on = buttons[b].on == false ? true : false;
			}
		}

		// update the number of moves
		document.getElementById("h3").textContent = "Moves: " + ++moves;

		// check if all lights are off (puzzle solved)
		function isSolved() {
			for(b = 0; b < N*N; b++) {
				if(buttons[b].on) {
					return false;
				}
			}
			return true;
		}

		// update the html when the puzzle is solved.
		// TODO: add endstate so that buttons can no longer be toggled after the puzzle is solved
		if(isSolved()) {
			document.getElementById("h2").textContent = "Solved!";
		} else {
			document.getElementById("h2").textContent = "Not Solved";
		}
	}
}