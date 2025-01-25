const express = require("express");
const connection = require("./utils/db");
const { todoRouter } = require("./routes/todo.routes");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());
app.use("/todos", todoRouter);

app.listen(8080, async () => {
    try {
        await connection;
        console.log("Connected To Database");
        console.log("Server is running on posr 8080");
    } catch (error) {
        console.log(error);
    }
});