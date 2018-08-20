//ToDoList constructor
class ToDoList {
  constructor(sectionName, elId) {
    this.sectionName = sectionName;
    this.elId = elId;
    this._tasks = [new Task("JS"), new Task("CSS")];
    this.render();
    this.onDelete();

  }

  render() {
    let element = document.querySelector(`#${this.elId}`);
    element.innerHTML = `<h3>${this.sectionName}</h3>
    <div class="input-wrapper">
    <input type="text" placeholder="new task" id="itemInput" />
    <button id="addNewItemButton" class="addItemButton-class">Add task</button>
    </div>
    <div data-role="tasks"></div>`;

    this._renderTasks();
  }

  _renderTasks() {
    const tasksBlock = document.querySelector('[data-role="tasks"]');
    tasksBlock.innerHTML = ""; // clear from old
    for (let i = 0; i < this._tasks.length; i++) {
      
      tasksBlock.append(this._tasks[i].render());

    }


  }

  _onTaskDeleted(task) {
    task.onDeleteCallback = this._onTaskDeleted.bind(this); 

  }

  onDelete() {
    const tasksBlock = document.querySelector('[data-role="tasks"]');
    return tasksBlock.filter((i) => i !== task);
     this._renderTasks();
  }
}
