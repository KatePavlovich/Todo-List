//task class
class Task {
  constructor(name) {
    this.name = name;
    this.isDone = false;
    this.onDeleteCallback = null;
  }

  render() {
    let li = document.createElement('li');
    li.classList.add('item-style');
    li.innerHTML = (`<input type="checkbox" ${this.isDone ? "checked" : ""} />${this.name}<span>x</span>`);

    const deleteButton = li.querySelector('span');
    deleteButton.addEventListener('click', this._onDelete.bind(this));
    return li;
  }

  _onDelete() {
    if (!!this.onDeleteCallback) {
      this.onDeleteCallback(this);
    }
  }
}