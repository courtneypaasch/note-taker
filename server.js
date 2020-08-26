//establish dependencies and express
const fs = require("fs");
const express = require("express");
const path = require("path");
const api = require("./db/db.json");
const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
    res.sendFile("./public/index.html");
});

app.get("/notes")

//listener
app.listen(PORT,() => {
    console.log(`App listening on PORT ${PORT}`);
})