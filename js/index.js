const numbers = document.getElementById('number-button-container');
const numberButtons = numbers.childNodes;
const operators = document.getElementById('operators');
const operatorButtons = operators.childNodes;
const equalKey = document.getElementById('equal');
const screen = document.getElementById('screen');
const clear = document.getElementById('clear');
const sign = document.getElementById('sign');
const dot = document.getElementById('dot');

let calculator = {
    input1: null,
    input2: null,
    operator: null,
    answer: null,
    previousInput: [null]
}
let {input1, input2, operator, answer, previousInput} = calculator
let firstInputDone = false;
let secondInputDone = false;
let equated = false;
let includesDot = false;

numberButtons.forEach(button => {
    button.addEventListener('click', function() {
        if (parseInt(screen.textContent) === 0) {
            if (screen.textContent[0] === '-') {
                screen.textContent = `-` + button.id;
            } else if(screen.textContent.slice(0,2) === '0.') {
                screen.textContent += button.id;
            } else {
                screen.textContent = button.id;
            }
        }  else if (firstInputDone) {
            screen.textContent = button.id;
            firstInputDone = false;
            secondInputDone = true;
        } else if(equated && secondInputDone === false) {
            reset();
            screen.textContent = button.id;
        } else {
            screen.textContent += button.id;
        }
    })
});

operatorButtons.forEach(operatorButton => {
    operatorButton.addEventListener('click', function() {
        if (answer !== null) {
            input1 = answer;
        } else if (secondInputDone && answer === null) {
            input2 = parseFloat(screen.textContent);
            equate(input1, input2, operator);
            initializer();
        } else {
            input1 = parseFloat(screen.textContent);
            previousInput[0] = input1;
        }
        operator = operatorButton.id;
        firstInputDone = true;
    })
})

equalKey.addEventListener('click', function() {
    if (operator === null) {
        return null;
    } else if (answer === null && input1 !== null && secondInputDone === false) {
        if (input2 === null) {
            equate(input1, previousInput[0], operator);
        } else {
            equate(input1, input2, operator);
        }
        initializer();
    }else {
        input2 = parseFloat(screen.textContent);
        equate(input1, input2, operator);
        initializer();
    }
})

clear.addEventListener('click', function() {
    screen.textContent = '0';
    reset() 
})

sign.addEventListener('click', function(){
    if (screen.textContent[0] !== '-') {
        screen.textContent = '-' + screen.textContent;
    } else {
        screen.textContent = screen.textContent.slice(1, screen.textContent.length)
    }
})

dot.addEventListener('click', function() {
    if (!(screen.textContent.includes('.'))) {
        screen.textContent += '.';
    }
    if(equated && secondInputDone === false) {
        reset();
        screen.textContent = `0.`;
    }
})


function equate(input1, input2, operator) {
    if (operator === 'add') {
        answer = input1 + input2;
    } else if (operator === 'subtract') {
        answer = input1 - input2;
    } else if (operator === 'multiply') {
        answer = input1 * input2;
    } else if (operator === 'divide') {
        if (input2 === 0) {
            answer = 'undefined';
        } else {
            answer = input1 / input2
        }
    }
    screen.textContent = answer;
}

function initializer() {
    input1 = answer;
    secondInputDone = false;
    answer = null;
    equated = true;
}

function reset() {
    input1 = null;
    input2 = null;
    operator = null;
    answer = null;
    previousInput = [null];
    firstInputDone = false;
    secondInputDone = false;
    equated = false;
}
