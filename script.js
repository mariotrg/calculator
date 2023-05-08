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

numberBtn.forEach((number) => {
  number.addEventListener("click", (e) => {
    let num = e.target.value;
    appendNumber(num);
    updateDisplay();
  });
});

operatorBtn.forEach((operator) => {
  operator.addEventListener("click", (e) => {
    let sign = e.target.value;
    handleOperatorClick(sign);
    updateDisplay();
  });
});

equalsBtn.addEventListener("click", (e) => {
  if (operator === "") return;
  result = calculate();
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

function appendOperator(sign) {
  operator = sign;
}

function handleOperatorClick(sign) {
  if (currentOperand === "") return;
  if (operator !== "" && currentOperand === "") {
    appendOperator(sign);
    return;
  }
  if (operator === "") {
    previousOperand = currentOperand;
    currentOperand = "";
    appendOperator(sign);
    return;
  }

  result = calculate();
  previousOperand = result.toString();
  result = "";
  currentOperand = "";
  appendOperator(sign);
}

function updateDisplay() {
  upperDisplay.textContent = `${previousOperand} ${operator} ${currentOperand}`;
  lowerDisplay.textContent = `${result}`;
}

function remove() {
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
  return (
    Math.round(operate(operator, previousOperand, currentOperand) * 1000) / 1000
  );
}

function operate(operator, a, b) {
  a = Number(a);
  b = Number(b);

  switch (operator) {
    case "+":
      return add(a, b);
    case "-":
      return substract(a, b);
    case "*":
      return multiply(a, b);
    case "/":
      return divide(a, b);
  }
}
