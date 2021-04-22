class Calculator {
	constructor(input1 = null, input2 = null, operator = null, answer = null) {
		this._input1 = input1;
		this._input2 = input2;
		this._operator = operator;
		this._answer = answer;
	}

	equate() {
		let answer;

		if (this._operator === 'add') {
			answer = this._input1 + this._input2;
		}

		if (this._operator === 'subtract') {
			answer = this._input1 - this._input2;
		}

		if (this._operator === 'multiply') {
			answer = this._input1 * this._input2;
		}

		if (this._operator === 'divide') {
			if (this._input2 === 0) {
				answer = 'undefined';
			} else {
				answer = this._input1 / this._input2;
			}
		}

		return answer;
	}

	setAnswerToInput1(answer) {
		this._input1 = answer;
	}

	setInput1()

	changeOperation(newOperator) {
		this._operator = newOperator;
	}

	reset() {
		this._input1 = null;
		this._input2 = null;
		this._operator = null;
		this._answer = null;
	}
}


export { Calculator }