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

//returns json of all notes
app.get("/api/notes", (reg, res) => {
    return res.json(api);
});


//posts the new note to the db.json file without overriding 
app.post("/api/notes", (req, res) => {
    let note = req.body;
    fs.readFile("./db/db.json", (err, data) => {
        if (err) throw err;
        const savedNotes = JSON.parse(data);
        savedNotes.push(note)

        fs.writeFile("./db/db.json", JSON.stringify(savedNotes), (err) => {
            if (err) throw err;
           console.log("Notes saved!");
            }
        );
        
        res.json(savedNotes)
    });

});



//listener
app.listen(PORT,() => {
    console.log(`App listening on PORT ${PORT}`);
})