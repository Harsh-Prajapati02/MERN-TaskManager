const express = require("express");
const { createTodo, deleteTodo, updateTodo, getTodo } = require("../controllers/todo.controllers");

const todoRouter = express.Router();

// Post Route ==> For Post Todo
todoRouter.post("/create", createTodo);

// Delete Route ==> For Delete Todo
todoRouter.delete("/delete/:todoId", deleteTodo);

// Update Route ==> For Update Todo
todoRouter.patch("/update/:todoId", updateTodo);

// Get Route ==> For Get Todo
todoRouter.get("/get", getTodo);

module.exports = { todoRouter };