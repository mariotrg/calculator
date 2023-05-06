let firstOperand = "";
let secondOperand = "";
let operator;
let result;
let current;

const numberBtn = document.querySelectorAll(".number-btn");
const operatorBtn = document.querySelectorAll(".operator-btn");
const equalsBtn = document.querySelector(".equals-btn");
const upperDisplay = document.querySelector(".upper-display");
const lowerDisplay = document.querySelector(".lower-display");

for (const button of numberBtn) {
  button.addEventListener("click", (e) => {
    appendNumber(e);
    updateDisplay();
  });
}

for (const button of operatorBtn) {
  button.addEventListener("click", (e) => {
    if (firstOperand && secondOperand && operator) {
      result =
        Math.round(
          operate(operator, Number(firstOperand), Number(secondOperand)) * 100
        ) / 100;
      firstOperand = result;
      result = "";
      secondOperand = "";
      updateDisplay();
    }
    operator = e.target.value;
    if (result) {
      firstOperand = result;
      result = "";
      secondOperand = "";
      updateDisplay();
    }
    updateDisplay();
  });
}

equalsBtn.addEventListener("click", (e) => {
  if (!operator) return false;
  if (firstOperand === "") firstOperand = 0;
  if (secondOperand === "") secondOperand = 0;
  result =
    Math.round(
      operate(operator, Number(firstOperand), Number(secondOperand)) * 100
    ) / 100;
  updateDisplay();
});

function appendNumber(e) {
  if (!operator) firstOperand += e.target.value;
  if (operator) secondOperand += e.target.value;
}

function updateDisplay() {
  if (!operator) lowerDisplay.textContent = `${firstOperand}`;
  if (operator) {
    upperDisplay.textContent = `${firstOperand} ${operator}`;
    lowerDisplay.textContent = `${secondOperand}`;
  }
  if (result) {
    upperDisplay.textContent = `${firstOperand} ${operator} ${secondOperand}`;
    lowerDisplay.textContent = `${result}`;
  }
}

function add(num1, num2) {
  return num1 + num2;
}

function substract(num1, num2) {
  return num1 - num2;
}

function multiply(num1, num2) {
  return num1 * num2;
}

function divide(num1, num2) {
  return num1 / num2;
}

function operate(operator, firstOperand, secondOperand) {
  switch (operator) {
    case "+":
      return add(firstOperand, secondOperand);
    case "-":
      return substract(firstOperand, secondOperand);
    case "*":
      return multiply(firstOperand, secondOperand);
    case "/":
      return divide(firstOperand, secondOperand);
  }
}
