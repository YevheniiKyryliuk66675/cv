const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = 3000;


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(express.static(__dirname));


const filePath = path.join(__dirname, "messages.json");


app.post("/send", (req, res) => {
    console.log("BODY:", req.body);
    try {
        const { firstName, lastName, email, message } = req.body;

        
        if (!firstName || !lastName || !email || !message) {
            return res.json({
                success: false,
                message: "Brak wymaganych danych"
            });
        }

        const newMessage = {
            firstName,
            lastName,
            email,
            message,
            date: new Date()
        };

        let messages = [];

        
        if (fs.existsSync(filePath)) {
            const data = fs.readFileSync(filePath, "utf8");
            if (data) {
                messages = JSON.parse(data);
            }
        } else {
            // tworzy plik jeśli nie istnieje
            fs.writeFileSync(filePath, "[]");
        }

        messages.push(newMessage);

        fs.writeFileSync(filePath, JSON.stringify(messages, null, 2));

        return res.json({
            success: true,
            message: "Dane zapisane na serwerze"
        });

    } catch (error) {
        console.error("Błąd:", error);

        return res.json({
            success: false,
            message: "Błąd serwera"
        });
    }
});

app.listen(PORT, () => {
    console.log(`Serwer działa: http://localhost:${PORT}`);
});
