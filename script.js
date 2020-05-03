
let expressionArray = [];

function operate (operation, number1S, number2S) {

   let number1 = Number(number1S);
   let number2 = Number(number2S);

    if (operation == "+")
        return number1 + number2;

    else if (operation == "-")
        return number1 - number2;

    else if (operation == "/")
        return number1 / number2;
    
    else
        return number1 * number2;
}

function verifyHighOperation (operation) {

    if (operation == "/" || operation == "*")
        return true;
    else
        return false;
}

function verifyLowOperation (operation) {

    if (operation == "+" || operation == "-")
        return true;
    else
        return false;
}

function fixExpressionArray () {
    
    let fixedExpressionArray = [];
    let numberString = "";

    for (let i = 0; i < expressionArray.length; i++) {

        if (!verifyLowOperation(expressionArray[i]) && !verifyHighOperation(expressionArray[i])) {

            if ((i + 1) == expressionArray.length) {
                numberString += expressionArray[i];
                fixedExpressionArray.push(numberString);
            }

            else {
                numberString += expressionArray[i];
            }
        }

        else {
            fixedExpressionArray.push(numberString);
            fixedExpressionArray.push(expressionArray[i]);
            numberString = ""; 
        }
    }

    return fixedExpressionArray;
}

function updateExpressionArray (result, index) {

    let newExpressionArray = [];

    for (let i = 0; i < expressionArray.length; i++) {

        if ((i + 1) == index) {
            newExpressionArray.push(result);

            for (j = 3; j < expressionArray.length; j++) {
                newExpressionArray.push(expressionArray[j]);
            }

            break;
        }

        else if((i + 2) == index) {
            newExpressionArray.push(expressionArray[i]);
            newExpressionArray.push(result);
            expressionArray[i + 1] = "Removed"
            expressionArray[i + 2] = "Removed";
            expressionArray[i + 3] = "Removed";
            index = 0;
        }

        else if (expressionArray[i] != "Removed")
            newExpressionArray.push(expressionArray[i]);
    }

    return newExpressionArray;
}


function calculateHighOperations (numberOfHighOperations) {

    for (let i = 0; i < numberOfHighOperations; i++) {

        for (let j = 0; j < expressionArray.length; j++) {

            if (verifyHighOperation(expressionArray[j])) {

                let result = operate(expressionArray[j], expressionArray[j - 1],
                                    expressionArray[j + 1]);
                
                 expressionArray = updateExpressionArray(result, j);

                 break;
            }
        }
    }
}

function calculateLowOperations (numberOfLowOperations) {

    for (let i = 0; i < numberOfLowOperations; i++) {

        for (let j = 0; j < expressionArray.length; j++) {

            if (verifyLowOperation(expressionArray[j])) {

                let result = operate(expressionArray[j], expressionArray[j - 1],
                                    expressionArray[j + 1]);
                
                expressionArray = updateExpressionArray(result, j);

                break;
            }
        }
    }
}

function calculateExpression () {

    let numberOfHighOperations = 0;
    let numberOfLowOperations = 0;

    expressionArray = fixExpressionArray();

    expressionArray.forEach (partOfExpression => {

        if (verifyHighOperation(partOfExpression)) {
                numberOfHighOperations++;
            }
    })

    if (numberOfHighOperations > 0) {
        calculateHighOperations(numberOfHighOperations);
    }

    expressionArray.forEach (partOfExpression => {

        if (verifyLowOperation(partOfExpression)) {
            numberOfLowOperations++;
        }
    })

     if (numberOfLowOperations > 0) {
        calculateLowOperations(numberOfLowOperations);
     }
    
}

function calculator () {

    const numbersButtons = document.querySelectorAll(".number");
    const operationsButtons = document.querySelectorAll(".operator");
    let display = document.querySelector("#display");

    numbersButtons.forEach (number => {
        number.addEventListener("click", event => {
            expressionArray.push(event.target.id);
            display.textContent += event.target.id;
        })
    })

    operationsButtons.forEach (operation => {
        operation.addEventListener("click", event => {

            if (event.target.id == "=") {
                calculateExpression();
                display.textContent = expressionArray[0];
            }

            else if (event.target.id == "reset") {
                display.textContent = "";
                expressionArray = [];
            }
            else {
                expressionArray.push(event.target.id);
                display.textContent += event.target.id;
            }
        })
    })
}

calculator();