const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const bodyParser = require("body-parser");
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(bodyParser.json())

app.use(cors({origin:"*"}));

const db = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
})

app.get("/", (req, res) => {
    const sql = "SELECT * FROM notes";
    db.query(sql, (err, data) => {
        if(err) return res.json("Error");
        return res.json(data);
    })
})

app.post("/create", (req, res) => {
    try{
        const sql = "INSERT INTO notes (title, note) VALUES (?,?)";
        const values = [
            req.body.title,
            req.body.catatan
        ] 
        db.query(sql, values, (err, data) => {
            if(err) return res.json("Error");
            return res.json(data);
        })
    }catch(err){
        console.log(err)
    }
})

app.put("/update/:id", async (req, res) => {
    const sql = "UPDATE notes SET title = ?, note = ? WHERE id = ? ";
    const values = [req.body.title, req.body.catatan];
    const id = req.params.id;
  
    try {
      db.query(sql, [...values, id], (err, data) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: "Error updating the note" });
        }
        return res.json(data);
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "An unexpected error occurred" });
    }
});

app.delete("/notes/:id", (req, res) => {
    const sql = "DELETE FROM notes WHERE id = ? ";
    const id = req.params.id;
    console.log(id);

    try {
      db.query(sql, id, (err, data) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: "Error deleting the note" });
        }
        return res.json(data);
      });
    } catch (err) {
      console.error(error);
      return res.status(500).json({ error: "An unexpected error occurred" });
    }
});

app.listen(process.env.APP_PORT, () => {
    console.log('listening');
})