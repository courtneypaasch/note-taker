//establish dependencies and express
const fs = require("fs");
const express = require("express");
const path = require("path");
const api = require("./db/db.json");
const app = express();
const PORT = 3000;

app.use(express.urlencoded({extended: true}));
app.use(express.json());

//directs homepage of port to index.html
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

//directs notes page to notes.html
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});

//listener
app.listen(PORT,() => {
    console.log(`App listening on PORT ${PORT}`);
})