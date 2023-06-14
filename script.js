let numberButtons = document.querySelectorAll('.number');
let operationButtons = document.querySelectorAll('.operator');
let inputDisplay = document.querySelector('.display .input');
let resultDisplay = document.querySelector('.display .result');
let clearButton = document.querySelector('.clear');
let undoBUtton = document.querySelector('.undo');
let firstOperand = '';
let secondOperand = '';
let operation = '';
let result = ''
numberButtons.forEach(button => {
    button.addEventListener('click',event => {
        manageNumberInput(event.target.textContent)
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click',event => {
        manageOperationInput(event.target.textContent)
    })
})

clearButton.addEventListener('click',event => {
    clearCalculator();
})

undoBUtton.addEventListener('click',event => {
    undo();
})

function undo(){
    
    if(secondOperand != ''){
        secondOperand = secondOperand.slice(0, secondOperand.length - 1);
    }
    else if(operation != '' && secondOperand == ''){
        operation = '';
    }
    else if(firstOperand != ''){
        firstOperand = firstOperand.slice(0, firstOperand.length - 1);
    }
    inputDisplay.textContent = `${firstOperand}${operation}${secondOperand}`
}

function clearCalculator(){
    result = firstOperand = operation = secondOperand = '';
    resultDisplay.textContent = inputDisplay.textContent = '';
}

function manageNumberInput(input){
    if(operation == '' && input == '.' && firstOperand.includes('.')){
        return ;
    }

    if(operation != '' && input == '.' && secondOperand.includes('.')){
        return ;
    }

    if(operation == ''){
        firstOperand += input;
    } else {
        secondOperand += input;
    }

    inputDisplay.textContent += input;
}

function manageOperationInput(input){
    if(input == '=' && firstOperand && operation && secondOperand){
        result = calculateOperation(firstOperand,operation,secondOperand);
        resultDisplay.textContent = result;
        return;
    }
    else if(input == '=')
    {
        return;
    }
    
    if(firstOperand && operation && secondOperand){
        result = calculateOperation(firstOperand,operation,secondOperand);
        firstOperand = `${result}`;
        secondOperand = '';
        inputDisplay.textContent = `${result}`;
        resultDisplay.textContent = result;
        result = '';
    }

    if(firstOperand.replace(/[-*+/]+/g,'') != ''){
        inputDisplay.textContent += input;
        operation = input;
    } else if(input != '/' && input != 'x'){
        firstOperand = input;
        inputDisplay.textContent = input;
    }
}

function calculateOperation(firstOperand,operation,secondOperand){
    switch(operation){
        case '+':
            return +firstOperand + +secondOperand;
            break;
        case '-':
            return firstOperand - secondOperand;
            break;
        case '/':
            if(secondOperand == '0') return 0;
            return firstOperand / secondOperand;
            break;
        case 'x':
            return firstOperand * secondOperand;
            break;
    }
}