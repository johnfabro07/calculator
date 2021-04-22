import { UI } from './UI.js';

//Event: Input Number to screen
document.querySelectorAll('[data-number').forEach((button) => {
	button.addEventListener('click', (e) => {
		UI.inputNumber(e.target);
	});
});
