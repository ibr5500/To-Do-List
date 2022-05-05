import Task from './moudles/task.js';
import './index.css';

const tasks = document.querySelector('.task-items');

const refresh = document.querySelector('#refersh');

const clearAll = document.querySelector('#clear');

const addNewTask = document.querySelector('#new-item');
const enter = document.querySelector('#enter');
const enterKey = document.querySelector('#new-item');

let tasksList = JSON.parse(localStorage.getItem('tasks')) || [];

// display tasks function
const displayTask = () => {
  tasks.innerHTML = tasksList.map((task) => ` 
      <div id="${task.index}" class="task">
        <div>
            <input id="${task.index}" class="checkbox" type="checkbox" name="checkbox" ${!task.completed ? '' : 'checked'} />
            <input id="task" type='text' class=" ${!task.completed ? '' : 'checked'} " value="${task.description}" />
        </div>
        <i id="ellips-btn" class="fa-solid fa-ellipsis-vertical ellips hidden"></i>
        <i id="trash" class="fa-solid fa-trash trash"></i>
    </div>
      `).join('');
};

// save to local storage
const save = (elem) => localStorage.setItem('tasks', JSON.stringify(elem));

// delete task function
const deleteTask = (e) => {
  if (e.target.classList.contains('fa-trash')) {
    e.target.parentElement.remove();
    const newTaskList = tasksList.filter((elem) => +elem.index !== +e.target.parentElement.id);
    const updateTaskList = newTaskList.map((elem, index) => {
      elem.index = index + 1;
      return elem;
    });
    localStorage.setItem('tasks', JSON.stringify(updateTaskList));
    tasksList = updateTaskList;
    displayTask();
  }
};
tasks.addEventListener('click', deleteTask);

// editing task function
const editing = (event) => {
  if (event.target.type === 'text' && event.key === 'Enter') {
    const targetedElem = event.target.parentElement.parentElement;
    tasksList.filter((e) => +e.index === +targetedElem.id);
    tasksList[targetedElem.id - 1].description = event.target.value;
    save(tasksList);
  }
};

tasks.addEventListener('keypress', editing);

// update on changing the checkbock function
const updateChanges = (event) => {
  if (event.target.checked) {
    event.target.nextElementSibling.classList.add('checked');
    tasksList[event.target.id - 1].completed = true;
    save(tasksList);
    displayTask();
  } else {
    event.target.nextElementSibling.classList.remove('checked');
    tasksList[event.target.id - 1].completed = false;
    save(tasksList);
    displayTask();
  }
};

tasks.addEventListener('change', updateChanges);

// referesh on click refereshing button function
refresh.addEventListener('click', () => {
  window.location.reload();
});

// clear all completed function
const clearAllCompleted = () => {
  const uncompletedTasks = tasksList.filter((element) => element.completed !== true);
  const newTaskList = uncompletedTasks.map((elem, index) => {
    elem.index = index + 1;
    return elem;
  });
  save(newTaskList);
  window.location.reload();
};

clearAll.addEventListener('click', () => clearAllCompleted());

// add new task function
const addTask = () => {
  if (!addNewTask.value) return;
  const index = tasksList.length + 1;
  const description = addNewTask.value;
  let completed;
  tasksList = [...tasksList, new Task(index, description, completed)];
  save(tasksList);
  displayTask();
  addNewTask.value = '';
};

enter.addEventListener('click', () => addTask());
enterKey.addEventListener('keyup', (e) => {
  if (e.keyCode === 13) {
    addTask();
  }
});

window.addEventListener('DOMContentLoaded', () => {
  displayTask();
  addTask();
});

module.exports = addTask;