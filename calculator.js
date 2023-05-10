// Select all calculator buttons
const display = document.querySelector(".display");
const numberBtns = document.querySelectorAll(".number");
const operationBtns = document.querySelectorAll(".operator");
const equalBtn = document.querySelector("#equal");
const deleteBtn = document.querySelector(".delete");
const allClearBtn = document.querySelector(".allClear");
const prevOperandTxtElmnt = document.querySelector(".prev-oper");
const currOperandTxtElmnt = document.querySelector(".curr-oper");

let currOper = "";
let prevOper = "";
let operation= undefined;


// Map out all the functions/operations that a calculator can perform
// allClear -> clear out all the values/numbers on the calculator screen
const allClear = () => {
	prevOper = ""; 
	currOper = ""; 
	operation = undefined; 
};

/* deletVal -> delete one value at a time on the calculator screen 
starting with the most recent number entered */
const deleteVal = () => {
	currOper = currOper.toString().slice(0, -1); 
};
/* appendNumber -> execute every time a user clicks on one of the 
calculator number buttons */
const appendNumber = (number) => {
	if (number === "." && currOper.includes(".")) return; 
	if (number === "0" && currOper === "0") return; 
	currOper = currOper.toString() + number.toString(); 
};

/* chooseOperation -> execute every time a user clicks one of 
the calculator operation buttons */
const chooseOperation = (operation) => {
	if (currOper === "") return;
	if (prevOper !== "") {
		compute();
	}
	operationSymbol = operation; 
	prevOper = currOper; 
	currOper = ""; 
};

/* compute -> take values stored in prevOper & currOper variables 
and do the relevant calculation */
const compute = () => {
	
  let computation; 
	const prev = parseFloat(prevOper); 
	const curr = parseFloat(currOper);
	
	if (isNaN(prev) || (isNaN(curr))) return; 

	// Dependeant which operation was selected -> do calculation
	switch (operationSymbol) {

    case "/":
			/* If / and current operand is 0 display Error -> cannot divide by 0 */
			if (curr == 0) {
				allClear();
				currOper = "Error!";
				return;
			} // else / both entered
			computation = prev / curr;
			break;
    
    // * -> multiply both numbers entered together
    case "*":
      computation = prev * curr;
      break;

    /* - -> subtract second number (curr) entered from 
    first number entered (prev)*/
    case "-":
    computation = prev - curr;
        break;
    
    // + -> add both numbers entered together
		case "+":
			  computation = prev + curr;
        break;
		
    // Default -> no calculation
		default:
			return;
	}
    
  // Round off deciaml numbers
    currOper = Math.round(computation * 100) / 100; 
	  operation = undefined; 
	  prevOper = ""; 
};

// updateDisplay -> update the value inside the calculator display
const updateDisplay = () => {
	currOperandTxtElmnt.innerText = currOper; 
	prevOperandTxtElmnt.innerText = prevOper; 
};

/* Select all the buttons on the calculator and add event listeners to 
loop over all th buttons and listen for when they are clicked on */
// Select and add event listeners for each number button
numberBtns.forEach((button) => {
	button.addEventListener("click", () => {
		appendNumber(button.textContent); 
		updateDisplay(); 
	});
});

// Select and add event listeners for each operation button
operationBtns.forEach((button) => {
	button.addEventListener("click", () => {
		appendNumber(button.textContent); 
		chooseOperation(button.textContent); 
		updateDisplay(); 
	});
});

// Select and add an event listener for the equal button
equalBtn.addEventListener("click", (button) => {
	compute();
	updateDisplay();
});

// Select and add an event listener for the all clear button
allClearBtn.addEventListener("click", (button) => {
	allClear();
	updateDisplay();
});

// Select and add an event listener for the delete button
deleteBtn.addEventListener("click", (button) => {
	deleteVal();
	updateDisplay();
});