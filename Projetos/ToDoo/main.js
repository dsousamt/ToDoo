const form = document.querySelector('form');
const tasksFront = document.querySelector('.tasksContent');
const trashBtn = document.querySelector('.deleteTask');


//functions

const addToLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
}

const getFromLocalStorage = (key) => {
  return JSON.parse(localStorage.getItem(key));
}


//define an array with most recent data from localstorage or an empty one

const arrTasks = getFromLocalStorage('tasks') || [];

//save items to localstorage

form.addEventListener('submit', function (event) {
  event.preventDefault();

  const taskItem = document.querySelector('#taskItem').value;

  arrTasks.push({task: taskItem, isChecked: false});

  addToLocalStorage('tasks', arrTasks);

  tasksFront.innerHTML = tasksFront.innerHTML +
  `<div class="taskItem" ><input type='checkbox'>${arrTasks[arrTasks.length - 1].task}<button id="deleteTask">Remover</button></div>`;
  location.reload();

});

//Show array in HTML
for (let index = 0; index < arrTasks.length; index++) {

  tasksFront.innerHTML = tasksFront.innerHTML +
  `<div class="taskItem" >
    <input id="isChecked${index}" type='checkbox'${arrTasks[index].isChecked == true ? 'checked' : '' }>
    <p>${arrTasks[index].task}</p>
    <button id="deleteTask${index}">Remover</button>
  </div>`;

  const btn = document.querySelector(`#isChecked${index}`);
  const taskTxt = btn.nextElementSibling;

  if (arrTasks[index].isChecked == true) {
    taskTxt.classList.add('doneTask');
  } else {
    taskTxt.classList.remove('doneTask');
  }
  
}


//remove data from localstorage and front

for (let index = 0; index < arrTasks.length; index++) {
    
  let btn = document.querySelector(`#deleteTask${index}`);
  
  btn.addEventListener('click', (event) => {
    arrTasks.splice(index, 1);
    addToLocalStorage('tasks', arrTasks);
    location.reload();
  });
}


/*

Apply dinamically line throgut in task text when you click in the checkbox
associar o checked do check box a um valor booleano

*/

for (let index = 0; index < arrTasks.length; index++) {
    
  let btn = document.querySelector(`#isChecked${index}`);

  let taskTxt = btn.nextElementSibling;
  
  btn.addEventListener('click', (event) => {
    //código que atualiza o front do checkbox

    //codigo que atualiza a propriedade isChecked do Array de objetos

    if (btn.checked == true) {
      arrTasks[index].isChecked = true;
      taskTxt.classList.add('doneTask')
    } else if (btn.checked == false) {
      arrTasks[index].isChecked = false;
      taskTxt.classList.remove('doneTask');
    }
    addToLocalStorage('tasks', arrTasks);
    //location.reload();
  });
}

