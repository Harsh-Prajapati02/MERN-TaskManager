const todoModel = require("../models/todo.model");

// Create Controller
const createTodo = async (req, res) => {
    const { title } = req.body;

    if (!title) {
        return res.status(400).json({ message: "Title is required" });
    }

    try {
        await todoModel.create({ title });
        return res.status(200).json({ message: "Todo Created SuccessFully.." });
    } catch (error) {
        return res.status(400).json({ message: "Title is required" });
    }
}

// Delete Controller
const deleteTodo = async (req, res) => {
    const { todoId } = req.params;

    try {
        await todoModel.findByIdAndDelete(todoId);
        res.status(200).json({ message: "Todo Deleted Successfully" });
    } catch (error) {
        res.status(400).json({ message: error });
    }
}

// Update Controller
const updateTodo = async (req, res) => {
    const { title } = req.body;
    const { todoId } = req.params;

    if (!title) {
        return res.status(400).json({ message: "Title is required" });
    };

    try {
        await todoModel.findByIdAndUpdate(todoId, { title });
        res.status(200).json({ message: "Todo Updates Successfully" });
    } catch (error) {
        res.status(400).json({ message: error });
    }
}

// Get Controller
const getTodo = async (req, res) => {
    try {
        const todos = await todoModel.find();
        res.status(200).json({ message: "Todos Get SuccessFully...", Todos: todos });
    } catch (error) {
        res.status(400).json({ message: error });
    }
}

module.exports = { createTodo, deleteTodo, updateTodo, getTodo };