const screen = document.getElementById('screen');
const numberButtons = document.querySelectorAll("[data-number]");
const operatorButtons = document.querySelectorAll("[data-operator]");
const otherButtons = document.querySelectorAll("[data-function]");
const switchMode = document.getElementById('input-color-switch');

let calculator = {
    input1: null,
    input2: null,
    operator: null,
    answer: null,
    //previous[input1, input2]
    previousInput: [null, null]
}

let {input1, input2, operator, answer, previousInput} = calculator
let firstInputDone = false;
let secondInputDone = false;
let operationDone = false;
let digitLimit = 0;

window.addEventListener('keydown', function(e) {
    const number = document.querySelector(`button[id="${e.key}"]`);
    const currentOperator = document.querySelector(`button[data-operator="${e.key}"]`);
    if (e.key >= 0 || e.key < 10) inputNumber(number);
    if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
        inputOperator(currentOperator);
    }
    if (e.key === 'Enter' || e.key === '=') equalFunction();
    if (e.key === 'c') changeSign();
    if (e.key === '.') insertDot();
    if (e.key === '%') percentage();
    if (e.key === 'Backspace') deleteNumber();
    if (e.key === 'Delete') clear();
})

numberButtons.forEach(button => {
    button.addEventListener('click', e => inputNumber(e.target));
});

operatorButtons.forEach(operatorButton => {
    operatorButton.addEventListener('click', e => inputOperator(e.target));
});

otherButtons.forEach(button => {
    button.addEventListener('click', function(e) {
        if (e.target.id === "equal") equalFunction();
        if (e.target.id === "sign") changeSign();
        if (e.target.id === "dot") insertDot();
        if (e.target.id === "percentage") percentage();
        if (e.target.id === "clear") clear();
    })
});

switchMode.addEventListener('click', checkMode);

function inputNumber(button) {
    //condition that counts the number of times a number button is clicked 
    //to limit input
    if (digitLimit < 9) {
        if (parseFloat(screen.textContent) === 0) {
        //prevents incrementing digitLimit if number button 0 is clicked as starting input
            if (parseFloat(screen.textContent) === parseFloat(button.id)) {
                digitLimit = -1;
            };
            inputFromZero(button)
        //ables user to input second operand or input 2    
        } else if (firstInputDone && input1 !== null) {
            secondInputInitializer()
            screen.textContent = button.id; 
        //ables user to input new set of operations after the previous one
        } else if(operationDone && secondInputDone === false) {
            reset();
            screen.textContent = button.id;
        } else {
            screen.textContent += button.id;
        };
        digitLimit++;
    };
};

function inputOperator(operatorButton) {
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
    };
    operator = operatorButton.id;
    firstInputDone = true;
    digitLimit = 0;
};

function equalFunction() {
    if (operator === null) {
        return null;
    } else if (answer === null && input1 !== 0 && secondInputDone === false) {
        //captures input1 as input2 
        //if user clicked equal button before inputting the second operand.
        //stores input1 to [previousInput[1]]
        if (input2 === null) {
            equate(input1, previousInput[0], operator);
            previousInput[1] = previousInput[0]
        //defaults second operand as input2 if user clicks equal button consecutively 
        //stores input2 to [previousInput[1]] 
        } else {
            equate(input1, input2, operator);
            previousInput[1] = input2;
        };
    } else {
        //prevents "0" in input1 from being captured as input2 
        if (input1 === 0 && previousInput[1] !== null) {
            input2 = previousInput[1];
        } else {
        //captures the screen and uses it as input2
            input2 = parseFloat(screen.textContent);
        };
        equate(input1, input2, operator);  
    };
    reinitializer(); 
};

function changeSign(){
    if (screen.textContent[0] !== '-') {
        screen.textContent = '-' + screen.textContent;
    } else {
        screen.textContent = screen.textContent.slice(1, screen.textContent.length)
    };
    if (firstInputDone && input1 !== null) {
        secondInputInitializer()
        screen.textContent = '-0';
        digitLimit = 1;
    };
};

function insertDot() {
    if (digitLimit > -1 && digitLimit < 9) {
        if (!(screen.textContent.includes('.'))) {
            screen.textContent += '.';
        // increments digitLimit if user adds a decimal point while calculator screen is '0'
            if (parseFloat(screen.textContent) === 0) {
                digitLimit = 1;
            };
        };
    };
    if (firstInputDone && input1 !== null) {
        secondInputInitializer()
        screen.textContent = '0.';
        digitLimit = 1;
    };
    if (operationDone && firstInputDone === false && secondInputDone === false) {
        reset()
        screen.textContent = '0.';
        digitLimit = 1;
    };
};

function percentage(){
    let number = parseFloat(screen.textContent);
    let answer = number / 100;
    if (answer > 999999999 || answer < -999999999) {
        answer = answer.toExponential(3);
    } else if (answer.toString().length > 8) {
        answer = answer.toPrecision(3)
    };
    screen.textContent = answer;
    reinitializer(); 
};

function clear() {
    screen.textContent = '0';
    reset() 
};

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
        };
    };
    if (answer > 999999999 || answer < -999999999) {
        answer = answer.toExponential(3);
    } else if (answer.toString().length > 9) {
        answer = answer.toPrecision(9)
    };
    screen.textContent = answer;
};

function inputFromZero(button) {
    if (!screen.textContent.includes('.')) {
        screen.textContent = screen.textContent.replace('0', button.id);
    } else {
        screen.textContent += button.id;
    }
};
// reinitializes the input screen for second input
function secondInputInitializer() {
    firstInputDone = false;
    secondInputDone = true;
};
// reinitializes the input screen after an execution of an operation 
function reinitializer() {
    input1 = answer;
    answer = null;
    firstInputDone = false;
    secondInputDone = false;
    operationDone = true;
    digitLimit = 0;
};

function deleteNumber() {
//prevent backspace from decrementing from digitLimit when decimal point is deleted.
    let digitsOnScreen = screen.textContent.toString();
    let length = digitsOnScreen.length;
    if (digitLimit > 0) {
        if (!(digitsOnScreen[length - 1] === '.')) {
            digitLimit -= 1;
        };
    };
//deletes last item in the string
    screen.textContent = screen.textContent.toString().slice(0, -1);

//prevents 0 from being recognized as raw text or input to delete
    if (parseFloat(screen.textContent) === 0) {
        digitLimit = 0;
    };
    if (screen.textContent.length === 0) {
        screen.textContent = `0`;
    };
    if (screen.textContent.length === 1 && screen.textContent[0] === '-') {
        screen.textContent = `0`;
    };
    if (operationDone && secondInputDone === false) {
        reset()
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
    digitLimit = 0;
};

function checkMode() {
    if (switchMode.checked) {
        darkModeOn();
    } else {
        darkModeOff();
    }
}

function darkModeOn() {
    document.body.classList.add("dark-mode");
}

function darkModeOff() {
    document.body.classList.remove("dark-mode");
}