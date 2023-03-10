{
    let tasks = [];

    let hideDoneTask = false;

    const hideDoneTasks = () => {
        hideDoneTask = !hideDoneTask

        render();
    };

    const markAllDoneTasks = () => {
        tasks = tasks.map((task) => ({
            ...task,
            done: true
        }));

        render();
    };


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
            { ...tasks[index], done: !tasks[index].done },
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
        <li class="list ${task.done && hideDoneTask ? "list--hidden" : ""}">
        <button type="submit" class=" list__button list__button--done js-done">
        ${task.done ? "✔" : ""}
        </button>
        <span class="list__taskName  ${task.done ? "list__taskName--done" : ""}">
        ${task.content}
        </span>
        <button type="submit" class="list__button--remove js-remove">🗑</button>
             </li>
         `;
        }

        document.querySelector(".js-list").innerHTML = htmlString;
        renderButtons()

    };

    const renderButtons = () => {
        const buttonsElement = document.querySelector(".js-div");

        if (!tasks.length) {
            buttonsElement.innerHTML = "";
            return;
        };

        buttonsElement.innerHTML = `
            <button type="submit" class="section__button js-hideDoneTask">${hideDoneTask ? "Pokaż" : "Ukryj"} Zakończone </button> 
            <button type="submit" class="section__button section__button--disabled js-markDoneTask" ${tasks.every(({ done }) => done) ? 'disabled' : ""}> Ukończ Wszystkie </button>
              `
    };


    const bindEventsButtons = () => {
        const hideDoneTasksButton = document.querySelector(".js-hideDoneTask")
        if (hideDoneTasksButton) {
            hideDoneTasksButton.addEventListener('click', hideDoneTasks)
        };


        const markDoneTask = document.querySelector(".js-markDoneTask")
        if (markDoneTask) {
            markDoneTask.addEventListener('click', () => {
                markAllDoneTasks()
            });
        };
    };

    const render = () => {

        renderTask();
        renderButtons();
        bindEventsButtons();
        bindEvents();
    }

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
};

