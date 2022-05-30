const addSelector = 'rvt_action';
const addClass = `.${addSelector}`;
const rvtSelector = '.js-rvt-button';
const rvtClass = `.${rvtSelector}`;
const inputSelector = '.js-calc-input';

const rvtSaveKey = 'rvtSave';
const valueSaveKey = 'valueSave';

const zero = '0';
const empty = '';
const maxInputLength = 21;
const maxZeroAfterDot = 100000000;
let counterInt = 0;
let counterLength = 12;
let saveZnakIndex = 0;
let numberAfterPoint = 8;

const input = document.querySelector(inputSelector);

const removeFromMemory = (key) => {
     localStorage.removeItem(key);
   }

const isNumber = (btnKey) => {
  return !isNaN(btnKey)
}

const isOperator = (btnKey) => {   
  const operatorData = {
    '/': true,
    '(': true,
    ')': true,
    '+': true,
    '-': true,
    '*': true,
    '.': true,
  }
  return operatorData[btnKey];
}


document.onkeydown = function (event) {  // ввод с клавиатуры
  const btnKey = event.key;

  if( isNumber(btnKey) || isOperator(btnKey) ){
   return handleInsert(btnKey);
  }
  const helpedData = {
    'Backspace': () => handleBackCounterDecrement(),
    'ArrowLeft': () => handleLoadRtv(rvtSaveKey),
    'Enter': () => handleEqual(),
    'Delete': () => handleCleanInput(),
  }
  const handler = helpedData[btnKey]

  if(handler) {
    handler()
 }
}
    
const chekingLastInt = (IndexLastElementString) => {
  const char = input.textContent[IndexLastElementString];
  return (char=='+' || char=='-' || char=='/' || char=='*');
}

const chekingLastFloat = (IndexLastElementString) => {
  const char = input.textContent[IndexLastElementString];
  return char=='.';
}

const chekingLast = (IndexLastElementString) => {
  const char = input.textContent[IndexLastElementString];
  return (char=='+' || char=='-' || char=='/' || char=='*' || char=='.');
}

const chekingLastPref = (IndexLastElementString) => {
  const prevChar = input.textContent[IndexLastElementString-1];
  return (prevChar=='+' || prevChar=='-' || prevChar=='/' || prevChar=='*' || prevChar=='.');
}


const handleInsert = (num) => {
  removeFromMemory(rvtSaveKey);
  
  if(input.textContent.length > maxInputLength){ 
    return;
  }

  if(input.textContent == zero){
    input.textContent = empty;
  }

  if(input.textContent.length <= 0){
    counterInt++;
    input.textContent = input.textContent + num;
    return;
  }

  input.textContent = input.textContent + num;
  let IndexLastElementString = input.textContent.length-1;

    if(chekingLastInt(IndexLastElementString)){// ограничение ввода знака до запятой
      saveZnakIndex = IndexLastElementString;
      counterLength = 12;
      counterInt = 0;
    }

    else if(chekingLastFloat(IndexLastElementString)){// ограничение повтора операторов
      counterInt = 0;
      counterLength = 8;
    }

    else if(counterInt < counterLength){
        counterInt++;
    }

    else if(counterInt > counterLength - 1){
    handleBack();
    }

    if(chekingLastPref(IndexLastElementString) && chekingLast(IndexLastElementString)){// ограничение ввода знака до запятой
        handleBack();
    }
  }

const handleCleanInput = () => {
  removeFromMemory(rvtSaveKey);
  counterInt = 0;
  input.textContent = zero;
}
const handleBackCounterDecrement = () => {
  removeFromMemory(rvtSaveKey);
  
  if(counterInt > 0){
    counterInt--;
  }
  let textContent = input.textContent;
  input.textContent = textContent.substring(0,textContent.length-1);
}
const handleBack = () => {
  removeFromMemory(rvtSaveKey);
  let textContent = input.textContent;
  input.textContent = textContent.substring(0,textContent.length-1);
}

const saveInMemory = (keys,obj) => {
  localStorage.setItem(keys, JSON.stringify(obj));
}

const handleLoadRtv = (keys) => {
  const findRvtSelector = document.querySelector(rvtSelector);
  findRvtSelector.classList.remove(addSelector);
  findRvtSelector.removeAttribute("onclick", "handleLoadRtv(rvtSaveKey)");
 
  if(localStorage.getItem(keys) != null){
      let getKey = JSON.parse(localStorage.getItem(keys));
      input.textContent = getKey;
  }
}

const handleEqual = () => {
  let textContent = input.textContent;

  if(textContent !== zero){
    input.textContent = eval(textContent).toFixed(numberAfterPoint);// идет округление числа после нажатия на равно
    let IndexLastElementString = input.textContent.length-1;

    while(input.textContent[IndexLastElementString] == zero){
      handleBackCounterDecrement();
      IndexLastElementString--;
    }

  if(input.textContent[IndexLastElementString]=='.'){
    handleBackCounterDecrement();
  }
  const findRvtSelector = document.querySelector(rvtSelector);
  findRvtSelector.classList.add(addSelector);
  findRvtSelector.setAttribute("onclick", "handleLoadRtv(rvtSaveKey)");
  }

  if(localStorage.getItem(rvtSaveKey) == null){
    saveInMemory(rvtSaveKey,textContent);
  }

  counterInt = input.textContent.length;
  counterLength = 12;
}

const handleChange = () => {
  removeFromMemory(rvtSaveKey);

  if(saveZnakIndex!=0){ // условие если знак не равер нулевому индексу в строке
    shiftString(saveZnakIndex);
    addInsert(saveZnakIndex);
  }

  else if(saveZnakIndex==0){
      input.textContent =  input.textContent * (-1);
  }
}

const shiftString = (IndexLastElementString) => {
  input.textContent = input.textContent + '...';// выделение памети под (, -, )

  for( let i = input.textContent.length - 1; i > IndexLastElementString+3; i--){
    replaceCharacterInString(input.textContent, i-1, input.textContent[i-3]);
  }
}

const addInsert = (IndexLastElementString) => {  //функция вставки операторов в последнее хначение
  input.textContent[IndexLastElementString]= '(';
  replaceCharacterInString(input.textContent,IndexLastElementString+1, '(');
  replaceCharacterInString(input.textContent,IndexLastElementString+2, '-');
  replaceCharacterInString(input.textContent, input.textContent.length-1, ')');
}


const replaceCharacterInString = (str, IndexLastElementString,str2) => {// функция замены знака
 str = setCharAt(str,IndexLastElementString,str2);
 input.textContent = str;
}

const setCharAt = (str,index,chr) => {

  if(index > str.length-1) return str;
  return str.substr(0,index) + chr + str.substr(index+1);
}

const handleMemorySave = () => {
  let textContent = input.textContent;
  saveInMemory(valueSaveKey,eval(textContent)); 

  if(localStorage.getItem(valueSaveKey) != null){
    const getKey = JSON.parse(localStorage.getItem(valueSaveKey)); 
  }
}

const handleMemoryClear = () => {

  if(localStorage.getItem(valueSaveKey) != null){
    removeFromMemory(valueSaveKey);
  }
}

const handleMemoryPlus = () => {

  if(localStorage.getItem(valueSaveKey) != null){
    let getKey = JSON.parse(localStorage.getItem(valueSaveKey));
    let textContent = input.textContent;
    const newTextContent = getKey + eval(textContent);
    saveInMemory(valueSaveKey,newTextContent);
  }
}

const handleMemoryMinus = () => {
 
  if(localStorage.getItem(valueSaveKey) != null){
    let getKey = JSON.parse(localStorage.getItem(valueSaveKey));
    let textContent = input.textContent;
    const newTextContent = getKey - eval(textContent);
    saveInMemory(valueSaveKey,newTextContent);
  }
}

const handleMemoryRead = () => {

  if(localStorage.getItem(valueSaveKey) != null){
    const getKey = JSON.parse(localStorage.getItem(valueSaveKey));
    input.textContent = getKey;
  }    
}