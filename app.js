//hides create task section on mobile & tablet
function displayNew() {
  var x = document.getElementById("pageOne");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

//getElementsByTagName grabs all elements with li tag
var myList = document.getElementsByTagName("LI");
var i;
for (i = 0; i < myList.length; i++) {
  var span = document.createElement("SPAN");
  //   creates x option next to all list items
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  myList[i].appendChild(span);
  //creates edit button next to all list items
  var editBtn = document.createElement("button");
  editBtn.innerText = "Edit";
  editBtn.className = "edit";
  myList[i].appendChild(editBtn);
}

// click on a close button to hide that list item
var close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++) {
  close[i].onclick = function () {
    var div = this.parentElement;
    div.style.display = "none";
  };
}

// var edit = document.getElementsByClassName("edit");
// var li = document.querySelector("li");

// var editOption = edit.addEventListener("click", function () {
//   li.contentEditable = true;
// });

//edit function
var editTasks = function () {
  console.log("Edit Task...");
  console.log("Change 'edit' to 'save'");

  var li = this.parentNode;
  var editInput = li.querySelector("li");
  var label = li.querySelector("label");
  containsClass = li.classList.contains("editMode");

  if (containsClass) {
    label.innerText = editInput.value;
  } else {
    editInput.value = label.innerText;
  }
  li.classList.toggle("editMode");
};

//adds a "checked" symbol when clicking on an item
var list = document.querySelector("ul");
list.addEventListener(
  "click",
  function (nTasks) {
    if (nTasks.target.tagName === "LI") {
      nTasks.target.classList.toggle("checked");
    }
  },
  false
);

// Create a new list item when clicking on the "Submit" button
function createTask() {
  var li = document.createElement("li");
  li.setAttribute("readonly", "readonly");
  var inputValue = document.getElementById("newTasks").value;
  var t = document.createTextNode(inputValue);
  li.appendChild(t);
  if (inputValue === "") {
    alert("You must write something!");
  } else {
    document.getElementById("tasks").appendChild(li);
  }
  document.getElementById("taskForm").value = "";

  //   adds x option to all new tasks
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";

  span.appendChild(txt);
  li.appendChild(span);

  for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
      var div = this.parentElement;
      div.style.display = "none";
    };
  }
}
