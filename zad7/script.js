let tasks = [];


function scrollToSection(id) {
    document.getElementById(id).scrollIntoView({ behavior: "smooth" });
}


function setTheme(color) {
    document.getElementById("theme").href = color + ".css";
}


window.addEventListener("load", function () {
    const saved = localStorage.getItem("tasks");

    if (saved) {
        tasks = JSON.parse(saved);
        renderTasks();
    }
});

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


function validateForm() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    if (name.length < 2) {
        alert("Imię za krótkie");
        return false;
    }

    if (!email.includes("@")) {
        alert("Niepoprawny email");
        return false;
    }

    if (message.length < 5) {
        alert("Wiadomość za krótka");
        return false;
    }

    document.getElementById("formInfo").innerText = "Formularz wysłany!";
    return false; // blokuje przeładowanie
}
