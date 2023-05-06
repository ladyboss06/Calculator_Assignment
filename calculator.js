class Calculator{

  constructor(prevOperandTxtElmnt, currOperandTxtElmnt) {
    this.prevOperandTxtElmnt = prevOperandTxtElmnt
    this.currOperandTxtElmnt = currOperandTxtElmnt
    this.clear()
  }

  allClear() {
    this.currOper = ''
    this.prevOper = ''
    this.operation = ''
  }

  delete() {
    this.currentOperand = this.currOper.toString().slice(0, -1)
  }

  appendNumber(number) {

    if (number === '.' && this.currOper.includes('.')) return
    this.currOper = this.currOper.toString() + number.toString()
  }

  chooseOperation(operation) {
    if (this.currOperand === '') return
    if (this.prevOperand !== '') {
      this.compute()
    }
    this.operation = operation
    this.prevOper = this.currOper
    this.currOper = ''
  }

  compute() {
    let computation
    const prev = parseFloat(this.prevOper)
    const current = parseFloat(this.currOper)
    if (isNaN(prev) || isNaN(current)) return
    switch (this.operation) {
      case '+':
        computation = prev + current
        break
      case '-':
        computation = prev - current
        break
      case '*':
        computation = prev * current
        break
      case '÷':
        computation = prev / current
        break
      default:
        return
    }
    this.currOper = computation
    this.operation = undefined
    this.prevOper = ''
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString()
    const integerDigits = parseFloat(stringNumber.split('.')[0])
    const decimalDigits = stringNumber.split('.')[1]
    let integerDisplay
    if (isNaN(integerDigits)) {
      integerDisplay = ''
    } else {
      integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`
    } else {
      return integerDisplay
    }
  }

  updateDisplay() {
    this.currOperandTxtElmnt.innerText =
    this.getDisplayNumber(this.currentOperand)
  if (this.operation != null) {
    this.prevOperandTxtElmnt.innerText =
      `${this.getDisplayNumber(this.prevOper)} ${this.operation}`
  } else {
    this.previousOperandTextElement.innerText = ''
  }
  }
}


const numberBtns = document.querySelectorAll('[data-number]')
const operationsBtns = document.querySelectorAll('[data-operations]')
const equalBtn = document.querySelector('[data-equal]')
const deleteBtn = document.querySelector('[data-delete]')
const allClearBtn = document.querySelector('[data-all-clear]')
const prevOperandTxtElmnt = document.querySelector('[data-previous-operand]')
const currOperandTxtElmnt = document.querySelector('[data-current-operand]')

const calculator = new Calculator(prevOperandTxtElmnt, currOperandTxtElmnt)

numberBtns.forEach(button => {

  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText)
    calculator.updateDisplay()
  })

})

operationsBtns.forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText)
    calculator.updateDisplay()
  })
})
equalBtn.addEventListener('click', button => {
  calculator.compute()
  calculator.updateDisplay()
})

allClearBtn.addEventListener('click', button => {
  calculator.clear()
  calculator.updateDisplay()
})

deleteBtn.addEventListener('click', button => {
  calculator.delete()
  calculator.updateDisplay()
})