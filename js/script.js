{
  let tasks = [];
  let hideDoneTasks = false;

  const removeTask = (taskIndex) => {
    tasks = [...tasks.slice(0, taskIndex), ...tasks.slice(taskIndex + 1)];
    render();
  };

  const toggleTaskDone = (taskIndex) => {
    tasks = [
      ...tasks.slice(0, taskIndex),
      {
        ...tasks[taskIndex],
        done: !tasks[taskIndex].done,
      },
      ...tasks.slice(taskIndex, +1),
    ];
    render();
  };

  const addNewTask = (newTaskContent) => {
    tasks = [...tasks, { content: newTaskContent }];
    render();
  };

  const toggleAllTaskDone = () => {
    tasks = tasks.map((task) => ({
      ...task,
      done: true,
    }));

    render();
  };

  const toggleHideDoneTasks = () => {
    hideDoneTasks = !hideDoneTasks;

    render();
  };

  const bindRemoveEvents = () => {
    const removeButtons = document.querySelectorAll(".js-remove");

    removeButtons.forEach((removeButton, taskIndex) => {
      removeButton.addEventListener("click", () => {
        removeTask(taskIndex);
      });
    });
  };

  const bindToggleDoneEvents = () => {
    const toggleDoneButtons = document.querySelectorAll(".js-toggleDone");

    toggleDoneButtons.forEach((toggleDoneButton, taskIndex) => {
      toggleDoneButton.addEventListener("click", () => {
        toggleTaskDone(taskIndex);
      });
    });
  };

  const renderTasks = () => {
    let taskToHTML = "";

    for (const task of tasks) {
      taskToHTML += `
      <li class="tasks__item${
        task.done && hideDoneTasks ? " tasks__item--hidden" : ""
      } 
      js-task"> 
      <button class="tasks__button tasks__button--toggleDone js-toggleDone">
      ${task.done ? "✓" : ""}
      </button>
      <span class="tasks__content${task.done ? " task__content--done" : ""}">
      ${task.content}</span>
      <button class="tasks__button tasks__button--remove js-remove">🗑️</button>
      </li>
      `;
    }
    document.querySelector(".js-tasks").innerHTML = taskToHTML;
  };

  const renderButtons = () => {
    const buttonsElement = document.querySelector(".js-buttons");

    if (!tasks.length) {
      buttonsElement.innerHTML = "";
      return;
    }

    buttonsElement.innerHTML = `
      <button class="buttons__b js-toggleHideDoneTasks">
       ${hideDoneTasks === true ? "Pokaż" : "Ukryj"} ukończone 
       </button>
      <button class="buttons__b js-toggleAllTaskDone"
       ${tasks.every(({ done }) => done) ? "disabled" : ""}> Ukończ wszystkie
       </button>
      `;
  };

  const bindButtonsEvents = () => {
    const toggleAllTaskDoneButton = document.querySelector(
      ".js-toggleAllTaskDone"
    );

    if (toggleAllTaskDoneButton) {
      toggleAllTaskDoneButton.addEventListener("click", toggleAllTaskDone);
    }

    const toggleHideDoneTasksButton = document.querySelector(
      ".js-toggleHideDoneTasks"
    );

    if (toggleHideDoneTasksButton) {
      toggleHideDoneTasksButton.addEventListener("click", toggleHideDoneTasks);
    }
  };

  const render = () => {
    renderTasks();
    bindRemoveEvents();
    bindToggleDoneEvents();

    renderButtons();
    bindButtonsEvents();
  };

  const onFormSubmit = (event) => {
    event.preventDefault();

    const newTaskElement = document.querySelector(".js-newTask");
    const newTaskContent = newTaskElement.value.trim();

    if (newTaskContent !== "") {
      addNewTask(newTaskContent);
      newTaskElement.value = "";
    }

    newTaskElement.focus();
  };

  const init = () => {
    render();

    const form = document.querySelector(".js-form");
    form.addEventListener("submit", onFormSubmit);
  };

  init();
}
