//ToDoList constructor
class ToDoList {
  constructor(sectionName, elId) {
    this.sectionName = sectionName;
    this.elId = elId;
    this._tasks = [];
    this.doneTasks = [];


    this.render();
    this.addTaskIntoArray();
    this._onDelete();
    this._onCheck();

  }

  _pushItemInArrayAndAddMethod(e) {

    let taskName = document.querySelector('#itemInput').value;
    let newTask = new Task(`${taskName}`);
    newTask.onDeleteCallback = this._onDelete.bind(this);
    newTask.onDoneCallback = this._onCheck.bind(this);
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
    <footer></footer>

    </div>`;

    this._renderTasks();
    this.renderFooter();
  }

  _renderTasks() {
    const tasksBlock = document.querySelector('[data-role="tasks"]');
    tasksBlock.innerHTML = ""; // clear from old
    for (let i = 0; i < this._tasks.length; i++) {

      tasksBlock.append(this._tasks[i].render());

    }
    this.renderFooter();

  }

  renderFooter() {
    console.log(this._tasks.length, this.doneTasks.length);
    const footer = document.querySelector('footer');
    footer.innerHTML = `<div>${this._tasks.length - this.doneTasks.length} items left</div>
    <div>All</div>
    <div>active</div>
    <div>complited</div>`
  }


  _onDelete(task) {
    console.log(task);
    this._tasks = this._tasks.filter((i) => i !== task);
    //console.log('i delete task');
    console.log(this._tasks);
    this._renderTasks();
  }

  _onCheck(task) {

    if (task) {
      if (task.isDone === false) {
      task.isDone = true;
      task.el.classList.toggle('done');
      this.doneTasks.push(task);
    } else {
      task.isDone = false;
      task.el.classList.toggle('done');
      this.doneTasks = this.doneTasks.filter((i) => i !== task);
    }
  }
    console.log(this.doneTasks);
    this._renderTasks();
  }
}
