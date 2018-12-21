'use-strict';

window.onload = function() {
	var N = 3;

	var reset = document.getElementById("reset");
	reset.addEventListener("click", function() {
		document.getElementById("h2").textContent = "Not Solved";
		for(var b in buttons) {
			buttons[b].style.backgroundColor = "#d6c755";
			buttons[b].on = true;
		}
	});

	var buttons = document.getElementsByClassName("b");
	for(var b in buttons) {
		buttons[b].on = true;
		buttons[b].num = b;
		if(b) buttons[b].addEventListener("click", toggle);
		
		buttons[b].column = b%N;

		if(b < N) {
			buttons[b].row = 0;
		} else if(N <= b && b < 2*N) {
			buttons[b].row = 1;
		} else if(2*N <= b && b < 3*N) {
			buttons[b].row = 2;
		}
	}

	function toggle() {

		//toggle self
		this.style.backgroundColor = this.on == false ? "#d6c755" : "#545659";
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

		//check if all lights are off
		function isSolved() {
			for(b = 0; b < N*N; b++) {
				if(buttons[b].on) {
					return false;
				}
			}
			return true;
		}
		
		//toggle adjacent buttons
		for(var b in buttons) {
			if(isAdjacent(buttons[b], this)) {
				buttons[b].style.backgroundColor = buttons[b].on == false ? "#d6c755" : "#545659";
				buttons[b].on = buttons[b].on == false ? true : false;
			}
		}

		if(isSolved()) {
			document.getElementById("h2").textContent = "Solved!";
		} else {
			document.getElementById("h2").textContent = "Not Solved";
		}
	}
}