import { Calculator } from './calculator.js';
import { Input } from './input.js';

class CalculatorUI {
	constructor() {
		this.Calculator = new Calculator();
		this.Input = new Input(this.Calculator);
	}
}
