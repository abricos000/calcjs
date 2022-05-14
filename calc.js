let input = document.querySelector('.calc__input');

const addSelector = 'Rvt_action';
const addClass = `.${addSelector}`;
const rvtSelector = '.js-rvt-button';
const rvtClass = `.${rvtSelector}`;

const rvtSave = 'rvtSave';
const valueSave = 'valueSave';

const zero = '0';
const empty = '';
const maxInputLength = 20;



const remove = (key) => {
     localStorage.removeItem(key);
   }



const handleInsert = (num) => {
  remove(rvtSave);

  if (input.textContent == zero) {
    input.textContent = empty;
  }
  
  if (input.textContent.length <= maxInputLength) {
    input.textContent = input.textContent + num;
  }
}
const handleClean = () => {
  remove(rvtSave);
  input.textContent = zero;
}
const handleBack = () => {
  remove(rvtSave);
  let textContent = input.textContent;
  input.textContent = textContent.substring(0,textContent.length-1);
}
const saveInMemory = (keys,obj) => {
  localStorage.setItem(keys, JSON.stringify(obj));
}
const handleLoadRtv = (keys) => {
  const findRvtSelector = document.querySelector(rvtSelector);
  findRvtSelector.classList.remove(addSelector);
  findRvtSelector.removeAttribute("onclick", "handleLoadRtv(rvtSave)");
 
  if (localStorage.getItem(keys) != null) {
      let newtextContent = JSON.parse(localStorage.getItem(keys));
      input.textContent = newtextContent;    
  }
}
const handleEqual = () => {
  let textContent = input.textContent;
  
  if (textContent !== zero) {
    input.textContent = Math.trunc(eval(textContent) * 100000000) / 100000000;
    const findRvtSelector = document.querySelector(rvtSelector);
    findRvtSelector.classList.add(addSelector);
    findRvtSelector.setAttribute("onclick", "handleLoadRtv(rvtSave)");
  }

  if (localStorage.getItem(rvtSave) == null) {
    saveInMemory(rvtSave,textContent);
  }
}
const handleChange = () => {
  remove(rvtSave);
  let textContent = input.textContent;
  input.textContent = textContent * -1;
}
const handleMemorySave = () => {
  let textContent = input.textContent;
  saveInMemory(valueSave,eval(textContent)); 

  if (localStorage.getItem(valueSave) != null) {
   const newtextContent = JSON.parse(localStorage.getItem(valueSave)); 
  }
}
const handleMemoryClear = () => {
  if (localStorage.getItem(valueSave) != null) {
  remove(valueSave);
  }
}
const handleMemoryPlus = () => {

  if (localStorage.getItem(valueSave) != null) {
   let newtextContent = JSON.parse(localStorage.getItem(valueSave));
   let textContent = input.textContent;
   const new_textContent = newtextContent + eval(textContent);
   saveInMemory(valueSave,new_textContent);
  }
}
const handleMemoryMinus = () => {
 
  if (localStorage.getItem(valueSave) != null) {
      let newtextContent = JSON.parse(localStorage.getItem(valueSave));
      let textContent = input.textContent;
      const new_textContent = newtextContent - eval(textContent);
      saveInMemory(valueSave,new_textContent);
  }
}
const handleMemoryRead = () => {

  if (localStorage.getItem(valueSave) != null) {
      const newtextContent = JSON.parse(localStorage.getItem(valueSave));
      input.textContent = newtextContent ;
  }    
}