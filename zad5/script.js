document.getElementById("contactForm").addEventListener("submit", function(e) {
    e.preventDefault();

    let isValid = true;

    const imie = document.getElementById("imie").value.trim();
    const nazwisko = document.getElementById("nazwisko").value.trim();
    const email = document.getElementById("email").value.trim();
    const wiadomosc = document.getElementById("wiadomosc").value.trim();

    document.querySelectorAll(".error").forEach(el => el.textContent = "");
    document.getElementById("successMessage").textContent = "";

    // Imię
    if (imie === "") {
        document.getElementById("errorImie").textContent = "Imię jest wymagane";
        isValid = false;
    } else if (/\d/.test(imie)) {
        document.getElementById("errorImie").textContent = "Imię nie może zawierać cyfr";
        isValid = false;
    }

    // Nazwisko
    if (nazwisko === "") {
        document.getElementById("errorNazwisko").textContent = "Nazwisko jest wymagane";
        isValid = false;
    } else if (/\d/.test(nazwisko)) {
        document.getElementById("errorNazwisko").textContent = "Nazwisko nie może zawierać cyfr";
        isValid = false;
    }

    // Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email === "") {
        document.getElementById("errorEmail").textContent = "Email jest wymagany";
        isValid = false;
    } else if (!emailRegex.test(email)) {
        document.getElementById("errorEmail").textContent = "Niepoprawny email";
        isValid = false;
    }

    // Wiadomość
    if (wiadomosc === "") {
        document.getElementById("errorWiadomosc").textContent = "Wiadomość jest wymagana";
        isValid = false;
    }

    // Sukces
    if (isValid) {
        document.getElementById("successMessage").textContent = "Formularz wysłany poprawnie!";
        document.getElementById("contactForm").reset();
    }
});
