// hides & displays tips button
function readTips() {
  var x = document.getElementById("tips");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

//hides create task section on mobile & tablet
function displayNew() {
  var x = document.getElementById("pageOne");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

// On app load, get all tasks from localStorage
window.onload = loadTasks;

// On form submit add task
document.querySelector("form").addEventListener("submit", (e) => {
  //e = event
  e.preventDefault();
  addTask();
});

function loadTasks() {
  // check if localStorage has any tasks
  // if not then return
  if (localStorage.getItem("tasks") == null) return;

  // get the tasks from localStorage and convert it to an array
  let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));

  // loop through the tasks and add them to the list
  tasks.forEach((task) => {
    const list = document.querySelector("ul");
    const li = document.createElement("li");
    li.innerHTML = `<input type="checkbox" onclick="taskComplete(this)" class="check" ${
      task.completed ? "checked" : ""
    }>
          <input type="text" value="${task.task}" class="task ${
      task.completed ? "completed" : ""
    }" onfocus="getCurrentTask(this)" onblur="editTask(this)">
          <i class="fa fa-trash" onclick="removeTask(this)"></i>`;
    list.insertBefore(li, list.children[0]);
  });
}

function addTask() {
  const task = document.querySelector("form input");
  const list = document.querySelector("ul");
  // return if task is empty
  if (task.value === "") {
    //input validation
    alert("🧸🪶: You must enter something!");
    return false;
  }
  // check is task already exist - no duplicates
  if (document.querySelector(`input[value="${task.value}"]`)) {
    alert("🧸🪶: Task already exist!");
    return false;
  }

  // add task to local storage
  localStorage.setItem(
    "tasks",
    JSON.stringify([
      ...JSON.parse(localStorage.getItem("tasks") || "[]"),
      { task: task.value, completed: false },
    ])
  );

  // create list item, add innerHTML and append to ul
  const li = document.createElement("li");
  // checkbox -> task -> trash can
  li.innerHTML = `<input type="checkbox" onclick="taskComplete(this)" class="check">
      <input type="text" value="${task.value}" class="task" onfocus="getCurrentTask(this)" onblur="editTask(this)">
      <i class="fa fa-trash" onclick="removeTask(this)"></i>`;
  // newest task always ends up on top
  list.insertBefore(li, list.children[0]);
  // clear input
  task.value = "";
}

function taskComplete(event) {
  let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));
  tasks.forEach((task) => {
    if (task.task === event.nextElementSibling.value) {
      task.completed = !task.completed;
    }
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
  // adds completed styling
  event.nextElementSibling.classList.toggle("completed");
}

function removeTask(event) {
  let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));
  tasks.forEach((task) => {
    if (task.task === event.parentNode.children[1].value) {
      // delete task
      tasks.splice(tasks.indexOf(task), 1);
    }
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
  // removed from local storage
  event.parentElement.remove();
}

// store current task to track changes
var currentTask = null;

// get current task
function getCurrentTask(event) {
  currentTask = event.value;
}

// edit the task and update local storage
function editTask(event) {
  let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));
  // check if task is empty
  if (event.value === "") {
    alert("🧸🪶: Task is empty!");
    event.value = currentTask;
    return;
  }
  // task already exist
  tasks.forEach((task) => {
    if (task.task === event.value) {
      alert("🧸🪶:Task already exist!");
      event.value = currentTask;
      return;
    }
  });
  // update task
  tasks.forEach((task) => {
    if (task.task === currentTask) {
      task.task = event.value;
    }
  });
  // update local storage
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// previous attempt w/ fs
// import { json } from "body-parser";

// let todos = [];
// element selectors
// let button = document.querySelector("#add");
// let input = document.querySelector("#userinput");
// let ul = document.querySelector("ul");
// let liElements = document.querySelectorAll("li");
// let addItemDiv = document.querySelector(".input-group");
// let body = document.querySelector("body");

// helper functions
// function renderTodos(todos) {
//   ul.innerHTML = "";
// }

// function addToLocalStorage(todos) {
//   localStorage.setItem("todos", JSON.stringify(todos));
//   renderTodos(todos);
// }

// function getFromLocalStorage() {
//   const reference = localStorage.getItem("todos");
//   if (reference) {
//     todos = JSON.parse(reference);
//     renderTodos(todos);
//   }
// }

// function toggleDone(event) {
//   event.srcElement.classList.toggle("done");
// }

// function inputLength() {
//   return input.value.length;
// }

// function deleteListItem(event) {
//   event.srcElement.parentNode.remove();

//   if (ul.children.length === 0) {
//     let clearButton = document.querySelector("#clear");
//     clearButton.remove();
//   }
// }

// function createDivAndButton(li) {
//   let itemDiv = document.createElement("div");
//   itemDiv.classList.add("itemdiv", "width", "margin");

//   let deleteButton = document.createElement("button");
//   deleteButton.innerHTML = "x";
//   deleteButton.classList.add(
//     "btn",
//     "btn-outline-secondary",
//     "bg-light",
//     "deletebutton"
//   );

//   return {
//     itemDiv,
//     deleteButton,
//   };
// }

// function saveItem(event) {
//   let inputValue = event.target.value;
//   if (
//     inputValue.length > 0 &&
//     (event.keyCode === 13 || event.type === "click")
//   ) {
//     let li = document.createElement("li");
//     li.addEventListener("click", toggleDone);
//     li.addEventListener("dblclick", editItem);
//     li.textContent = event.target.value;
//     event.target.parentNode.prepend(li);
//     event.target.remove();
//   } else if (
//     event.target.value.length === 0 &&
//     (event.keyCode === 13 || event.type === "click")
//   ) {
//     let li = document.createElement("li");
//     li.addEventListener("click", toggleDone);
//     li.addEventListener("dblclick", editItem);
//     li.textContent = initialValue;
//     event.target.parentNode.prepend(li);
//     event.target.remove();
//   }
// }

// saves value of item before edit
// let initialValue;

// function editItem(event) {
//   let item = event.target.innerHTML;
//   let itemInput = document.createElement("input");
//   itemInput.type = "text";
//   itemInput.value = item;
//   itemInput.classList.add("edit");
//   initialValue = item;
//   itemInput.addEventListener("keypress", saveItem);
//   itemInput.addEventListener("click", saveItem);
//   event.target.parentNode.prepend(itemInput);
//   event.target.remove();
//   itemInput.select();
// }

// function createListItem() {
//   let li = document.createElement("li");
//   li.addEventListener("click", toggleDone);
//   li.addEventListener("dblclick", editItem);
//   li.textContent = input.value;
//   let { itemDiv, deleteButton } = createDivAndButton();

//   itemDiv.append(li, deleteButton);
//   ul.append(itemDiv);

//   deleteButton.addEventListener(
//     "click",
//     (event) => {
//the difference between a click (complete/incomplete) & edit
//       li.removeEventListener("click", toggleDone);
//       li.removeEventListener("dblclick", editItem);

//       deleteListItem(event);

//       li = null;
//       deleteButton = null;
//       itemDiv = null;
//     },
//     { once: true }
//   );
// }

// function addListItemOnClick() {
//   if (inputLength() > 0 && ul.children.length === 0) {
//     createListItem();
//   } else if (inputLength() > 0) {
//     createListItem();
//   } else {
//     alert("🧸🪶: You must enter something!");
//   }
//   input.value = "";
// }

// let jsonList = [];
// let listItems = document
//   .getElementById("task-list")
//   .getElementsByTagName("li");
//   for (let i in listItems) {
//     let item = {
//       //text field of the list item to be added
//       value: "i.input.value",
//     };
//     jsonList.append(item);
//   }
//   fetch("https://localhost5000/update", {
//     method: "POST",
//     body: JSON.stringify(jsonList),
//   })
//     .then((response) => response.json())
//     .catch((err) => {
//       console.error("error", err);
//     });

// function addListItemOnEnter(event) {
//   event.preventDefault();
//13 is key code for the enter key
// if (inputLength() > 0 && event.keyCode === 13 && ul.children.length === 0) {
//   createListItem();
//   input.value = "";
// } else if (inputLength() > 0 && event.keyCode === 13) {
//   createListItem();
//   input.value = "";
// }

// } //when trying to add alert to this function, it would run after pressing any key so i took it off
// }

// event listeners
// button.addEventListener("click", addListItemOnClick);
// input.addEventListener("keypress", addListItemOnEnter);

//adds a "checked" symbol when clicking on an item
// var list = document.querySelector("ul");
// list.addEventListener(
//   "click",
//   function (nTasks) {
//     if (nTasks.target.tagName === "LI") {
//       nTasks.target.classList.toggle("checked");
//     }
//   },
//   false
// );

// function getList() {
//   fetch("http://localhost:5000", { method: "GET", mode: "no-cors" })
//     .then((response) => {
//       response.json();
//     })
//     .then((data) => {
//       console.log(data);
//     })
//     .catch((err) => {
//       console.error("error", err);
//     });
// }
