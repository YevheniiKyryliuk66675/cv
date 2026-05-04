let tasks = [];

function filterSection(type) {
    const sections = document.querySelectorAll(".section");

    sections.forEach(sec => {
        sec.style.display = (type === "all" || sec.id === type) ? "block" : "none";
    });

    if (type === "tasks") {
        renderTasks();
    }
}

function setTheme(color) {
    document.getElementById("theme").href = color + ".css";
}

window.addEventListener("load", function () {
    filterSection("all");

    const saved = localStorage.getItem("tasks");
    if (saved) {
        tasks = JSON.parse(saved);
    }

    renderTasks();
});

function addTask() {
    const input = document.getElementById("taskInput");
    const value = input.value.trim();

    if (!value) return;

    tasks.push(value);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();

    input.value = "";
}

function deleteTask(index) {
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
}

function renderTasks() {
    const list = document.getElementById("taskList");
    list.innerHTML = "";

    if (tasks.length === 0) {
        list.innerHTML = "<li>Brak zadań</li>";
        return;
    }

    tasks.forEach((t, i) => {
        const li = document.createElement("li");
        li.textContent = t;

        const btn = document.createElement("button");
        btn.textContent = "Usuń";
        btn.onclick = () => deleteTask(i);

        li.appendChild(btn);
        list.appendChild(li);
    });
}

function validateForm() {
    const name = document.getElementById("firstName");
    const surname = document.getElementById("lastName");
    const email = document.getElementById("email");
    const msg = document.getElementById("message");
    const out = document.getElementById("formErrors");

    let errors = [];

    const nameRegex = /^[A-Za-zĄąĆćĘęŁłŃńÓóŚśŹźŻż]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name.value || !nameRegex.test(name.value)) errors.push("Błąd imienia");
    if (!surname.value || !nameRegex.test(surname.value)) errors.push("Błąd nazwiska");
    if (!email.value || !emailRegex.test(email.value)) errors.push("Błąd email");
    if (!msg.value) errors.push("Brak wiadomości");

    if (errors.length) {
        out.innerHTML = errors.join("<br>");
        out.style.color = "red";
        return false;
    }

    out.innerHTML = "OK";
    out.style.color = "green";

    return false;
}
