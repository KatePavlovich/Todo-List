//task class
class Task {
  constructor(name) {
    this.name = name;
    this.isDone = false;
    this.el = null;


  }

  render() {
    if (this.el === null) {
      this.createLi();
    }

       return this.el;     
  }

  createLi() {
    this.el = document.createElement('li');
    this.el.classList.add('item-style');
    this.el.innerHTML = (`<input type="checkbox" ${this.isDone ? "checked" : ""} />${this.name}<span>x</span>`);

    const deleteButton = this.el.querySelector('span');
    deleteButton.addEventListener('click', this._onDelete.bind(this));

    const checkBox = this.el.querySelector('input[type="checkbox"]');
    checkBox.addEventListener('click', this._onIsDone.bind(this));
  }

  _onDelete() {
    if (!!this.onDeleteCallback) {
      this.onDeleteCallback(this);
    }
  }

  _onIsDone() {

    if (!!this.onDoneCallback) {
      this.onDoneCallback(this);
    }

  }
}