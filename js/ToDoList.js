//ToDoList constructor
class ToDoList {
  constructor(sectionName, elId) {
    this.sectionName = sectionName;
    this.elId = elId;
    this._tasks = [];
    this.doneTasks = [];
    this.newTasks = [];
    this._dataService = new ToDoListAjaxDataService();

    this.render();
    this.addTaskIntoArray();
    this._onDelete();
    this._onCheck();
  }

  _pushItemInArrayAndAddMethod(e) {
    let taskName = document.querySelector("#itemInput").value;
    let newTask = new Task(`${taskName}`);
    newTask.onDeleteCallback = this._onDelete.bind(this);
    newTask.onDoneCallback = this._onCheck.bind(this);
    this._tasks.push(newTask);
    this._renderTasks(this._tasks);
  }

  addTaskIntoArray() {
    let createNewTaskButton = document.querySelector("#addNewItemButton");
    createNewTaskButton.addEventListener(
      "click",
      this._pushItemInArrayAndAddMethod.bind(this)
    );
    this.sendTaskToDAL();
    this._renderTasks(this._tasks);
  }

  //render basic structure, call rendering tasks & footer
  render() {
    let element = document.querySelector(`#${this.elId}`);
    element.innerHTML = `<div class="content"><h3>${this.sectionName}</h3>
    <div class="input-wrapper">
    <input type="text" placeholder="new task" id="itemInput" />
    <button id="addNewItemButton" class="addItemButton-class">Add task</button>
    </div>
    <div data-role="tasks" id="tasks-container"></div></div>
    <footer></footer>
    </div>`;

    this.init();
    this.renderFooter();

  }

  //get data from ajax response, transform it into new Task & render all tasks
  init() {
    this._dataService.initializeTasks((tasks) => {
      this._tasks = tasks.map((i) => new Task(`${i}`));
      this._tasks.every((i) => i.onDeleteCallback = this._onDelete.bind(this));
      this._tasks.every((i) => i.onDoneCallback = this._onCheck.bind(this));

      this._renderTasks(this._tasks);
    })
  }

  sendTaskToDAL() {
    let createNewTaskButton = document.querySelector("#addNewItemButton");
    createNewTaskButton.addEventListener("click", this.createTask.bind(this));
  }


  //get data for ajax request
  createTask() {
    let newtask = document.querySelector("#itemInput").value;
    var cb = (callback) => {
      callback();
    };
    this._dataService.createTask(newtask, cb);
  }

  _renderTasks(arr) {
    console.log(this._tasks);
    const tasksBlock = document.querySelector('[data-role="tasks"]');
    tasksBlock.innerHTML = ""; // clear from old
    for (let i = 0; i < arr.length; i++) {
      tasksBlock.append(arr[i].render());
    }

    this.renderFooter();
  }

  renderFooter() {
    const footer = document.querySelector("footer");
    footer.innerHTML = `<div>${this._tasks.length -
      this.doneTasks.length} items left</div>
    <div id="allTasks">All</div>
    <div id="activeBtn">active</div>
    <div id="complitedTasksShowButton">complited</div>`;
    this.showComplitedTasks();
    this.showActiveTasks();
    this.showALLTasks();
  }

  _onDelete(task) {
    this._tasks = this._tasks.filter(i => i !== task);
    this._renderTasks(this._tasks);
  }

  //check if there is a task. if it is we check for task.isDone state. on this state depend will it be strike through or not & should we push it into this.doneTasks array
  _onCheck(task) {
    if (task) {
      if (task.isDone === false) {
        task.isDone = true;
        task.el.querySelector('label').classList.toggle("done");
        this.doneTasks.push(task);
      } else {
        task.isDone = false;
        task.el.querySelector('label').classList.toggle("done");
        this.doneTasks = this.doneTasks.filter(i => i !== task);
      }
    }
    this._renderTasks(this._tasks);
  }

  showComplitedTasks() {
    let complitedTasksShowButton = document.querySelector(
      "#complitedTasksShowButton"
    );
    complitedTasksShowButton.addEventListener(
      "click",
      this._getComplitedTasksArray.bind(this)
    );
  }

  _getComplitedTasksArray() {
    this._renderTasks(this.doneTasks);
  }

  showActiveTasks() {
    let activeBtn = document.querySelector("#activeBtn");
    activeBtn.addEventListener("click", () =>
      this._renderTasks(this._tasks.filter(i => i.isDone === false))
    );
  }

  showALLTasks() {
    let allTasksBtn = document.querySelector("#allTasks");
    allTasksBtn.addEventListener("click", () => this._renderTasks(this._tasks));
  }
}
