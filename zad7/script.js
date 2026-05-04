let tasks = [];


function scrollToSection(id) {
    document.getElementById(id).scrollIntoView({ behavior: "smooth" });
}

function setTheme(color) {
    document.getElementById("theme").href = color + ".css";
}

// 🔹 LOCAL STORAGE
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
    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    let errors = [];

    // wymagane pola
    if (!firstName) errors.push("Imię jest wymagane");
    if (!lastName) errors.push("Nazwisko jest wymagane");
    if (!email) errors.push("Email jest wymagany");
    if (!message) errors.push("Wiadomość jest wymagana");

    
    const nameRegex = /^[A-Za-zĄąĆćĘęŁłŃńÓóŚśŹźŻż]+$/;

    if (firstName && !nameRegex.test(firstName))
        errors.push("Imię nie może zawierać cyfr");

    if (lastName && !nameRegex.test(lastName))
        errors.push("Nazwisko nie może zawierać cyfr");

   
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email && !emailRegex.test(email))
        errors.push("Niepoprawny email");

    const errorBox = document.getElementById("formErrors");

    if (errors.length > 0) {
        errorBox.innerHTML = errors.join("<br>");
        errorBox.style.color = "red";
        return false;
    }

    errorBox.style.color = "green";
    errorBox.innerText = "Formularz wysłany poprawnie!";

    return false;
}
