import { useEffect, useState } from "react";
import axios from 'axios';
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { IoIosCreate } from "react-icons/io";
import { MdChangeCircle } from "react-icons/md";

const Todo = () => {
    const [todoData, setTodoData] = useState([]);
    const [title, setTitle] = useState("");

    const [updatedTitle, setUpdatedTitle] = useState("");
    const [todoId, setTodoId] = useState(0);

    // Get All TODOS
    const getTodos = () => {
        axios.get("http://localhost:8080/todos/get")
            .then((res) => {
                setTodoData(res.data.Todos);
            })
            .catch((err) => console.log(err))
    };

    // Create New TODO
    const handleCreate = () => {
        axios.post("http://localhost:8080/todos/create", { title })
            .then((res) => {
                console.log(res);
                console.log("Todo Created Successfully...");
                getTodos();
            })
            .catch((err) => console.log(err))

        setTitle("");
    }

    // Delete TODO
    const handleDelete = (id) => {
        axios.delete(`http://localhost:8080/todos/delete/${id}`)
            .then((res) => {
                console.log(res);
                console.log("Todo Deleted Successfully...");
                getTodos();
            })
            .catch((err) => console.log(err))
    }

    // Update Todo
    const handleUpdate = (id, todo) => {
        setUpdatedTitle(todo.title);
        setTodoId(id);
    }

    const handleFinalUpdate = () => {
        axios.patch(`http://localhost:8080/todos/update/${todoId}`, { title: updatedTitle })
            .then((res) => {
                console.log(res);
                console.log("Todo Updated Successfully...");
                getTodos();
            })
            .catch((err) => console.log(err))
    }

    useEffect(() => {
        getTodos();
    }, [])

    return (
        <div className="todo">
            <h1>Task Manager</h1>

            <div className="w-100">
                <div className="" style={{ border: "2px solid lightgray", borderRadius:"8px" }}>
                    {/* Create Todo */}
                    <div className="create-todo p-4 mb-0" style={{ borderBottom: "2px solid lightgray" }}>
                        <h2>CREATE TASK</h2>
                        <div>
                            <input value={title} name="title" type="text" onChange={(e) => setTitle(e.target.value)} placeholder="Enter Title..." />
                            <button onClick={handleCreate}><IoIosCreate /></button>
                        </div>
                    </div>

                    {/* Update Todo */}
                    <div className="update-todo p-4 mb-0" style={{ borderBottom: "2px solid lightgray" }}>
                        <h2>UPDATE TASK</h2>
                        <input value={updatedTitle} name="updatedTitle" type="text" onChange={(e) => setUpdatedTitle(e.target.value)} placeholder="Enter Title..." />
                        <button onClick={(e) => handleFinalUpdate(e.target.value)}><MdChangeCircle /></button>
                    </div>

                    {/* Show Todo */}
                    <div className="pt-4 p-4">
                        <h2 className="mb-3">TASKS</h2>
                        {todoData.map((todo) => (
                            <div key={todo._id}>
                                <div className="single-todo d-flex justify-content-between align-items-center mb-2 p-2">
                                    <h4 style={{ color: "#555" }}>{todo.title}</h4>
                                    <div className="d-flex">
                                        <button onClick={() => {
                                            handleUpdate(todo._id, todo);
                                        }} className="icon"><MdEdit /></button>
                                        <button onClick={() => handleDelete(todo._id)} className="icon"><MdDelete /></button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Todo