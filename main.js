let toDoFormBox = document.querySelector(".form-box");
let toDoForm = document.querySelector(".main-form");
let toDoInput = document.querySelector(".todo-input");
let toDoBtn = document.querySelector(".todo-btn");
let toDoDeleteAllBtn = document.querySelector(".todo-delete-all-btn");
let todoOrderList = document.querySelector(".todo-order-list");
let todoErrorBox = document.querySelector(".error-box");
let todoEmptyTextBox = document.querySelector(".todo-empty-text-box");

/* Name form code */
let nameBox = document.querySelector(".name-box");
let nameForm = document.querySelector(".name-form");
let nameInput = document.querySelector(".name-input");
let nameBtn = document.querySelector(".name-btn");
let nameRestultText = document.querySelector(".name-result-text");
let nameErrorText = document.querySelector(".name-error");

toDoFormBox.classList.add("d-none");

nameForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  let nameInputValue = nameInput.value;
  if (nameInputValue !== "") {
    nameRestultText.textContent = `${nameInputValue}'s ToDo List`;
    toDoFormBox.classList.remove("d-none");
    toDoFormBox.classList.add("d-block");
    nameBox.classList.add("d-none");
    nameErrorText.classList.add("opacity-100");
  } else {
    nameErrorText.classList.add("opacity-100");
  }
});

/* ToDo App Main code */
let toDoList = [];

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
  } else {
    toDoList.push();
    todoErrorBox.classList.add("error-box-on");
  }

  //   toDoList.push(todoObject);

  addList();
  toDoInput.value = "";
});

function addList() {
  todoOrderList.innerHTML = "";
  toDoList.forEach((item) => {
    let todoOrderItem = document.createElement("li");
    todoOrderItem.textContent = item.name;

    // ! For deleting item one by one
    // todoOrderItem.addEventListener("click", (evt) => {
    //   evt.preventDefault();
    //   todoOrderItem.setAttribute(
    //     "title",
    //     "If you finished this work, you can delete it by pressing the items"
    //   );
    todoOrderList.appendChild(todoOrderItem);

    // todoOrderItem.classList.add("text-decoration-line-through");
    // todoOrderItem.classList.add("d-none");

    // ! For deleting the item from ToDo App
    // let mySpan = document.createElement("span");
    // mySpan.innerHTML = "x";
    // todoOrderItem.appendChild(mySpan);

    // const close = document.querySelector("span");
    // for (let i = 0; i < close.length; i++) {
    //   close[i].addEventListener("click", () => {
    //     close[i].parentElement.style.opacity = 0;
    //     setTimeout(() => {
    //       close[i].parentElement.style.display = "none";
    //     }, 500);
    //   });
    // }
    // });
    toDoDeleteAllBtn.addEventListener("click", () => {
      todoOrderList.removechild(todoOrderItem);
    });
  });
}

// nechta item qo'shilganini sanab turish, delete function qo'shish, deleteAll ni qilish,