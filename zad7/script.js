let tasks = [];


function setTheme(color) {
    document.getElementById("theme").href = color + ".css";
}


window.onload = function () {
    const saved = localStorage.getItem("tasks");

    if (saved) {
        tasks = JSON.parse(saved);
        renderTasks();
    }
};


function addTask() {
    const input = document.getElementById("taskInput");
    const value = input.value.trim();

    if (value === "") return;

    tasks.push(value);
    saveTasks();
    renderTasks();

    input.value = "";
}


function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}


function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
    const list = document.getElementById("taskList");
    list.innerHTML = "";

    tasks.forEach((task, index) => {
        const li = document.createElement("li");

        li.textContent = task;

        const btn = document.createElement("button");
        btn.textContent = "Usuń";
        btn.onclick = () => deleteTask(index);

        li.appendChild(btn);
        list.appendChild(li);
    });
}
