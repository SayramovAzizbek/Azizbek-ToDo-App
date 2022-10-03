let toDoFormBox = document.querySelector(".form-box");
let toDoForm = document.querySelector(".main-form");
let toDoInput = document.querySelector(".todo-input");
let toDoBtn = document.querySelector(".todo-btn");
let toDoDeleteAllBtn = document.querySelector(".todo-delete-all-btn");
let todoOrderList = document.querySelector(".todo-order-list");
let todoErrorBox = document.querySelector(".error-box");
let todoEmptyTextBox = document.querySelector(".todo-empty-text-box");
let todoTextCounter = document.querySelector(".todo-item-counter");

let nameBox = document.querySelector(".name-box");
let nameForm = document.querySelector(".name-form");
let nameInput = document.querySelector(".name-input");
let nameBtn = document.querySelector(".name-btn");
let nameRestultText = document.querySelector(".name-result-text");
let nameErrorText = document.querySelector(".name-error");

// ! Name form code
toDoFormBox.classList.add("d-none");

nameForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  let nameInputValue = nameInput.value;
  if (nameInputValue !== "") {
    nameRestultText.textContent = `${nameInputValue}'s ToDo List`;
    toDoFormBox.classList.remove("d-none");
    nameBox.classList.add("d-none");
    nameErrorText.classList.add("opacity-100");
  } else {
    nameErrorText.classList.add("opacity-100");
  }
});

// ! ToDo App Main code

// let toDoList = [];
let toDoList = JSON.parse(window.localStorage.getItem("userName")) || [];

toDoForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  toDoInputValue = toDoInput.value;
  const todoObject = {
    id: toDoList.length,
    name: toDoInputValue,
  };

  if (toDoInputValue !== "") {
    toDoList.push(todoObject);
    todoErrorBox.classList.remove("error-box-on");
    todoTextCounter.classList.remove("d-none");
    todoEmptyTextBox.classList.add("todo-empty-text-box--off");
    todoTextCounter.classList.add("d-block");
    if (toDoList.length == 1) {
      todoTextCounter.textContent = `You have ${toDoList.length} plan ToDo`;
    } else {
      todoTextCounter.textContent = `You have ${toDoList.length} plans ToDo`;
    }
  } else {
    toDoList.push();
    todoErrorBox.classList.add("error-box-on");
  }

  addList(toDoList);
  window.localStorage.setItem("userName", JSON.stringify(toDoList));
  toDoInput.value = "";
});

// ! Adding item code
function addList() {
  todoOrderList.innerHTML = "";
  toDoList.forEach((item) => {
    let todoOrderItem = document.createElement("li");
    todoOrderItem.classList.add("todo-order-item");
    todoOrderItem.textContent = item.name;
    todoOrderItem.dataset.id = item.id;
    todoOrderList.appendChild(todoOrderItem);

    let deleteItemBtn = document.createElement("button");
    deleteItemBtn.classList.add("todo-deleteItem-btn");
    deleteItemBtn.setAttribute("type", "button");
    deleteItemBtn.textContent = "";
    deleteItemBtn.dataset.id = item.id;
    todoOrderItem.appendChild(deleteItemBtn);

    // ! Tick one by one for test code
    // let tickItem = document.createElement("button");
    // tickItem.classList.add("todo-tickItem-btn");
    // tickItem.setAttribute("type", "button");
    // tickItem.textContent = "";
    // tickItem.dataset.id = item.id;
    // todoOrderItem.appendChild(tickItem);

    // tickItem.addEventListener("click", () => {
    //   toDoInput.value = todoOrderItem.innertext;
    //   const parent = tickItem.parentElement;
    //   parent.parentElement.removeChild(parent);
    // });

    // todoOrderItem.addEventListener("dblclick", () => {
    //   todoOrderItem.classList.toggle("text-decoration-line-through");
    //   todoOrderItem.setAttribute("disabled", "disabled");
    // });

    // todoOrderItem.forEach((e) => {
    // let listText = e.querySelector(".todo-tickItem-btn");
    // let btnDone = document.createElement("button");
    // e.appendChild(btnDone);
    // btnDone.innerHTML = "<i class='fas fa-check'></i>";
    // btnDone.addEventListener("click", () => {
    //   done();
    // });
    // function done() {
    //   listText.classList.toggle("text-decoration-line-through");
    //   btnDone.classList.toggle("text-decoration-line-through");
    // }
    // });

    // todoOrderList.addEventListener("click", function (evt) {
    //   if (evt.target.matches(".todo-order-item")) {
    //     let itemId = Number(evt.target.dataset.id);
    //     let listId = toDoList.findIndex((item) => item.id === itemId);
    //     toDoList.splice(listId, 1);
    //     itemId.classList.add("text-decoration-line-through");
    //     addList(toDoList);
    //   }
    // });

    if (todoOrderItem.textContent == item.name) {
      todoTextCounter.classList.add("d-block");
      if (toDoList.length == 1) {
        todoTextCounter.textContent = `You have ${toDoList.length} plan ToDo`;
      } else {
        todoTextCounter.textContent = `You have ${toDoList.length} plans ToDo`;
      }
      todoEmptyTextBox.classList.add("todo-empty-text-box--off");
    }

    // ! For deleting all items from ToDo App
    toDoDeleteAllBtn.addEventListener("click", (e) => {
      toDoList = [];
      todoOrderList.innerHTML = "";
      todoEmptyTextBox.classList.remove("todo-empty-text-box--off");
      todoTextCounter.classList.remove("d-block");
      localStorage.clear();
    });
  });
}
addList(toDoList);

// ! Delete one by one
todoOrderList.addEventListener("click", function (evt) {
  if (evt.target.matches(".todo-deleteItem-btn")) {
    let btnId = Number(evt.target.dataset.id);
    let itemId = toDoList.findIndex((item) => item.id === btnId);
    toDoList.splice(itemId, 1);
    addList(toDoList);
    todoTextCounter.textContent = `You have ${toDoList.length} plan ToDo`;
    if (toDoList.length == 1) {
      todoTextCounter.textContent = `You have ${toDoList.length} plan ToDo`;
    } else {
      todoTextCounter.textContent = `You have ${toDoList.length} plans ToDo`;
    }
    if (toDoList.length == 0) {
      todoTextCounter.textContent = ``;
      todoEmptyTextBox.classList.remove("todo-empty-text-box--off");
      todoTextCounter.classList.add("d-none");
      localStorage.clear();
    }
  }
});
