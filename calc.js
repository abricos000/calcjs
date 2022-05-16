const addSelector = 'rvt_action';
const addClass = `.${addSelector}`;
const rvtSelector = '.js-rvt-button';
const rvtClass = `.${rvtSelector}`;
const inputSelector = '.js-calc-input';

const rvtSaveKey = 'rvtSave';
const valueSaveKey = 'valueSave';

const zero = '0';
const empty = '';
const maxInputLength = 20;
const maxZeroAfterDot = 100000000;

const input = document.querySelector(inputSelector);


const removeFromMemory = (key) => {
     localStorage.removeItem(key);
   }



const handleInsert = (num) => {
  removeFromMemory(rvtSaveKey);

  if (input.textContent == zero) {
    input.textContent = empty;
  }
  
  if (input.textContent.length <= maxInputLength) {
    input.textContent = input.textContent + num;
  }
}

const handleCleanInput = () => {
  removeFromMemory(rvtSaveKey);
  input.textContent = zero;
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
 
  if (localStorage.getItem(keys) != null) {
      let getKey = JSON.parse(localStorage.getItem(keys));
      input.textContent = getKey;    
  }
}

const handleEqual = () => {
  let textContent = input.textContent;
  
  if (textContent !== zero) {
    input.textContent = Math.trunc(eval(textContent) * maxZeroAfterDot) / maxZeroAfterDot;
    const findRvtSelector = document.querySelector(rvtSelector);
    findRvtSelector.classList.add(addSelector);
    findRvtSelector.setAttribute("onclick", "handleLoadRtv(rvtSaveKey)");
  }

  if (localStorage.getItem(rvtSaveKey) == null) {
    saveInMemory(rvtSaveKey,textContent);
  }
}

const handleChange = () => {
  removeFromMemory(rvtSaveKey);
  let textContent = input.textContent;
  input.textContent = textContent * -1;
}

const handleMemorySave = () => {
  let textContent = input.textContent;
  saveInMemory(valueSaveKey,eval(textContent)); 

  if (localStorage.getItem(valueSaveKey) != null) {
   const getKey = JSON.parse(localStorage.getItem(valueSaveKey)); 
  }
}

const handleMemoryClear = () => {
  if (localStorage.getItem(valueSaveKey) != null) {
  removeFromMemory(valueSaveKey);
  }
}

const handleMemoryPlus = () => {

  if (localStorage.getItem(valueSaveKey) != null) {
   let getKey = JSON.parse(localStorage.getItem(valueSaveKey));
   let textContent = input.textContent;
   const newTextContent = getKey + eval(textContent);
   saveInMemory(valueSaveKey,newTextContent);
  }
}

const handleMemoryMinus = () => {
 
  if (localStorage.getItem(valueSaveKey) != null) {
      let getKey = JSON.parse(localStorage.getItem(valueSaveKey));
      let textContent = input.textContent;
      const newTextContent = getKey - eval(textContent);
      saveInMemory(valueSaveKey,newTextContent);
  }
}

const handleMemoryRead = () => {

  if (localStorage.getItem(valueSaveKey) != null) {
      const getKey = JSON.parse(localStorage.getItem(valueSaveKey));
      input.textContent = getKey;
  }    
}