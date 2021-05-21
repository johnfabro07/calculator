import { EventHandlers } from './DOM.js';

class Input {
	constructor() {
		this.EventHandlers = new EventHandlers();
		this.EventHandlers.init();
		this.disabled = false;
	}

	test1() {
		console.log(this.EventHandlers.getUserInput());
	}
}

export { Input };
