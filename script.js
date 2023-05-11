const numberBtn = document.querySelectorAll(".number-btn");
const operatorBtn = document.querySelectorAll(".operator-btn");
const equalsBtn = document.querySelector(".equals-btn");
const deleteBtn = document.querySelector(".delete-btn");
const clearBtn = document.querySelector(".clear-btn");
const upperDisplay = document.querySelector(".upper-display");
const lowerDisplay = document.querySelector(".lower-display");

let currentOperand = "";
let previousOperand = "";
let operator = "";
let result = "";

numberBtn.forEach((button) => {
  button.addEventListener("click", (e) => {
    const num = e.target.value;
    appendNumber(num);
    updateDisplay();
  });
});

operatorBtn.forEach((button) => {
  button.addEventListener("click", (e) => {
    const sign = e.target.value;
    chooseOperation(sign);
    updateDisplay();
  });
});

equalsBtn.addEventListener("click", (e) => {
  if (operator === "") return;
  if (currentOperand === "") return;
  calculate();
  updateDisplay();
});

deleteBtn.addEventListener("click", (e) => {
  remove();
  updateDisplay();
});

clearBtn.addEventListener("click", (e) => {
  clear();
  updateDisplay();
});

function appendNumber(number) {
  if (result !== "") clear();
  if (number === "." && currentOperand.includes(".")) return;
  if (currentOperand === "" && number === ".") currentOperand = 0;
  currentOperand += number.toString();
}

function chooseOperation(sign) {
  if (currentOperand === "") return;
  if (previousOperand !== "") {
    calculate();
    currentOperand = result;
    operator = "";
    previousOperand = "";
    result = "";
  }
  operator = sign;
  previousOperand = currentOperand;
  currentOperand = "";
}

function updateDisplay() {
  upperDisplay.textContent = `${currentOperand} ${operator} ${previousOperand}`;
  lowerDisplay.textContent = `${result}`;
}

function remove() {
  currentOperand = currentOperand.toString();

  if (result !== "") return;
  if (currentOperand === "") {
    operator = operator.slice(0, -1);
    currentOperand = previousOperand;
    previousOperand = "";
    return;
  }
  currentOperand = currentOperand.slice(0, -1);
}

function clear() {
  previousOperand = "";
  currentOperand = "";
  operator = "";
  result = "";
}

function add(a, b) {
  return a + b;
}

function substract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (a === 0 || b === 0) return 0;
  return a / b;
}

function calculate() {
  const previous = Number(previousOperand);
  const current = Number(currentOperand);
  if (isNaN(previous) || isNaN(current)) return;

  switch (operator) {
    case "+":
      result = add(previous, current);
      break;
    case "-":
      result = substract(previous, current);
      break;
    case "*":
      result = multiply(previous, current);
      break;
    case "/":
      result = divide(previous, current);
      break;
    default:
      return;
  }

  return (result = Math.round(result * 1000) / 1000);
}
