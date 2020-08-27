//establish dependencies and express
const fs = require("fs");
const express = require("express");
const path = require("path");
const api = require("./db/db.json");

const app = express();
const PORT = 3000;

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(express.static(__dirname + "/public"));

//directs homepage of port to index.html
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

//directs notes page to notes.html
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});

//returns json of all notes
app.get("/api/notes", (reg, res) => {
    return res.json(api);
});

const writeAPI = (arr) => {
    fs.writeFile(path.join(__dirname, "./db/db.json"), JSON.stringify(arr), (err) => {
        if (err) throw err;
        console.log("Notes saved!");
        });
}

//posts the new note to the db.json file without overriding 
let savedNotes;
app.post("/api/notes", (req, res) => {
    let note = {
        id: Math.floor(Math.random() * 100000000),
        title: req.body.title,
        text: req.body.text
    }
    api.push(note);
    writeAPI(api);
    res.send(savedNotes);
});

//deletes notes from the db.json file
app.delete("/api/notes/:id", (req, res) => {
    const deleteNote = parseInt(req.params.id);
    const callAPI = JSON.parse(fs.readFileSync("./db/db.json").toString());
    const editAPI = callAPI.filter((note) => note.id != deleteNote);
    fs.writeFileSync("./db/db.json", JSON.stringify(editAPI))
    res.send("It's outa here!")
});



//listener
app.listen(PORT,() => {
    console.log(`App listening on PORT ${PORT}`);
})