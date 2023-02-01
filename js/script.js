{
    let tasks = [];

    let hideDoneTask = false ;

    const hideDoneTasks = () => {
        hideDoneTask =! hideDoneTask

        render();
    }




    const addNewTask = (newTaskContent) => {
        tasks = [
            ...tasks,
            { content: newTaskContent },
        ];

        render();
    };

    const removeTask = (index) => {
        tasks = [
            ...tasks.slice(0, index),
            ...tasks.slice(index + 1),
        ];

        render();
    };

    const toggleTaskDone = (index) => {
        tasks = [
            ...tasks.slice(0, index),
        {...tasks[index], done: !tasks[index].done},
            ...tasks.slice(index + 1),

        ];


    

        render();
    };




    const bindEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                removeTask(index);
            });
        });

        const toggleDoneButtons = document.querySelectorAll(".js-done");

        toggleDoneButtons.forEach((toggleDoneButton, index) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleTaskDone(index);
            });
        });
    }

    const renderTask = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
        <li class="list">
        <button type="submit" class=" list__button list__button--done js-done">
        ${task.done ? "✔" : ""}
        </button>
        <span class="list__taskName ${task.done ? "list__taskName--done" : ""}">
        ${task.content}
        </span>
        <button type="submit" class="list__button--remove js-remove">🗑</button>
             </li>
         `;
        }

        document.querySelector(".js-list").innerHTML = htmlString;
    };

    const renderButtons = () => { };
    const bindEventsButtons = () => { };

    const render = () => {

        renderTask();
        renderButtons();
        bindEventsButtons();
        bindEvents();
    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskContent = document.querySelector(".js-newTask").value.trim();

        if (newTaskContent === "") {
            return;
        }

        addNewTask(newTaskContent);

        document.querySelector(".js-newTask").value = "";
    };

    const init = () => {
        render();

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit);
    };

    init();
}

