{
    const tasks = [
        {
            content: "umyć zęby",
            done: true,
        },
        {
            content: "posprzątać dom",
            done: false,
        },

    ];

    const render = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
            <li 
            class="list__item${task.done ? "list__item--done" : ""}"
            >
            <button class="js-done">zrobione?</button>
            <button class="js-remove">usuń</button>
                ${task.content}
            </li>
             `;
        }

        document.querySelector(".js-list").innerHTML = htmlString;
    };


    const init = () => {

        render();
    };

    init();
}

