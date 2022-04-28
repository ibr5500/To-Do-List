import './index.css';

const tasks = document.querySelector('.todo-items');

const tasksList = [{
  index: 0,
  description: 'Go Running',
  completed: false,
},
{
  index: 1,
  description: 'Coding',
  completed: true,
},
{
  index: 2,
  description: 'Swiming',
  completed: false,
},
];

const getTasks = () => {
  tasks.innerHTML = tasksList.map((task) => `
  <div class="task">
                    <div>
                        <input id="checkbox-${task.index}" type="checkbox" name="checkbox" ${!task.completed ? '' : 'checked'} />
                        <label id="task" for="to-do-task" class="${task.completed ? 'checked' : ''}">${task.description}</label>
                    </div>
                    <i id="ellips" class="fa-solid fa-ellipsis-vertical ellips"></i>
                </div>
  `).join('');
};

window.addEventListener('load', () => {
  getTasks();
});