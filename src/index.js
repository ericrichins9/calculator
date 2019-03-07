//import { isNumber } from "util";

var canReplace = true;
var canOp = false;
var canNum = true;
var canDec = true;

var currOp = '';
characters = [];
var calculations = document.getElementById('calculations').innerHTML;
var operatorKeyCodes = ['+','-','*','/']
var currNum = '';

function init(){
  document.getElementById('pad').addEventListener('click', function(event){
  handlePad(event.target);
  });

  document.addEventListener('keydown', function(event){
    event.preventDefault();
    handleKeyboard(event.key)
  });
}

if(document.getElementById('pad')){
  init();
}

function handleKeyboard(){
  if(event.shiftKey === false && event.keyCode >= 48 && event.keyCode <= 57) { //then this is a number (check keycodes)
    if (canNum){
      addNumber(event.key); //
      }
  }
  else if (operatorKeyCodes.includes(event.key)) { //then this is an operator
    if (canOp){
      addOperator(event.key);
    }
    canNum = true;
  }
  else if (event.key === '=' || event.key === 'Enter') { //this is an equals
    equate();
  }
  else if (event.key === '.') { //this is a decimal
    decimate();
  }
  else if(event.key === 'Backspace'){
    clear();
  }



}
function handlePad(){
  var btnType = event.target.getAttribute('type');
  if (btnType === 'number'){
    if (canNum){
    addNumber(event.target.value); //
    }
  }
  else if (btnType === 'operator') {
    if (canOp){
      addOperator(event.target.innerText);
    }
    canNum = true;
  }
  else if (btnType === 'equals') {
    equate();
  }
  else if (btnType === 'clear') {
    clear();
  }
  else if (btnType === 'decimal') {
    decimate();
  }
  else if (btnType === 'posNeg'){
    determinePosNeg();
  }
}

function determinePosNeg(){
    //do positive and negative stuff
      if (!canReplace){ //you simply want to ADD pos/neg to front of number
        addPosNeg();
      }
      else { //you CAN replace current Number with pos/neg
        if (+calculations > 0) {
        calculations = '-' + calculations;
        currNum = calculations;
        characters = [];
        // console.log(characters);
        printScreen(calculations);
      }
        else if (+calculations === 0){
          calculations = '-';
          currNum = calculations;
          characters = [];
          // console.log(characters);
          printScreen(calculations);
          canReplace = false;
        }
        else {
          calculations = calculations.slice(1);
          currNum = calculations;
          characters = [];
          // console.log(characters);
          printScreen(calculations);
        }
    }
}

function addPosNeg(){
  if (+currNum > 0){
    currNum = 0 - currNum;
    //add '-' to beginning of number string by finding last operator
    for (var i = calculations.length; i >= 0; i--){
      if (isValidOperator(calculations[i])){
        var calcBefore = calculations.slice(0,i+1);
        var calcAfter = calculations.slice(i+1);
        calculations = calcBefore + '-' + calcAfter;
        printScreen(calculations);
        break;
      }
      else if (i === 0) {
        calculations = '-' + calculations;
        currNum = calculations;
        printScreen(calculations);
        canReplace = false;
        break;
      }
    }
  }
  else if (currNum < 0) {
    currNum = 0 - currNum;
    //find most recent operator
    for (var i = calculations.length; i >= 0; i--){
      if (isValidOperator(calculations[i])){
        var calcBefore = calculations.slice(0,i);
        var calcAfter = calculations.slice(i+1);
        calculations = calcBefore + calcAfter;
        printScreen(calculations);
        break;
      }  
    // calculations = calculations.slice(-1);
    // printScreen(calculations);
  }
  }
  else if (currNum === '-') {
    currNum = '';
    calculations = calculations.slice(0,-1);
    printScreen(calculations);
  } 
  else {
    currNum = '-';
    calculations = calculations + currNum;
    // canReplace = true;
    printScreen(calculations);
  }
}
function calculateNumbers (str){
  str = eval(str);
  return str;
}

function isValidNumber (char){
  return isFinite(char);
}

function isValidOperator (char){
  return char === '+' || char === '-' || char === '*' || char === '/';
}

function clear(){
  var clear = '0';
  characters = [];
  currNum = '';
  currOp = '';
  replaceScreen(clear);
  canOp = false;
  canReplace = true;
  canDec = true;
  canNum = true;
}
function decimate(){
      if (canDec){
      addNumber('.');
      canOp = false;
      canDec = false;
      canNum = true;
    }
  }

function equate (){
  if (canReplace === false && isValidNumber(currNum)) {
    characters.push(currNum);
    for (var i = 0; i < characters.length; i+=2){
      if (+characters[i] < 0){ //put parethesis around neg numbers
        characters[i] = '(' + characters[i] + ')';
      }
    }
    setScreen(characters.join(''));
    calculations = document.getElementById('calculations').innerHTML;
    currNum = '';
    canReplace = true;
    canDec = true;
    characters = [];
    characters.push(calculations);
    currOp = '';
    canOp = true;
  }
  else {
    //canNum = false;
  }
}

function addNumber(value){
  //add (or replace) number to string on screen
    //on page load or on euquals, canReplace = true
  if (canReplace === true){
    characters = [];
    replaceScreen(value);
  }
  else {
    addToScreen(value);
  }
  canReplace = false;
  canOp = true;

  //add and replace number to array characters []
  
  currNum += value;
  if (currOp !== ''){
    characters.push(currOp);
  }
  currOp = '';
  // console.log(characters, currNum, currOp);

}

function addOperator(value){
  //add and replace number to array characters []
  currOp = value;
  if (currNum !== ''){
    characters.push(currNum);
  }
  currNum = '';  
  
  //add (or replace) op to string on screen
  if (isValidOperator(calculations[calculations.length -1])){
    replaceLastScreen(value)
  }

  else {
    addToScreen(value)
    canReplace = false;
  }
    //if last character isOp, canReplace = true;
    //else if last char isNum, canReplace = false;

  // console.log(characters, currNum, currOp);
  canDec = true;
}

function setScreen(str){
  // set the value of the screen
  var result = calculateNumbers(str);
  printScreen(result);
}

function replaceLastScreen(char){
  calculations = calculations.slice(0,-1);
  calculations = calculations.concat(char);
  printScreen(calculations);
}
function replaceScreen(char){
  calculations = char;
  printScreen(calculations);
}

function addToScreen(char){
  // calculations = document.getElementById('calculations').innerText;
  calculations = calculations + char;
  // add to end pf screen's value
  printScreen(calculations);
}

// DO NOT TEST IN JASMINE - THESE ARE DOM-INTERACTIVE FUNCTIONS
function printScreen(str){
  var calculation = document.getElementById('calculations');
  calculation.innerText = str;
  document.getElementById('calculations').innerHTML = calculation.innerHTML;
}