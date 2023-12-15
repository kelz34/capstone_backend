const express = require("express")
const app = express();
const cors = require("cors")
const pool = require("./db") // using pool, we can run queries with postgres

// middleware 
app.use(cors())
// this allows us to get request from request.body then we can get json data
app.use(express.json())

// seed data

// ROUTES //

// a create an qanda 

app.post("/qanda", async (req, res) => {
    // try catch - catches error and throws it out
    try {
        const { term, definition } = req.body;
        const newQanda = await pool.query(
            "INSERT INTO qanda (term, definition) VALUES($1, $2) RETURNING *",
            [term, definition]
        );

        res.json(newQanda.rows[0])
    } catch (err) {
        console.error(err.message)
    }
})

// get all elements

app.get("/qanda", async (req, res) => {
    try {
        const allQanda = await pool.query("SELECT * FROM qanda");
        res.json(allQanda.rows);
    } catch (err) {
        console.error(err.message);
    }
})

// get an element

app.get("/qanda/:id", async (req, res) => {
    try {
        // destructure id 
        const { id } =  req.params;
        // select all from elements where element id = 1 specific to the id
        const qanda = await pool.query("SELECT * FROM qanda WHERE qanda_id = $1", [id])

        res.json(qanda.rows[0])
    } catch (err) {
        console.error(err.message)
    }
})

// update an element 

app.put("/qanda/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { term, definition } = req.body
        const updateQanda = await pool.query(
            "UPDATE qanda SET term = $1, definition = $2 WHERE qanda_id = $3", [term, definition, id]
        );

        res.json("Qanda was updated!")
    } catch (error) { 
        console.error(err.message)
    }
})
    
// delete an element 

app.delete("/qanda/:id", async (req, res) => {
    try {
        // specific what we want to delete, don't have to add data
        const { id } = req.params;
        const deleteQanda = await pool.query("DELETE FROM qanda WHERE qanda_id = $1", [
            id
        ]);
        res.json("Qanda was deleted!")
    } catch (err) {
        console.log(err.message)
    }
})

// listen to server
app.listen(3000, () => {
    console.log("server has started on port 3000")
})     