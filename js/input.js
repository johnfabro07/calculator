class Input {
	constructor(calculator, screen = 'screen') {
		this.screen = document.getElementById(screen);
		this.digitLimit = 0;
		this.firstInputDone = false;
		this.secondInputDone = false;
		this.operationDone = false;
		this.calculator = calculator;
	}

	inputNumber(button, { input1 }) {
		while (this.digitLimit < 9) {
			if (parseFloat(this.screen.textContent) === 0) {
				if (parseFloat(this.screen.textContent) === parseFloat(button.id)) {
					this.digitLimit = -1;
				}

				this.inputFromZero(button);
				return;
			}

			if (this.firstInputDone && input1 !== null) {
				this.secondInputInitializer();
				this.screen.textContent = button.id;
				return;
			}

			if (this.secondInputDone === false && this.operationDone) {
				this.calculator.reset();
				this.reset();
				this.screen.textContent = button.id;
				return;
			}

			this.screen.textContent += button.id;
			this.digitLimit++;
		}
	}

	inputOperator(operatorButton) {
		if (this.calculator.answer !== null) {
		}
	}

	inputFromZero(button) {
		if (!this.screen.textContent.includes('.')) {
			this.screen.textContent = this.screen.textContent.replace('0', button.id);
			return;
		}

		this.screen.textContent += button.id;
	}

	secondInputInitializer() {
		this.firstInputDone = false;
		this.secondInputDone = true;
	}

	reinitializer() {}

	reset() {
		firstInputDone = false;
		secondInputDone = false;
		operationDone = false;
		digitLimit = 0;
	}
}

export { Input };
