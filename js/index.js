const screen = document.getElementById('screen');
const numbers = document.getElementById('number-button-container');
const numberButtons = numbers.childNodes;
const operators = document.getElementById('operators');
const operatorButtons = operators.childNodes;
const equalButton = document.getElementById('equal');
const clearButton = document.getElementById('clear');
const changeSignButton = document.getElementById('sign');
const dotButton = document.getElementById('dot');
const deleteButton = document.getElementById('delete');

let calculator = {
    input1: null,
    input2: null,
    operator: null,
    answer: null,
    //[input1, input2]
    previousInput: [null, null]
}
let {input1, input2, operator, answer, previousInput} = calculator
let firstInputDone = false;
let secondInputDone = false;
let operationDone = false;

//when -0. and add another number it changes the whole screen
// same after inserted input1(-0) it only changes 0 not the negative

numberButtons.forEach(button => {
    button.addEventListener('click', function() {
        if (parseInt(screen.textContent) === 0) {
            screen.textContent = button.id;
        //ables user to input second operand or input 2    
        } else if (firstInputDone && input1 !== 0) {
            secondInputInitializer()
            screen.textContent = button.id; 
        //ables user to input new set of operations after the previous one
        } else if(operationDone && secondInputDone === false) {
            reset();
            screen.textContent = button.id;
        } else {
            screen.textContent += button.id;
        }
    })
});

operatorButtons.forEach(operatorButton => {
    operatorButton.addEventListener('click', function() {
        //uses previous answer as input1 for consecutive operations
        if (answer !== null) {
            input1 = answer;
        //executes the previous operation and uses the answer as input1
        } else if (secondInputDone && answer === null) {
            input2 = parseFloat(screen.textContent);
            equate(input1, input2, operator);
            reinitializer();
        //captures the screen and uses it as input1
        } else {
            input1 = parseFloat(screen.textContent);
            previousInput[0] = input1;
        }  
        operator = operatorButton.id;
        firstInputDone = true;
    });
});

equalButton.addEventListener('click', function() {
    if (operator === null) {
        return null;
    } else if (answer === null && input1 !== 0 && secondInputDone === false) {
        //captures input1 as input2 if user clicked equal button before inputting the second operand.
        //stores input1 to [previousInput[1]]
        if (input2 === null) {
            equate(input1, previousInput[0], operator);
            previousInput[1] = previousInput[0]
        //defaults second operand as input2 while user clicks equal button consecutively 
        //stores input2 to [previousInput[1]] 
        } else {
            equate(input1, input2, operator);
            previousInput[1] = input2;
        }
    } else {
        //prevents "0" in input1 from being captured as input2 
        if (input1 === 0 && previousInput[1] !== null) {
            input2 = previousInput[1];
        } else {
            //captures the screen and uses it as input2
            input2 = parseFloat(screen.textContent);
        }
        equate(input1, input2, operator);  
    }
    reinitializer(); 
});

clearButton.addEventListener('click', function() {
    screen.textContent = '0';
    reset() 
});

changeSignButton.addEventListener('click', function(){
    if (screen.textContent[0] !== '-') {
        screen.textContent = '-' + screen.textContent;
    } else {
        screen.textContent = screen.textContent.slice(1, screen.textContent.length)
    }
});

dotButton.addEventListener('click', function() {
    if (!(screen.textContent.includes('.'))) {
        screen.textContent += '.';
    }
});

deleteButton.addEventListener('click', deleteNumber);

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
};
// reinitializes the input screen for second input
function secondInputInitializer() {
    firstInputDone = false;
    secondInputDone = true;
}
// reinitializes the input screen after an execution of an operation 
function reinitializer() {
    input1 = answer;
    secondInputDone = false;
    firstInputDone = false
    answer = null;
    operationDone = true;
};

function deleteNumber() {
    screen.textContent = screen.textContent.toString().slice(0, -1);
    if (screen.textContent.length === 0) {
        screen.textContent = `0`;
    };
};

function reset() {
    input1 = null;
    input2 = null;
    operator = null;
    answer = null;
    previousInput = [null, null];
    firstInputDone = false;
    secondInputDone = false;
    operationDone = false;
};
