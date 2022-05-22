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

document.onkeydown = function (event) {
const btnKey = event.key;
  
  if(btnKey == "1" || btnKey == "2" || btnKey == "3" || btnKey == "4" || btnKey == "5"
   || btnKey == "6" || btnKey == "7" || btnKey == "8" || btnKey == "9" || btnKey == "0" 
   || btnKey == "/" || btnKey == "+" || btnKey == "-" || btnKey == "*" || btnKey == "." 
   || btnKey == "("  || btnKey == ")" ){

   handleInsert(btnKey);
  }
  else if(btnKey == 'Backspace'){
         handleBack();
       }
  else if(btnKey == 'Enter'){
         handleEqual();
       }
  else if(btnKey == 'ArrowLeft'){
    handleLoadRtv(rvtSaveKey);
      }
      else if(btnKey == 'Delete'){
        handleCleanInput();
          } 
        }
    
function ChekingLastInt(IndexLastElementString){
  return (input.textContent[IndexLastElementString]=='+' || input.textContent[IndexLastElementString]=='-' || input.textContent[IndexLastElementString]=='/' || input.textContent[IndexLastElementString]=='*')
}

function ChekingLastFloat(IndexLastElementString){
  return input.textContent[IndexLastElementString]=='.';
}

function ChekingLast(IndexLastElementString){
  return (input.textContent[IndexLastElementString]=='+' || input.textContent[IndexLastElementString]=='-' || input.textContent[IndexLastElementString]=='/' || input.textContent[IndexLastElementString]=='*' || input.textContent[IndexLastElementString]=='.')
}

function ChekingLastPref(IndexLastElementString){
  return (input.textContent[IndexLastElementString-1]=='+' || input.textContent[IndexLastElementString-1]=='-' || input.textContent[IndexLastElementString-1]=='/' || input.textContent[IndexLastElementString-1]=='*' || input.textContent[IndexLastElementString-1]=='.');
}


const handleInsert = (num) => {
  removeFromMemory(rvtSaveKey);

  if (input.textContent == zero) {
    input.textContent = empty;
  }
   if (input.textContent.length <= maxInputLength ) 
   { 
      if(input.textContent.length > 0)
       { 
                input.textContent = input.textContent + num;
                let IndexLastElementString = input.textContent.length-1;

                 if(ChekingLastInt(IndexLastElementString))
                  {
                    saveZnakIndex = IndexLastElementString;
                    counterLength = 12;
                    counterInt = 0;
                  }

                 else
                 if(ChekingLastFloat(IndexLastElementString))
                 {
                   counterInt = 0;
                   counterLength = 8;
                 }

                 else
                 if(counterInt < counterLength)
                 {
                      counterInt++;
                 }

                 else
                 if(counterInt > counterLength - 1)
                 {
                  handleBack1();
                 }

                 if( ChekingLastPref(IndexLastElementString) && ChekingLast(IndexLastElementString))
                  {
                     handleBack1();
                  }
                
       }
          else
            {
             counterInt++;
             input.textContent = input.textContent + num;
            }

   }
  }


const handleCleanInput = () => {
  removeFromMemory(rvtSaveKey);
  counterInt = 0;
  input.textContent = zero;
}
const handleBack = () => {
  removeFromMemory(rvtSaveKey);
  if(counterInt > 0){
    counterInt--;
  }
  let textContent = input.textContent;
  input.textContent = textContent.substring(0,textContent.length-1);
}
const handleBack1 = () => {
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
    input.textContent = eval(textContent).toFixed(numberAfterPoint);
    let IndexLastElementString = input.textContent.length-1;
    while(input.textContent[IndexLastElementString] == zero){
      handleBack();
      IndexLastElementString--;
    }
    if(input.textContent[IndexLastElementString]=='.'){
      handleBack();
    }
    const findRvtSelector = document.querySelector(rvtSelector);
    findRvtSelector.classList.add(addSelector);
    findRvtSelector.setAttribute("onclick", "handleLoadRtv(rvtSaveKey)");
  }

  if (localStorage.getItem(rvtSaveKey) == null) {
    saveInMemory(rvtSaveKey,textContent);
  }

  counterInt = input.textContent.length;
  counterLength = 12;
}

const handleChange = () => {
  removeFromMemory(rvtSaveKey);
  if(saveZnakIndex!=0){
  shiftString(saveZnakIndex);
  addInsert(saveZnakIndex);
  }
  else
    if(saveZnakIndex==0){
      input.textContent =  input.textContent * (-1);
    }
}

const shiftString = (IndexLastElementString) => {
  input.textContent = input.textContent + '...';
  for( let i = input.textContent.length - 1; i > IndexLastElementString+3; i--){
    rep(input.textContent, i-1, input.textContent[i-3]);
  }
}

const addInsert = (IndexLastElementString) => {
  input.textContent[IndexLastElementString]= '(';
  rep(input.textContent,IndexLastElementString+1, '(');
  rep(input.textContent,IndexLastElementString+2, '-');
  rep(input.textContent, input.textContent.length-1, ')');
}

const rep = (str, IndexLastElementString,str2) =>  {
  str = setCharAt(str,IndexLastElementString,str2);
 input.textContent = str
}

const setCharAt = (str,index,chr) => {
  if(index > str.length-1) return str;
  return str.substr(0,index) + chr + str.substr(index+1);
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