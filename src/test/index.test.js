const { addTask } = require('../index.js');

describe('Test  Add and Delete functions', () => {
  test('Add a new task', () => {
    const tasksList = [];
    addTask(tasksList, 'test the addition of a task', false);
    expect(tasksList).toEqual([{
      index: 1,
      description: 'test the addition of a task',
      completed: false,
    }]);
    // expect(localStorageMock.setItem).toBeCalledWith('tasks', JSON.stringify(tasksList));
  });
});