 const { addTask, deleteTask } = require('./index.js');

 describe('Test  Add and Delete functions', () =>{
     test('Add a new task', () =>{
         const arr = [];
         addTask(arr, description = 'test the addition of a task', completed = false);
         expect(arr).toEqual([{index:1, description: 'test the addition of a task', completed:flase }]);
         expect(localStorageMock.setItem).toBeCalledWith('tasks', JSON.stringify(arr));
     })

 }
 );