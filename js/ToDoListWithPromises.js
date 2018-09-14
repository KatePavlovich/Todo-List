//ToDoList constructor
class ToDoList {
  constructor(sectionName, elId) {
    this.sectionName = sectionName;
    this.elId = elId;
    this._tasks = [];
    this.doneTasks = [];
    this._dataService = new ToDoListAjaxDataService();

    this.render();
    this.sendTaskToDAL();
    this._onDelete();
    this._onCheck();
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
  }

  //get data from ajax response, transform it into new Task & render all tasks
  init() {
    this._dataService.initializeTasks()
    .then(this.prepareTasks.bind(this))
    .then(this._renderTasks.bind(this))
  }

  prepareTasks(tasks) {
      this._tasks = tasks.map((i) => new Task(i.title, i.id, i.done));
      this._tasks.forEach((i) => i.onDeleteCallback = this._onDelete.bind(this));
      this._tasks.forEach((i) => i.onDoneCallback = this._onCheck.bind(this));
      return this._tasks;
  }

  sendTaskToDAL() {
    let createNewTaskButton = document.querySelector("#addNewItemButton");
    createNewTaskButton.addEventListener("click", this.createTask.bind(this));
  }

  //get data for ajax request
  createTask() {
    let newtask = document.querySelector("#itemInput").value;
    this._dataService.createTask(newtask)
    .then(this._tasksReceived.bind(this))
  }

  _tasksReceived() {
    this.init();
  }

  _renderTasks(arr) {
    const tasksBlock = document.querySelector('[data-role="tasks"]');
    tasksBlock.innerHTML = ""; // clear from old
    for (let i = 0; i < arr.length; i++) {
      tasksBlock.append(arr[i].render());
    }

    this.renderFooter();
  }

  //deleting tasks
  _onDelete(task) {
    if (task) {
      this._dataService.deleteTask(task.id, this._tasksReceived.bind(this));

      this._tasks = this._tasks.filter(i => i !== task);
      this._renderTasks(this._tasks);
    }
  }

  //check if there is a task. if it is we check for task.isDone state. on this state depend will it be strike through or not & should we push it into this.doneTasks array
  _onCheck(task) {
    if (task) {
      if (!task.isDone) {
        task.isDone = true;
        task.el.querySelector('label').classList.add("done");
      } else {
        task.isDone = false;
        task.el.querySelector('label').classList.remove("done");
      }
      this._dataService.updateTask(task.id, task.name, task.isDone, this._tasksReceived.bind(this));
    }
    this._renderTasks(this._tasks);
  }

  //footer bar for showing all, complited or active tasks
  renderFooter() {
    const footer = document.querySelector("footer");
    let activeItems = this._tasks.filter(i => i.isDone === false);
    footer.innerHTML = `<div>${activeItems.length} items left</div>
    <div id="allTasks">All</div>
    <div id="activeBtn">active</div>
    <div id="complitedTasksShowButton">complited</div>`;
    this.bindEventListenerOnComplitedTasks();
    this.showActiveTasks();
    this.showALLTasks();
  }

  bindEventListenerOnComplitedTasks() {
    let complitedTasksShowButton = document.querySelector("#complitedTasksShowButton");
    complitedTasksShowButton.addEventListener("click", this._getComplitedTasksArray.bind(this));
  }

  _getComplitedTasksArray() {
    this.doneTasks = this._tasks.filter(i => i.isDone === true);
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