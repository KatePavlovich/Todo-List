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
    this.showComplitedTasks();
    //this.showActiveTasks();

  }

  _pushItemInArrayAndAddMethod(e) {
    let taskName = document.querySelector('#itemInput').value;
    let newTask = new Task(`${taskName}`);
    newTask.onDeleteCallback = this._onDelete.bind(this);
    newTask.onDoneCallback = this._onCheck.bind(this);
    this._tasks.push(newTask);
    this._renderTasks(this._tasks);
  }

  addTaskIntoArray() {
    let createNewTaskButton = document.querySelector('#addNewItemButton');
    createNewTaskButton.addEventListener('click', this._pushItemInArrayAndAddMethod.bind(this));
    this._renderTasks(this._tasks);
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

    this._renderTasks(this._tasks);
    this.renderFooter();
  }

  _renderTasks(arr) {
    const tasksBlock = document.querySelector('[data-role="tasks"]');
    tasksBlock.innerHTML = ""; // clear from old
    for (let i = 0; i < arr.length; i++) {
      tasksBlock.append(arr[i].render());
    }

    this.renderFooter();
  }

  renderFooter() {
    const footer = document.querySelector('footer');
    footer.innerHTML = `<div>${this._tasks.length - this.doneTasks.length} items left</div>
    <div>All</div>
    <div id="activeBtn">active</div>
    <button id="complitedTasksShowButton">complited</button>`
  }


  _onDelete(task) {
    this._tasks = this._tasks.filter((i) => i !== task);
    this._renderTasks(this._tasks);
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
    this._renderTasks(this._tasks);
  }

  showComplitedTasks() {
    let complitedTasksShowButton = document.querySelector('#complitedTasksShowButton');
    complitedTasksShowButton.addEventListener('click', this._getComplitedTasksArray.bind(this));
  }

  _getComplitedTasksArray() {
    this._renderTasks(this.doneTasks);
  }

  /*   showActiveTasks() {
      let activeBtn = document.querySelector('#activeBtn');
      console.log(this.doneTasks);
      activeBtn.addEventListener('click',  console.log('жлтадоофыв'));
      //this._renderTasks(this.doneTasks);
    } */


}
