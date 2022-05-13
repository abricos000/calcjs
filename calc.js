// MS (Memory Save) - кнопка означает сохранить число, отображенное в данный момент на дисплее калькулятора в память.

// MR (Memory Read) - кнопка означает считать число из ячейки памяти и вывести его на дисплей.

// MC (Memory Clear) - кнопка означает стереть данные из ячейки памяти.

// M+ - прибавить к числу из памяти число, отображенное на дисплее и результат записать в память вместо предыдущего.

// M- - вычесть из числа в памяти число, отображенное на дисплее калькулятора и результат записать в память.
 
let input = document.querySelector('.calc_input');

const insert = (num) =>{
  localStorage.clear('rvtSave');
  if(input.textContent ==='0'){
  input.textContent = '';
  }
  input.textContent =input.textContent + num;
}
const clean = () => {
  localStorage.clear('rvtSave');
  input.textContent ='0';
}
const back = () =>{
  localStorage.clear('rvtSave');
  let exp = input.textContent;
  input.textContent = exp.substring(0,exp.length-1);
}

const SaveRvt = (keys,obj) => {
  localStorage.setItem(keys, JSON.stringify(obj));
}
const LoadRvt = (keys) => {
  document.querySelector('.Rvt').classList.remove('Rvt_action');
 
  let b = document.querySelector(".Rvt");
  b.removeAttribute("onclick", "LoadRvt('rvtSave')");
  
  const newExp=JSON.parse(localStorage.getItem(keys));
   if(localStorage.key(keys)!=null)
   {
      input.textContent = newExp;
      // console.log(newExp);
   }
}
const equal = () => {
  let exp = input.textContent;
  
  if(exp!=='0'){
    input.textContent = eval(exp);
    document.querySelector('.Rvt').classList.add('Rvt_action');
    let b = document.querySelector(".Rvt");
    b.setAttribute("onclick", "LoadRvt('rvtSave')");
  }
  
  if(localStorage.key('rvtSave')==null){
    SaveRvt('rvtSave',exp);
  }
}
const change = () =>{
  localStorage.clear('rvtSave');
  let exp = input.textContent;
  input.textContent = exp * -1;
}
const memorySave = () =>{
  let exp = input.textContent;

  SaveRvt('valueSave',eval(exp)); 

  const newExp=JSON.parse(localStorage.getItem('valueSave'));
  console.log(newExp);
}
// const memoryClear = () =>{
//   if(localStorage.key('valueSave')!=null)
//   {
//       localStorage.clear('valueSave');
//   }

// }
const memoryPlus = () =>{
  
 
    const newExp=JSON.parse(localStorage.getItem('valueSave'));
    let exp = input.textContent;
    const new_Exp = newExp + eval(exp);
    console.log(new_Exp);
  
}
const memoryMinus = () =>{
 
  
      const newExp=JSON.parse(localStorage.getItem('valueSave'));
 
      let new_Exp = newExp - eval(input.textContent);
      console.log(new_Exp);
  
}
const memoryRead = () =>{
 
      const newExp=JSON.parse(localStorage.getItem('valueSave'));
      console.log(newExp);
 
      // input.textContent = newExp ;
      
  
}