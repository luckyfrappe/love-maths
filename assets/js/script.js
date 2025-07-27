document.addEventListener("DOMContentLoaded", function () {
    let buttons = document.getElementsByTagName("button");

    for (let button of buttons) {
        button.addEventListener("click", function() {
            if (this.getAttribute("data-type") === "submit") {
                checkAnswer();
            } else {
                let gameType = this.getAttribute("data-type");
                runGame(gameType);
            };
        });
    };

    document.getElementById("answer-box").addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            checkAnswer();
        }
    });

    runGame("addition");
});

/**
 * The function runGame initializes the game by generating two random numbers
 */
function runGame(gameType) {
    document.getElementById("answer-box").value = "";
    document.getElementById("answer-box").focus();

    let num1 = Math.floor(Math.random() * 25) + 1;
    let num2 = Math.floor(Math.random() * 25) + 1;

    if (gameType === "addition") {
        displayAdditionQuestion(num1, num2);
    } else if (gameType === "subtraction") {
        displaySubtractionQuestion(num1, num2);
    } else if (gameType === "multiplication") {
        displayMultiplicationQuestion(num1, num2);
    } else if (gameType === "division") {
        displayDivisionQuestion(num1, num2);
    } else {
        alert(`Unknown game type: ${gameType}`);
        throw `Unknown gameType: ${gameType}. Aborting!`;
    }
}

/**
 * The function checkAnswer checks the user's answer against the correct answer.
 * It retrieves the user's answer from the input field, compares it with the correct answer,
 * and updates the score accordingly.
 */
function checkAnswer() {
    let userAnswer = parseInt(document.getElementById("answer-box").value);
    let calculatedAnswer = calculateCorrectAnswer();
    let isCorrect = userAnswer === calculatedAnswer[0];

    if (isCorrect) {
        alert("Correct!");
        incrementScore();
    } else {
        alert(`Incorrect! You answered ${userAnswer}. The correct answer was ${calculatedAnswer[0]}.`);
        incrementWrongAnswer();
    }

    runGame(calculatedAnswer[1]);
}

/**
 * The function calculateCorrectAnswer calculates the correct answer based on the operands displayed
 * on the screen.
 */
function calculateCorrectAnswer() {
    let operand1 = parseInt(document.getElementById("operand1").innerText);
    let operand2 = parseInt(document.getElementById("operand2").innerText);
    let operator = document.getElementById("operator").innerText;

    if (operator === "+") {
        return [operand1 + operand2, "addition"];
    } else if (operator === "x") {
        return [operand1 * operand2, "multiplication"];
    } else if (operator === "-") {
        return [operand1 - operand2, "subtraction"];
    } else if (operator === "/") {
        return [operand1 / operand2, "division"];
    } else {
        alert(`Unknown operator: ${operator}`);
        throw `Unknown operator: ${operator}. Aborting!`;
    }

}

/**
 * Gets the value from DOM and then increases the user's score by 1.
 */
function incrementScore() {
    let oldScore = parseInt(document.getElementById("score").innerText);
    document.getElementById("score").innerText = ++oldScore;
}

/**
 * Gets the value from DOM and then increases the user's wrong answer count by 1.
 */
function incrementWrongAnswer() {
    let oldScore = parseInt(document.getElementById("wrong").innerText);
    document.getElementById("wrong").innerText = ++oldScore;
}

function displayAdditionQuestion(operand1, operand2) {
    document.getElementById("operand1").textContent = operand1;
    document.getElementById("operand2").textContent = operand2;
    document.getElementById("operator").textContent = "+";

}

function displaySubtractionQuestion(operand1, operand2) {
    document.getElementById("operand1").textContent = operand1 > operand2 ? operand1 : operand2;
    document.getElementById("operand2").textContent = operand1 > operand2 ? operand2 : operand1;
    document.getElementById("operator").textContent = "-";
}

function displayMultiplicationQuestion(operand1, operand2) {
    document.getElementById("operand1").textContent = operand1;
    document.getElementById("operand2").textContent = operand2;
    document.getElementById("operator").textContent = "x";
}

function displayDivisionQuestion(operand1, operand2) {
    let firstOperand = operand1 > operand2 ? operand1 : operand2;
    let secondOperand = operand1 > operand2 ? operand2 : operand1;
    if (firstOperand % secondOperand !== 0) {
        firstOperand = firstOperand + (secondOperand - (firstOperand % secondOperand));
    }
    document.getElementById("operand1").textContent = firstOperand;
    document.getElementById("operand2").textContent = secondOperand;
    document.getElementById("operator").textContent = "/";
}