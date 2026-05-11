const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname)));

const filePath = path.join(__dirname, "messages.json");

app.post("/send", (req, res) => {

    const newMessage = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        message: req.body.message,
        date: new Date()
    };

    let messages = [];

    if (fs.existsSync(filePath)) {

        const data = fs.readFileSync(filePath, "utf8");

        if (data) {
            messages = JSON.parse(data);
        }
    }

    messages.push(newMessage);

    fs.writeFileSync(
        filePath,
        JSON.stringify(messages, null, 2)
    );

    res.json({
        success: true,
        message: "Dane zapisane"
    });
});

app.listen(PORT, () => {
    console.log(`Serwer działa: http://localhost:${PORT}`);
});
