let tasks = [];


function showSection(id) {
    const sections = document.querySelectorAll(".section");

    sections.forEach(sec => sec.classList.remove("active"));

    document.getElementById(id).classList.add("active");
}

// 🔹 MOTYW
function setTheme(color) {
    document.getElementById("theme").href = color + ".css";
}


window.addEventListener("load", function () {
    showSection("about");

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
    const firstName = document.getElementById("firstName");
    const lastName = document.getElementById("lastName");
    const email = document.getElementById("email");
    const message = document.getElementById("message");

    const errorBox = document.getElementById("formErrors");

    let errors = [];

    // reset
    [firstName, lastName, email, message].forEach(el => {
        el.style.border = "1px solid #ccc";
    });

    const nameRegex = /^[A-Za-zĄąĆćĘęŁłŃńÓóŚśŹźŻż]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!firstName.value.trim()) {
        errors.push("Podaj imię");
        firstName.style.border = "2px solid red";
    } else if (!nameRegex.test(firstName.value)) {
        errors.push("Imię nie może zawierać cyfr");
        firstName.style.border = "2px solid red";
    }

    if (!lastName.value.trim()) {
        errors.push("Podaj nazwisko");
        lastName.style.border = "2px solid red";
    } else if (!nameRegex.test(lastName.value)) {
        errors.push("Nazwisko nie może zawierać cyfr");
        lastName.style.border = "2px solid red";
    }

    if (!email.value.trim()) {
        errors.push("Podaj email");
        email.style.border = "2px solid red";
    } else if (!emailRegex.test(email.value)) {
        errors.push("Niepoprawny email");
        email.style.border = "2px solid red";
    }

    if (!message.value.trim()) {
        errors.push("Podaj wiadomość");
        message.style.border = "2px solid red";
    }

    if (errors.length > 0) {
        errorBox.innerHTML = errors.join("<br>");
        errorBox.style.color = "red";
        return false;
    }

    errorBox.innerHTML = "✅ Formularz wysłany poprawnie!";
    errorBox.style.color = "green";

    // czyszczenie
    firstName.value = "";
    lastName.value = "";
    email.value = "";
    message.value = "";

    return false;
}
