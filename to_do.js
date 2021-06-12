const todoForm = document.querySelector(".js-toDoForm"),
todoInput = todoForm.querySelector("input"),
todoList = document.querySelector(".js-toDoList"),
finish_List = document.querySelector(".finished-list");

const TODO_LS = "PENDING";
const FINISHED_LS = "FINISHED"; 
let toDos = [];
let finishToDos = [];

function paintToDo(text) {
  const newId = toDos.length + 1;
  const li = document.createElement("li");
  const finishBtn = document.createElement("button");
  const delBtn = document.createElement("button");
  finishBtn.innerText = "✅";
  delBtn.innerText = "❌";
  const span = document.createElement("span");
  span.innerText = ` ${text}`;
  li.appendChild(finishBtn);
  li.appendChild(delBtn);
  li.appendChild(span);
  li.id = newId;
  todoList.appendChild(li);
  finishBtn.addEventListener("click", finishBtnEvent);
  delBtn.addEventListener("click", deleteTask);
  const toDoObj = {
    text: text,
    id: newId
  };
  toDos.push(toDoObj);
  saveToDos(TODO_LS);
}

function finishBtnEvent(event) {
  const clicked = event.target;
  const selectedli = clicked.parentNode;
  const bringText = selectedli.firstChild.innerText;
  todoList.removeChild(selectedli);
  const cleanTask = toDos.filter(function (task) {
    return task.id !== parseInt(selectedli.id);
  });
  toDos = cleanTask;
  const newId = finishToDos.length + 1;
  const finishObj = {
    text: selectedli.lastChild.innerText,
    id: newId
  };
  paintFinish(finishObj.text);
  saveToDos(TODO_LS);
}

function paintFinish(text) {
  const newId = finishToDos.length + 1;
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const rewindBtn = document.createElement("button");
  delBtn.innerText = "❌";
  rewindBtn.innerText = "⏪";
  delBtn.addEventListener("click", deleteFinish);
  rewindBtn.addEventListener("click", rewindTo_ToDo);
  const span = document.createElement("span");
  span.innerText = ` ${text}`;
  li.appendChild(delBtn);
  li.appendChild(rewindBtn);
  li.appendChild(span);
  li.id = newId;
  finish_List.appendChild(li);
  const finishObj = {
    text: text,
    id: newId
  };
  finishToDos.push(finishObj);
  saveToDos(FINISHED_LS);
}

function rewindTo_ToDo(event) {
  const clicked = event.target;
  const selectedli = clicked.parentNode;
  finish_List.removeChild(selectedli);
  const cleanTask = finishToDos.filter(function (task) {
    return task.id !== parseInt(selectedli.id);
  });
  finishToDos = cleanTask;
  const newId = finishToDos.length + 1;
  const finishObj = {
    text: selectedli.lastChild.innerText,
    id: newId
  };
  paintToDo(finishObj.text);
  saveToDos(FINISHED_LS);
}

function deleteTask(event) {
  const clicked = event.target;
  const selectedli = clicked.parentNode;
  todoList.removeChild(selectedli);
  const cleanTask = toDos.filter(function (task) {
    return task.id !== parseInt(selectedli.id);
  });
  toDos = cleanTask;
  saveToDos(TODO_LS);
}

function deleteFinish(event) {
  const clicked = event.target;
  const selectedli = clicked.parentNode;
  finish_List.removeChild(selectedli);
  const cleanTask = finishToDos.filter(function (task) {
    return task.id !== parseInt(selectedli.id);
  });
  finishToDos = cleanTask;
  saveToDos(FINISHED_LS);
}

function saveToDos(task) {
  if (task === TODO_LS) localStorage.setItem(task, JSON.stringify(toDos));
  else localStorage.setItem(task, JSON.stringify(finishToDos));
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = todoInput.value;
  paintToDo(currentValue);
  todoInput.value = "";
}

function loadToDos() {
  const loadedToDos = localStorage.getItem(TODO_LS);
  if (loadedToDos !== null) {
    const parsedToDo = JSON.parse(loadedToDos);
    parsedToDo.forEach(function (toDo) {
      paintToDo(toDo.text);
    });
  }
}

function loadFinish() {
  const loadedFinshToDos = localStorage.getItem(FINISHED_LS);
  if (loadedFinshToDos !== null) {
    const parsedToDo = JSON.parse(loadedFinshToDos);
    parsedToDo.forEach(function (toDo) {
      paintFinish(toDo.text);
    });
  }
}

function init() {
  loadToDos();
  loadFinish();
  todoForm.addEventListener("submit", handleSubmit);
}

init();