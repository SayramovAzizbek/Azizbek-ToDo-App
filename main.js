const siteBody = document.querySelector(".site-body");

const nameBox = document.querySelector(".name-box");
const nameForm = document.querySelector(".name-form");
const nameInput = document.querySelector(".name-input");
const nameBtn = document.querySelector(".name-btn");
const nameRestultText = document.querySelector(".name-result-text");
const nameErrorText = document.querySelector(".name-error");

const todoSearchBox = document.querySelector(".todo-search-box");
const todoSearchForm = document.querySelector(".todo-search-form");
const todoSearchInput = document.querySelector(".todo-serach-input");

const counterMainBox = document.querySelector(".counter-main-box");
const counterAllItems = document.querySelector(".counter-all");
const counterCompletedItems = document.querySelector(".counter-complete");
const counterUnCompletedItems = document.querySelector(".counter-uncomplete");

const toDoFormBox = document.querySelector(".form-box");
const toDoForm = document.querySelector(".main-form");
const toDoInput = document.querySelector(".todo-input");
const toDoBtn = document.querySelector(".todo-btn");
const toDoDeleteAllBtn = document.querySelector(".todo-delete-all-btn");
const todoOrderList = document.querySelector(".todo-order-list");
const todoErrorBox = document.querySelector(".error-box");
const todoEmptyTextBox = document.querySelector(".todo-empty-text-box");
const todoTextCounter = document.querySelector(".todo-item-counter");
const todoTextResult = document.querySelector(".todo-item-result");

const deleteAllModalBox = document.querySelector(".delet-all-main-modal");
const deleteModalSureBtn = document.querySelector(".delete-modal-sure");
const deleteModalUnSureBtn = document.querySelector(".delete-modal-unsure");

let deleteItem;

let todoDeleteList = document.querySelector(".deleted-list");

// ! Name form code
nameForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  let nameInputValue = nameInput.value.trim();
  if (nameInputValue !== "") {
    nameRestultText.textContent = `${nameInputValue}'s ToDo List`;
    toDoFormBox.classList.remove("d-none");
    todoSearchBox.classList.remove("d-none");
    counterMainBox.classList.remove("d-none");
    nameBox.classList.add("d-none");
    nameErrorText.classList.add("opacity-100");
  } else {
    nameErrorText.classList.add("opacity-100");
  }
});

// ! ToDo App Main code

// ! First Array's length checking
let toDoList = JSON.parse(window.localStorage.getItem("userName")) || [];

if (toDoList.length > 0) {
  todoEmptyTextBox.classList.add("todo-empty-text-box--off");
  todoTextCounter.classList.add("d-block");
  if (toDoList.length == 1) {
    todoTextCounter.textContent = `You have ${toDoList.length} plan ToDo`;
  } else {
    todoTextCounter.textContent = `You have ${toDoList.length} plans ToDo`;
  }
}

// ! Main ToDo's submit event
toDoForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  toDoInputValue = toDoInput.value.trim();
  const todoObject = {
    id: toDoList.length > 0 ? toDoList[toDoList.length - 1].id + 1 : 1,
    name: toDoInputValue,
    isComplete: false,
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
    todoErrorBox.classList.add("error-box-on");
  }

  window.localStorage.setItem("userName", JSON.stringify(toDoList));
  toDoInput.value = "";
  addList(toDoList, todoOrderList, "");
  counterItems();
});

// ! Searching items
todoSearchForm.addEventListener("keyup", function (evt) {
  evt.preventDefault();
  let itemSearchInput = todoSearchInput.value.toLowerCase();
  let searchItem = toDoList.filter((item) => {
    return item.name.toLowerCase().includes(itemSearchInput);
  });
  addList(searchItem, todoOrderList, "");
});

// ! Adding item code
function addList(toDoList, todoOrderList, itemBtnText) {
  todoOrderList.innerHTML = "";
  toDoList.forEach((item) => {
    let todoOrderItem = document.createElement("li");
    todoOrderItem.classList.add("todo-order-item");
    todoOrderItem.dataset.id = item.id;

    // ? Item check and text box
    let itemCheckAndTextBox = document.createElement("div");
    itemCheckAndTextBox.classList.add("item-check-and-text-box");

    // ? Item checking input
    let itemLabel = document.createElement("label");
    itemLabel.classList.add("item-check-label");

    let itemcheckInput = document.createElement("input");
    itemcheckInput.classList.add("item-check-input", "visually-hidden");
    itemcheckInput.dataset.id = item.id;
    itemcheckInput.type = "checkbox";

    let itemInputSpan = document.createElement("span");
    itemInputSpan.classList.add("item-input-span");
    itemInputSpan.textContent = "";

    // ? Item text
    let todoItemText = document.createElement("p");
    todoItemText.classList.add("todo-item-text");
    todoItemText.textContent = item.name;

    // ? Item Btn box
    let todoItemBtnBox = document.createElement("div");
    todoItemBtnBox.classList.add("todo-item-btn-box");

    // ? Item edit btn
    let editBtn = document.createElement("button");
    editBtn.classList.add("todo-edit-btn");
    editBtn.textContent = "";
    editBtn.dataset.id = item.id;

    // ? Item delete btn
    let deleteItemBtn = document.createElement("button");
    deleteItemBtn.classList.add("todo-deleteItem-btn");
    if (itemBtnText == "Cancel") {
      deleteItemBtn.classList.add("cancel-btn");
    }
    deleteItemBtn.setAttribute("type", "button");
    deleteItemBtn.textContent = itemBtnText;
    deleteItemBtn.dataset.id = item.id;

    if (item.isComplete) {
      itemcheckInput.checked = true;
      todoItemText.style.textDecoration = "line-through";
    }

    itemLabel.appendChild(itemcheckInput);
    itemLabel.appendChild(itemInputSpan);
    itemCheckAndTextBox.appendChild(itemLabel);
    itemCheckAndTextBox.appendChild(todoItemText);
    todoItemBtnBox.appendChild(editBtn);
    todoItemBtnBox.appendChild(deleteItemBtn);
    todoOrderItem.appendChild(itemCheckAndTextBox);
    todoOrderItem.appendChild(todoItemBtnBox);
    todoOrderList.appendChild(todoOrderItem);
  });
}
addList(toDoList, todoOrderList, "");

// ! Show modal for deleting all items
toDoDeleteAllBtn.addEventListener("click", () => {
  if (toDoList.length > 0) {
    siteBody.classList.add("site-body--on");
    deleteAllModalBox.classList.add("delet-all-main-modal--on");
  }
});

// ! Show Delete All Modal
deleteModalSureBtn.addEventListener("click", () => {
  toDoList = [];
  todoOrderList.innerHTML = "";
  todoEmptyTextBox.classList.remove("todo-empty-text-box--off");
  todoTextCounter.classList.remove("d-block");
  siteBody.classList.remove("site-body--on");
  deleteAllModalBox.classList.remove("delet-all-main-modal--on");
  localStorage.clear();
  counterItems();
});

deleteModalUnSureBtn.addEventListener("click", () => {
  siteBody.classList.remove("site-body--on");
  deleteAllModalBox.classList.remove("delet-all-main-modal--on");
});

// ? Deleting, Checking and Rechanging one by one
todoOrderList.addEventListener("click", function (evt) {
  // ! Delete one by one
  if (evt.target.matches(".todo-deleteItem-btn")) {
    let btnId = Number(evt.target.dataset.id);
    let itemId = toDoList.findIndex((item) => item.id == btnId);
    deleteItem = toDoList.filter((item) => item.id == btnId);

    setTimeout(function () {
      addList(deleteItem, todoDeleteList, "Cancel");
      setTimeout(function () {
        todoDeleteList.innerHTML = "";
      }, 5000);
    }, 0);

    addList(deleteItem, todoDeleteList, "Cancel");
    toDoList.splice(itemId, 1);
    window.localStorage.setItem("userName", JSON.stringify(toDoList));
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
    addList(toDoList, todoOrderList, "");
    counterItems();
  }

  // ! Tick one by one
  if (evt.target.matches(".item-check-input")) {
    let checkInputId = Number(evt.target.dataset.id);
    let itemIsComplete = toDoList.find((item) => item.id === checkInputId);
    itemIsComplete.isComplete = !itemIsComplete.isComplete;
    window.localStorage.setItem("userName", JSON.stringify(toDoList));
    addList(toDoList, todoOrderList, "");
    counterItems();
  }

  // ! Rechange item's text
  if (evt.target.matches(".todo-edit-btn")) {
    let todoItemText = evt.target.parentElement.parentElement.firstChild.textContent;
    let todoPrompt = prompt("Enter your rechange plan", todoItemText);
    let itemEditBtnId = Number(evt.target.dataset.id);
    let itemFind = toDoList.find((item) => item.id === itemEditBtnId);
    if (todoPrompt !== "") {
      itemFind.name = todoPrompt;
      window.localStorage.setItem("userName", JSON.stringify(toDoList));
      addList(toDoList, todoOrderList, "");
      counterItems();
    }
  }
});

// ! Counter completed, uncompleted and all
function counterItems() {
  counterAllItems.textContent = `All plan`;

  let completeItems = toDoList.filter((item) => item.isComplete === true);
  counterCompletedItems.textContent = `${completeItems.length} plan have done`;

  let unCompleteItems = toDoList.filter((item) => item.isComplete === false);
  counterUnCompletedItems.textContent = `${unCompleteItems.length} plan haven't done yet`;

  if (toDoList.length <= 1) {
    counterAllItems.textContent = `All plan `;
  } else {
    counterAllItems.textContent = `All plans`;
  }

  if (completeItems.length <= 1) {
    counterCompletedItems.textContent = `${completeItems.length} plan has done`;
  } else {
    counterCompletedItems.textContent = `${completeItems.length} plans have done`;
  }

  if (unCompleteItems.length <= 1) {
    counterUnCompletedItems.textContent = `${unCompleteItems.length} plan has't done yet`;
  } else {
    counterUnCompletedItems.textContent = `${unCompleteItems.length} plans haven't done yet`;
  }

  counterAllItems.addEventListener("click", () => {
    addList(toDoList, todoOrderList, "");
  });

  counterCompletedItems.addEventListener("click", () => {
    addList(completeItems, todoOrderList, "");
  });

  counterUnCompletedItems.addEventListener("click", () => {
    addList(unCompleteItems, todoOrderList, "");
  });
}

counterItems();

// ! Reset deleted items
todoDeleteList.addEventListener("click", function (evt) {
  if (evt.target.matches(".todo-deleteItem-btn")) {
    let resetItemId = evt.target.dataset.id;
    let resetItem = deleteItem.find((item) => item.id == resetItemId);
    toDoList.push(resetItem);
    if (toDoList.length > 0) {
      todoEmptyTextBox.classList.add("todo-empty-text-box--off");
      todoTextCounter.classList.remove("d-none");
      if (toDoList.length == 1) {
        todoTextCounter.textContent = `You have ${toDoList.length} plan ToDo`;
      } else {
        todoTextCounter.textContent = `You have ${toDoList.length} plans ToDo`;
      }
    }
    todoDeleteList.innerHTML = "";
    addList(toDoList, todoOrderList, "");
  }
});
