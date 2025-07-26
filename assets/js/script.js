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

    runGame("addition");
});

/**
 * The function runGame initializes the game by generating two random numbers
 */
function runGame(gameType) {
    let num1 = Math.floor(Math.random() * 25) + 1;
    let num2 = Math.floor(Math.random() * 25) + 1;

    if (gameType === "addition") {
        displayAdditionQuestion(num1, num2);
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
    } else {
        alert(`Incorrect! You answered ${userAnswer}. The correct answer was ${calculatedAnswer[0]}.`);
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
    } else {
        alert(`Unknown operator: ${operator}`);
        throw `Unknown operator: ${operator}. Aborting!`;
    }
}

function incrementScore() {

}

function incrementWrongAnswer() {

}

function displayAdditionQuestion(operand1, operand2) {
    document.getElementById("operand1").textContent = operand1;
    document.getElementById("operand2").textContent = operand2;
    document.getElementById("operator").textContent = "+";

}

function displaySubtractionQuestion() {

}

function displayMultiplicationQuestion() {

}