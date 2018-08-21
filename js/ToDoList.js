//ToDoList constructor
class ToDoList {
  constructor(sectionName, elId) {
    this.sectionName = sectionName;
    this.elId = elId;
    let task1 = new Task("JS");
    task1.onDeleteCallback = this._onDelete.bind(this);

    //this._tasks = [task1, new Task("CSS")];
    this._tasks = [];
    this.doneTasks = [];
    //this.onDeleteCallback = null;

    this.render();
    this.addTaskIntoArray();
    this._onDelete();

  }

  _pushItemInArrayAndAddMethod(e) {

    let taskName = document.querySelector('#itemInput').value;
    //this._tasks = [];
    console.log(typeof this._tasks);
    //this._tasks.push(taskName);
    let newTask = new Task(`${taskName}`);
    newTask.onDeleteCallback = this._onDelete.bind(this);
    this._tasks.push(newTask);
    this._renderTasks();
  }

  addTaskIntoArray() {
    let createNewTaskButton = document.querySelector('#addNewItemButton');

    createNewTaskButton.addEventListener('click', this._pushItemInArrayAndAddMethod.bind(this));
    //console.log(`1: ${this._tasks}`);
    this._renderTasks();
  }

  render() {
    let element = document.querySelector(`#${this.elId}`);
    element.innerHTML = `<div class="content"><h3>${this.sectionName}</h3>
    <div class="input-wrapper">
    <input type="text" placeholder="new task" id="itemInput" />
    <button id="addNewItemButton" class="addItemButton-class">Add task</button>
    </div>
    <div data-role="tasks"></div></div>
    <div class="footer">
    <div>${this._tasks.length} items left</div>
    <div>All</div>
    <div>active</div>
    <div>complited</div>
    </div>`;

    this._renderTasks();
  }

  _renderTasks() {
    const tasksBlock = document.querySelector('[data-role="tasks"]');
    tasksBlock.innerHTML = ""; // clear from old
    for (let i = 0; i < this._tasks.length; i++) {

      tasksBlock.append(this._tasks[i].render());

    }


  }



  _onDelete(task) {
    // const tasksBlock = document.querySelector('[data-role="tasks"]');
    this._tasks = this._tasks.filter((i) => i !== task);
    console.log('i delete task');
    console.log(this._tasks);
    this._renderTasks();
  }
}
