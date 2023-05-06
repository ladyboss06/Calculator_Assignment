class Calculator{

  constructor(prevOperandTxtElmnt, currOperandTxtElmnt) {
    this.prevOperandTxtElmnt = prevOperandTxtElmnt;
    this.currOperandTxtElmnt = currOperandTxtElmnt;
    this.clear();
  }

  allClear() {
    this.currOper = '';
    this.prevOper = '';
    this.operation = undefined;
  }

  delete() {
    this.currOper = this.currOper.toString().slice(0, -1);
  }

  appendNumber(number) {
    if (number === '.' && this.currOper.includes('.')) return;
    this.currOper = this.currOper.toString() + number.toString();
  }

  chooseOperation(operation) {
   
  }

  compute() {

  }

  updateDisplay() {
    
}
}

const numberBtns = document.querySelectorAll('[data-number]');
const operationsBtns = document.querySelectorAll('[data-operations]');
const equalBtn = document.querySelector('[data-equal]');
const deleteBtn = document.querySelector('[data-delete]');
const allClearBtn = document.querySelector('[data-all-clear]');
const prevOperandTxtElmnt = document.querySelector('[data-previous-operand]');
const currOperandTxtElmnt = document.querySelector('[data-current-operand]');
const calculator = new Calculator(prevOperandTxtElmnt, currOperandTxtElmnt);

numberBtns.forEach(button => {

  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText)
    calculator.updateDisplay()
  })
})

operationsBtns.forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  })
})

equalBtn.addEventListener('click', button => {
  calculator.compute();
  calculator.updateDisplay();
})

allClearBtn.addEventListener('click', button => {
  calculator.clear();
  calculator.updateDisplay();
})

deleteBtn.addEventListener('click', button => {
  calculator.delete();
  calculator.updateDisplay();
})