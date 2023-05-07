let firstOperand = "";
let secondOperand = "";
let operator = "";
let result = "";
let decimalAllowed = true;

const numberBtn = document.querySelectorAll(".number-btn");
const operatorBtn = document.querySelectorAll(".operator-btn");
const equalsBtn = document.querySelector(".equals-btn");
const deleteBtn = document.querySelector(".delete-btn");
const clearBtn = document.querySelector(".clear-btn");
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
    if (firstOperand !== "" && secondOperand !== "" && operator !== "") {
      result = (
        Math.round(
          operate(operator, Number(firstOperand), Number(secondOperand)) * 1000
        ) / 1000
      ).toString();
      updateDisplay();
      firstOperand = result;
      result = "";
      secondOperand = "";
    }
    if (result !== "") {
      firstOperand = result;
      result = "";
      secondOperand = "";
      updateDisplay();
    }
    operator = e.target.value;
    updateDisplay();
  });
}

equalsBtn.addEventListener("click", (e) => {
  if (operator === "") return false;
  if (firstOperand === "") firstOperand = "0";
  if (secondOperand === "") secondOperand = "0";
  result = (
    Math.round(
      operate(operator, Number(firstOperand), Number(secondOperand)) * 1000
    ) / 1000
  ).toString();
  updateDisplay();
});

deleteBtn.addEventListener("click", () => {
  if (firstOperand !== "" && operator === "") {
    firstOperand = firstOperand.slice(0, -1);
    updateDisplay();
  } else if (secondOperand !== "" && operator !== "" && result === "") {
    secondOperand = secondOperand.slice(0, -1);
    updateDisplay();
  } else if (operator !== "" && secondOperand === "") {
    operator = operator.slice(0, -1);
    updateDisplay();
  }
});

clearBtn.addEventListener("click", (e) => {
  clear();
});

function clear() {
  firstOperand = "";
  secondOperand = "";
  result = "";
  operator = "";
  updateDisplay();
}

function appendNumber(e) {
  if (result !== "") {
    firstOperand = "";
    secondOperand = "";
    result = "";
    operator = "";
  }

  if (secondOperand.includes(".") && e.target.value === ".") {
    return;
  } else if (
    operator !== "" &&
    secondOperand === "" &&
    e.target.value === "."
  ) {
    secondOperand += `0${e.target.value}`;
  } else {
    if (operator !== "") secondOperand += e.target.value;
  }

  if (firstOperand.includes(".") && e.target.value === "." && operator === "") {
    return;
  } else if (operator === "" && firstOperand === "" && e.target.value === ".") {
    firstOperand += `0${e.target.value}`;
  } else {
    if (operator === "") firstOperand += e.target.value;
  }
}

function updateDisplay() {
  upperDisplay.textContent = `${firstOperand} ${operator} ${secondOperand}`;
  lowerDisplay.textContent = `${result}`;
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
  if (num1 === 0 || num2 === 0) return 0;
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
