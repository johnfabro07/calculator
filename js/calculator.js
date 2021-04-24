import { Display } from './calculatorUI.js';
import { Input } from './input.js';

class Calculator {
	constructor(
		previousOperand = 'null',
		currentOperand = 'null',
		operator = 'null'
	) {
		this.Display = new Display();
		this.Input = new Input();
		this.previousOperand = previousOperand;
		this.currentOperand = currentOperand;
		this.operator = operator;
	}

	calculate() {
		let answer;

		if (this.operator === 'add') {
			answer = input1 + input2;
		}

		if (operator === 'subtract') {
			answer = input1 - input2;
		}

		if (operator === 'multiply') {
			answer = input1 * input2;
		}

		if (operator === 'divide') {
			if (input2 === 0) {
				answer = 'undefined';
			} else {
				answer = input1 / input2;
			}
		}

		return answer;
	}

	run() {
		this.Input.test1();
	}
}

export { Calculator };
