let numberButtons = document.querySelectorAll('.number');
let operationButtons = document.querySelectorAll('.operator');
let inputDisplay = document.querySelector('.display .input');
let resultDisplay = document.querySelector('.display .result');
let firstOperand = '';
let secondOperand = '';
let operation = '';

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

function manageNumberInput(input)
{
    operation == '' ? firstOperand += input : secondOperand += input;
    inputDisplay.textContent += input;
    console.log(firstOperand,operation,secondOperand);
}

function manageOperationInput(input)
{
    if(input == '=' && firstOperand && operation && secondOperand)
    {
        resultDisplay.textContent = calculateOperation(firstOperand,operation,secondOperand);
        return
    }
    if(firstOperand.replace(/[-*+/]+/g,'') != ''){
        inputDisplay.textContent += input;
        operation = input;
    } else if(input != '/'){
        firstOperand = input;
        inputDisplay.textContent = input;
    }
    console.log(firstOperand,operation,secondOperand);
}
function calculateOperation(firstOperand,operation,secondOperand)
{
    switch(operation){
        case '+':
            return +firstOperand + +secondOperand;
            break;
        case '-':
            return firstOperand - secondOperand;
            break;
        case '/':
            return firstOperand / secondOperand;
            break;
        case '*':
            return firstOperand * secondOperand;
            break;
    }
}