class Display {
	constructor(screenId = 'screen') {
		this.screen = document.getElementById(screenId);
	}

	appendNumber(number) {
		this.screen.textContent = number;
	}

	deleteNumber() {
		this.screen.textContent = this.screen.textContent.toString().slice(0, -1);
	}
}

export { Display };
