const express = require("express")
const app = express();
const cors = require("cors")
const pool = require("./db") // using pool, we can run queries with postgres

// middleware 
app.use(cors())
// this allows us to get request from request.body then we can get json data
app.use(express.json())

// ROUTES //

// a create an element 
// 
app.post("/elements", async (req, res) => {
    // anytime you try to get data or create data it will take time, async uses await, which waits for the function before it continues 
    // makes error handling so much easier
    // try catch - catches error and those it out
    try {
        const { description } = req.body;
        const newElements = await pool.query(
            "INSERT INTO elements (description) VALUES($1) RETURNING *",
            [description]
        );

        res.json(newElements.rows[0])
    } catch (err) {
        console.error(err.message)
    }
})

// get all elements

app.get("/elements", async (req, res) => {
    try {
        const allElements = await pool.query("SELECT * FROM elements");
        res.json(allElements.rows);
    } catch (err) {
        console.error(err.message);
    }
})

// get an element

app.get("/elements/:id", async (req, res) => {
    try {
        // destructure id 
        const { id } =  req.params;
        // await because it will take time
        // select all from elements where element id = 1 specific to the id
        const elements = await pool.query("SELECT * FROM elements WHERE elements_id = $1", [id])

        res.json(elements.rows[0])
    } catch (err) {
        console.error(err.message)
    }
})

// update an element 

app.put("/elements/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { description } = req.body
        const updateElements = await pool.query(
            "UPDATE elements SET description = $1 WHERE elements_id = $2", [description, id]
        );

        res.json("Elements was updated!")
    } catch (error) { 
        console.error(err.message)
    }
})
    
// delete an element 

app.delete("/elements/:id", async (req, res) => {
    try {
        // specific what we want to delete, don't have to add data
        const { id } = req.params;
        const deleteElements = await pool.query("DELETE FROM elements WHERE  elements_id = $1", [
            id
        ]);
        res.json("Elements was deleted!")
    } catch (err) {
        console.log(err.message)
    }
})

// listen to server
app.listen(3000, () => {
    console.log("server has started on port 3000")
})     