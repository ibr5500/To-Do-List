import Task from './moudles/task.js';
import './index.css';


let tasksList = JSON.parse(localStorage.getItem('tasks')) || [];

const tasks = document.querySelector('.task-items');
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

const deleteTask = (e) => {
    const item = e.target;
    if (item.classList.contains('fa-trash')) {
        const removeParent = item.parentElement;
        removeParent.remove();
        const newTaskList = tasksList.filter((elem) => +elem.index !== +removeParent.id);
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

tasks.addEventListener('keypress', (event) => {
    if (event.target.type === 'text' && event.key === 'Enter') {
        const targetedElem = event.target.parentElement.parentElement;
        tasksList.filter((e) => +e.index === +targetedElem.id);
        tasksList[targetedElem.id - 1].description = event.target.value;
        localStorage.setItem('tasks', JSON.stringify(tasksList));
    }
});

tasks.addEventListener('change', (event) => {
    if (event.target.checked) {
        event.target.nextElementSibling.classList.add('checked');
        const index = event.target.id;
        tasksList[index - 1].completed = true;
        localStorage.setItem('tasks', JSON.stringify(tasksList));
        displayTask();
    } else {
        event.target.nextElementSibling.classList.remove('checked');
        const index = event.target.id;
        tasksList[index - 1].completed = false;
        localStorage.setItem('tasks', JSON.stringify(tasksList));
        displayTask();
    }
});

const refresh = document.querySelector('#refersh');
refresh.addEventListener('click', () => {
    window.location.reload();
});

const clearAll = document.querySelector('#clear');
clearAll.addEventListener('click', () => {
    let tasks = [];
    tasksList.map((task) => {
        if (!task.completed) {
            tasks = [...tasks, task];
        }
        tasksList = tasks;
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
    displayTask();
});

const addNewTask = document.querySelector('#new-item');
const enter = document.querySelector('#enter');
const enterKey = document.querySelector('#new-item');

const addTask = () => {
    enter.addEventListener('click', () => {
        if (!addNewTask.value) return;
        const index = tasksList.length + 1;
        const description = addNewTask.value;
        let completed;
        tasksList = [...tasksList, new Task(index, description, completed)];
        localStorage.setItem('tasks', JSON.stringify(tasksList));
        displayTask();
        addNewTask.value = '';
    });

    enterKey.addEventListener('keyup', (e) => {
        if (e.keyCode === 13) {
            if (!addNewTask.value) return;
            const index = tasksList.length + 1;
            const description = addNewTask.value;
            let completed;
            tasksList = [...tasksList, new Task(index, description, completed)];
            localStorage.setItem('tasks', JSON.stringify(tasksList));
            displayTask();
            addNewTask.value = '';
        }
    });
};

window.addEventListener('load', () => {
    displayTask();
    addTask();
});