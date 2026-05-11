let tasks = [];

function filterSection(type) {

    const sections = document.querySelectorAll(".section");

    sections.forEach(sec => {
        sec.style.display =
            (type === "all" || sec.id === type)
                ? "block"
                : "none";
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

    const nameError = document.getElementById("firstNameError");
    const surnameError = document.getElementById("lastNameError");
    const emailError = document.getElementById("emailError");
    const msgError = document.getElementById("messageError");

    let valid = true;

    const nameRegex = /^[A-Za-zĄąĆćĘęŁłŃńÓóŚśŹźŻż]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    nameError.textContent = "";
    surnameError.textContent = "";
    emailError.textContent = "";
    msgError.textContent = "";

    if (!name.value || !nameRegex.test(name.value)) {
        nameError.textContent = "Imię nie może zawierać cyfr";
        valid = false;
    }

    if (!surname.value || !nameRegex.test(surname.value)) {
        surnameError.textContent = "Nazwisko nie może zawierać cyfr";
        valid = false;
    }

    if (!email.value) {
        emailError.textContent = "Email jest wymagany";
        valid = false;
    } else if (!emailRegex.test(email.value)) {
        emailError.textContent = "Niepoprawny email";
        valid = false;
    }

    if (!msg.value) {
        msgError.textContent = "Wiadomość jest wymagana";
        valid = false;
    }

    return valid;
}

const form = document.getElementById("contactForm");

form.addEventListener("submit", async function (event) {

    event.preventDefault();

    const valid = validateForm();

    if (!valid) return;

    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    try {

        const response = await fetch("http://localhost:3000/send", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                firstName,
                lastName,
                email,
                message
            })
        });

        const result = await response.json();

        const status = document.getElementById("status");

        if (result.success) {
            status.textContent = "Dane zostały poprawnie wysłane";
            form.reset();
        } else {
            status.textContent = "Błąd wysyłania";
        }

    } catch (error) {
        document.getElementById("status").textContent =
            "Błąd połączenia z serwerem";
    }
});
