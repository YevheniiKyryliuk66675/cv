function setTheme(color) {
    const theme = document.getElementById("theme");

    if (color === "green") {
        theme.href = "green.css";
    } else {
        theme.href = "red.css";
    }
}

function toggleSection(id) {
    const section = document.getElementById(id);

    if (section.style.display === "none") {
        section.style.display = "block";
    } else {
        section.style.display = "none";
    }
}
