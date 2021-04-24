class EventHandlers {
	constructor(userInput = '') {
		this.userInput = userInput;
	}

	renderNumberButtons() {
		const numberButtons = document.querySelectorAll('[data-number]');

		numberButtons.forEach((button) => {
			button.addEventListener('click', (e) => {
				this.userInput = ['number', e.target.id];
			});
		});
	}

	renderOperatorButtons() {
		const operatorButtons = document.querySelectorAll('[data-operator]');

		operatorButtons.forEach((operatorButton) => {
			operatorButton.addEventListener('click', (e) => {
				this.userInput = ['operator', e.target.id];
			});
		});
	}

	renderFunctionalButtons() {
		const functionalButtons = document.querySelectorAll('[data-function]');

		functionalButtons.forEach((button) => {
			button.addEventListener('click', (e) => {
				this.userInput = ['function', e.target.id];
			});
		});
	}

	renderKeyboardInput() {
		window.addEventListener('keydown', (e) => {
			const number = document.querySelector(`button[id="${e.key}"]`);
			const currentOperator = document.querySelector(
				`button[data-operator="${e.key}"]`
			);

			if (e.key >= 0 || e.key < 10) this.userInput = ['number', number.id];
			if (e.key === 'Enter' || e.key === '=') this.userInput = ['equal'];
			if (e.key === 'c') this.userInput = ['sign'];
			if (e.key === '.') this.userInput = ['dot'];
			if (e.key === '%') this.userInput = ['percentage'];
			if (e.key === 'Backspace') this.userInput = ['backspace'];
			if (e.key === 'Delete') this.userInput = ['delete'];
			// if (e.key === 'd') toggleMode();
			if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
				this.userInput = ['operator', currentOperator.id];
			}
		});
	}

	init() {
		this.renderNumberButtons();
		this.renderOperatorButtons();
		this.renderFunctionalButtons();
		this.renderKeyboardInput();
	}

	getUserInput() {
		return this.userInput;
	}
}

export { EventHandlers };
