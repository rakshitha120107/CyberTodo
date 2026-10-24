
const express = require("express");
const app = express();

app.use(express.json());
app.use(express.static("public"));

let tasks = [];
let nextId = 1;

// GET - View all tasks
app.get("/tasks", (req, res) => {
    res.json(tasks);
});

// POST - Add a new task
app.post("/tasks", (req, res) => {
    const title = req.body.title;

    if (typeof title !== "string" || !title.trim()) {
        return res.status(400).json({
            error: "Task title is required"
        });
    }

    const task = {
        id: nextId++,
        title: title.trim(),
        completed: false
    };

    tasks.push(task);
    res.status(201).json(task);
});

// PUT - Mark a task as completed
app.put("/tasks/:id", (req, res) => {
    const task = tasks.find(
        t => t.id === Number(req.params.id)
    );

    if (!task) {
        return res.status(404).json({
            error: "Task not found"
        });
    }

    task.completed = !task.completed;
    res.json(task);
});

// DELETE - Remove a task
app.delete("/tasks/:id", (req, res) => {
    const id = Number(req.params.id);
    const index = tasks.findIndex(t => t.id === id);

    if (index === -1) {
        return res.status(404).json({
            error: "Task not found"
        });
    }

    tasks.splice(index, 1);
    res.json({ message: "Task deleted successfully" });
});

app.listen(3000, () => {
    console.log("CyberTodo running at http://localhost:3000");
});
