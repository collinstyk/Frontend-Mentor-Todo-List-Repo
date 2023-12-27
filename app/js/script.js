"use strict";

const mainBackground = document.querySelector("html");
const header = document.querySelector("header");
const main = document.querySelector("main");
const containerTask = document.querySelector(".task--container");
const taskList = document.querySelector(".task--list");
const toggleIcon = document.querySelector(".icon--toggle");
const inputTask = document.querySelector(".add--task");
const taskes = document.querySelectorAll(".task--item");
const taskBottom = document.querySelector(".task--bottom");
const taskGroups = document.querySelector(".task--groups");
const taskGroup = document.querySelectorAll(".task--group");
const taskesCompleted = document.querySelector("#completed--task");
const taskesActive = document.querySelector("#active--task");
const taskesAll = document.querySelector("#all--taskes");
const radioButtonsOriginal = document.querySelectorAll(".radio--button");
const undoneTaskes = document.querySelector(".number--items__left");
const typeInTask = document.querySelector(".task--input");

let taskesList = [...taskes];
const radioButtons = [...radioButtonsOriginal];

let completedTaskes = [];
let numItemsLeft = taskesList.length;
updateItemsLeft();

function updateItemsLeft() {
  undoneTaskes.textContent = numItemsLeft;
}

// Implementing the functionality of Adding Taskes
main.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    e.preventDefault();
    const shade = containerTask.classList.contains("background__dark")
      ? "dark"
      : "light";

    const newImg = document.createElement("img");
    const newImg2 = document.createElement("img");
    const span1 = document.createElement("span");
    const span2 = document.createElement("span");
    const span3 = document.createElement("span");
    const span4 = document.createElement("span");
    const newListItem = document.createElement("li");

    // <span class="radio--button radio--button__light">
    /* <img class="check" src="" /> */
    /* </span>; */
    newImg.setAttribute("src", "/images/icon-cross.svg");
    newImg.setAttribute("alt", "delete task");
    newImg.setAttribute("data-src", "frontendmentor");
    newImg2.setAttribute("src", "/images/icon-check.svg");
    newImg2.setAttribute("alt", "check");
    newImg2.classList.add("check");
    span4.classList.add("radio--button");
    span4.classList.add(`radio--button__${shade}`);
    span4.appendChild(newImg2);
    span3.classList.add("icon--delete");
    span3.classList.add("icon");
    span3.appendChild(newImg);
    span2.classList.add("task--text");
    span2.textContent = e.target.value;

    span1.classList.add("pad--left");
    span1.appendChild(span4);
    newListItem.setAttribute("draggable", "true");
    newListItem.classList.add("task--item");
    newListItem.classList.add(`task--item__${shade}`);
    newListItem.appendChild(span1);
    newListItem.appendChild(span2);
    newListItem.appendChild(span3);
    console.log(typeof newListItem);

    radioButtons.push(span4);
    taskList.prepend(newListItem);
    taskesList.push(newListItem);
    numItemsLeft++;
    updateItemsLeft();

    e.target.value = "";
  }
});

// Implement the delete task functionality
taskList.addEventListener("click", function (e) {
  if (e.target.getAttribute("data-src") === "frontendmentor") {
    const deletedTask = e.target.closest(".task--item");
    deletedTask.remove();
    // if (!completedTaskes.includes(deletedTask)) {
    //   deletedIndex = taskesList.findIndex((task) => task === deletedTask);
    //   taskesList.splice(deletedIndex, 1);
    // }

    // Guard clause!
    if (completedTaskes.includes(deletedTask)) return;
    numItemsLeft--;
    updateItemsLeft();
  }
});

// Implementing the toggle background functionality
mainBackground.addEventListener("click", function (e) {
  if (e.target === toggleIcon) {
    this.classList.toggle("light--theme");
    this.classList.toggle("dark--theme");

    header.classList.toggle("header--light");
    header.classList.toggle("header--dark");

    inputTask.classList.toggle("background__light");
    inputTask.classList.toggle("background__dark");

    containerTask.classList.toggle("background__dark");

    taskesList.forEach(function (task) {
      task.classList.toggle("task--item__light");
      task.classList.toggle("task--item__dark");
      if (task.classList.contains("task--completed")) {
        task.classList.toggle("task--completed__light");
        task.classList.toggle("task--completed__dark");
      }
    });

    typeInTask.classList.toggle("task--input__light");
    typeInTask.classList.toggle("task--input__dark");

    // if (typeInTask.classList.contains("task--input__dark")) {
    //   document.querySelector(".task--input").placeholder.style.color =
    //     "hsl(233, 14%, 35%)";
    // } else {
    //   document.querySelector(".task--input").placeholder.style.color =
    //     "hsl(233, 11%, 84%)";
    // }

    radioButtons.forEach((radioButton) =>
      radioButton.classList.toggle("radio--button__light")
    );
    radioButtons.forEach((radioButton) =>
      radioButton.classList.toggle("radio--button__dark")
    );

    document.querySelector(".radio").classList.toggle("radio--button__light");
    document.querySelector(".radio").classList.toggle("radio--button__dark");

    taskBottom.classList.toggle("task--bottom__light");
    taskBottom.classList.toggle("task--bottom__dark");

    taskGroups.classList.toggle("background__light");
    taskGroups.classList.toggle("background__dark");

    taskGroup.forEach((t) => t.classList.toggle("task--group__light"));
    taskGroup.forEach((t) => t.classList.toggle("task--group__dark"));

    if (e.target.getAttribute("src") === "/images/icon-moon.svg") {
      e.target.setAttribute("src", "/images/icon-sun.svg");
    } else {
      e.target.setAttribute("src", "/images/icon-moon.svg");
    }
  }
});

// Marking task as completed
taskList.addEventListener("click", function (e) {
  if (radioButtons.includes(e.target)) {
    e.target.classList.add("radio--completed");

    const check = [...e.target.children].find((check) =>
      check.classList.contains("check")
    );
    check.style.display = "inline-block";

    const task = e.target.closest(".task--item");
    task.setAttribute("data-id", "completed--task");
    task.classList.add("task--completed");

    task.classList.contains("task--item__light")
      ? task.classList.add(`task--completed__light`)
      : task.classList.add(`task--completed__dark`);

    // task.style.color = task.classList.contains("task--item__dark")
    //   ? "hsl(234, 11%, 52%)"
    //   : "hsl(233, 11%, 84%)";
    // const text = task.querySelector(".task--text");
    // text.classList.add("strike--through");

    // Guard clause
    if (completedTaskes.includes(task)) return;
    completedTaskes.push(task);
    numItemsLeft--;
    updateItemsLeft();
  }
});

const displayTaskGroup = function (task) {
  // this function displays the taskes according the filter
  if (task.classList.contains("display--none")) {
    task.classList.remove("display--none");
  }
};

// to give the element a blue color
const taskGroupFocus = function (e, taskGroup) {
  taskGroup.forEach((group) => group.classList.remove("task--group__active"));
  e.target.classList.add("task--group__active");
  e.target;
};

// Filter by all/active/complete todos
main.addEventListener("click", function (e) {
  // Displaying only Completed Taskes
  if (e.target === taskesCompleted) {
    taskesList.forEach(function (task) {
      if (!completedTaskes.includes(task)) {
        task.classList.add("display--none");
      } else displayTaskGroup(task);
    });
    taskGroupFocus(e, taskGroup);
  }

  // Displaying only Active Taskes
  if (e.target === taskesActive) {
    taskesList.forEach(function (task) {
      if (completedTaskes.includes(task)) {
        task.classList.add("display--none");
      } else displayTaskGroup(task);
    });
    taskGroupFocus(e, taskGroup);
  }

  // Displaying all Taskes
  if (e.target === taskesAll) {
    taskesList.forEach((task) => displayTaskGroup(task));
    taskGroupFocus(e, taskGroup);
  }

  // Clear all completed todos

  if (e.target.textContent === "Clear Completed") {
    console.log(completedTaskes);
    completedTaskes.forEach((task) => task.remove());
  }
});

// // Revealing the delete icon on Hover
const clientDesktopViewport = window.matchMedia("(min-width: 900px)");
// console.log(clientDesktopViewport);
if (clientDesktopViewport.matches) {
  taskesList.forEach(function (task) {
    task.addEventListener("mouseenter", function () {
      const deleteIcon = [...task.children].find((child) =>
        child.classList.contains("icon--delete")
      );
      console.log(task);

      deleteIcon.style.display = "inline-block";
    });
  });

  taskesList.forEach(function (task) {
    task.addEventListener("mouseleave", function () {
      const deleteIcon = [...task.children].find((child) =>
        child.classList.contains("icon--delete")
      );
      deleteIcon.style.display = "none";
    });
  });

  main.addEventListener("click", function (e) {
    const desktopTaskGroup = document.querySelectorAll(
      ".desktop--bottom__item"
    );

    const targetId = e.target.getAttribute("id");
    // Displaying only Completed Taskes for desktop
    if (targetId === "completed--task__desktop") {
      taskesList.forEach(function (task) {
        if (!completedTaskes.includes(task)) {
          task.classList.add("display--none");
        } else displayTaskGroup(task);
      });
      taskGroupFocus(e, desktopTaskGroup);
    }

    // Displaying only Active Taskes for desktop
    if (targetId === "active--task__desktop") {
      taskesList.forEach(function (task) {
        if (completedTaskes.includes(task)) {
          task.classList.add("display--none");
        } else displayTaskGroup(task);
      });
      taskGroupFocus(e, desktopTaskGroup);
    }

    // Displaying all Taskes for desktop
    if (targetId === "all--task__destop") {
      taskesList.forEach((task) => displayTaskGroup(task));
      taskGroupFocus(e, desktopTaskGroup);
    }
  });
}

// // Implementing the drag and drop functionality
taskesList.forEach((task) => {
  task.addEventListener("dragstart", () => {
    task.classList.add("dragging");
  });

  task.addEventListener("dragend", () => {
    task.classList.remove("dragging");
  });
});

taskList.addEventListener("dragover", (e) => {
  e.preventDefault();

  const draggingItem = [...taskList.childNodes].find((child) =>
    child.classList.contains("dragging")
  );
  const siblings = [...taskList.children].filter(
    (task) => !task.classList.contains("dragging")
  );

  let siblingAfter = siblings.find(
    (sibling) => e.clientY <= sibling.offsetTop + sibling.offsetHeight / 2
  );

  if (siblingAfter) {
    taskList.insertBefore(draggingItem, siblingAfter);
  } else {
    taskList.appendChild(draggingItem);
  }
});
