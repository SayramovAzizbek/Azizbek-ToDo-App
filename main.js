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
    // toDoFormBox.classList.add("d-block");
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

  //   toDoList.push(todoObject);

  // addList();
  addList(toDoList);
  window.localStorage.setItem("userName", JSON.stringify(toDoList));
  toDoInput.value = "";
});

// ! Adding item code

function addList() {
  todoOrderList.innerHTML = "";
  toDoList.forEach((item) => {
    let todoOrderItem = document.createElement("li");
    todoOrderItem.textContent = item.name;
    todoOrderList.appendChild(todoOrderItem);

    // ! For deleting the item from ToDo App
    toDoDeleteAllBtn.addEventListener("click", (e) => {
      toDoList = [];
      todoOrderList.innerHTML = "";
      todoEmptyTextBox.classList.remove("todo-empty-text-box--off");
      todoTextCounter.classList.remove("d-block");
    });
  });
  // ! For deleting item one by one
  // code ....
}
addList(toDoList);
