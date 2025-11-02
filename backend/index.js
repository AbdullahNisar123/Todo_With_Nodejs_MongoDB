import "dotenv/config";
import "./config.js";
import express from "express";
import Todo from "./TodoModel.js";
import cors from "cors";
const PORT = process.env.PORT || 5000;

const app = express();  
app.use(express.json());

app.use(cors({
  origin: ["http://localhost:5173", "https://todo-frontend.vercel.app"], // apna frontend URL
  methods: ["GET", "POST", "PUT", "DELETE"],
}));


app.get("/", (req, res) => {
    res.send("✅ Simple TODO App with Express + MongoDB running...");
});

app.post("/todo", async (req, res) => {
    try {
        const { task } = req.body;
        const newTodo = new Todo({ task});
        await newTodo.save();
        res
            .status(201)
            .json(newTodo);
    } catch (err) {
        res
            .status(400)
            .json({ message: "Error creating todo", error: err.message });
    }
});

app.get("/todo", async (req, res) => {
    const todo = await Todo.find();
    res.json(todo);
});

app.get("/todo/:id", async (req, res) => {
    try {
        const Todos = await Todo.findById(req.params.id);
        if (!Todos) return res.status(404).json({ message: "Todo not found" });
        res.json(Todos);
    } catch (err) {
        res.status(400).json({ message: "invaild id", error: err.message });
    }
});

app.put("/todo/:id", async(req, res) => {
    try {
        const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!updatedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

        res.json({ message: "Todo updated", Todo: updatedTodo });
    } catch (err) {
        res
            .status(400)
            .json({ message: "Error updating Todo", error: err.message });
    }
});

app.delete("/todo/:id", async (req, res) => {
    try {
        const deleted = await Todo.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: "Todo not found" });
        res.json({ message: "Todo deleted successfully!" });
    } catch (err) {
        res
            .status(400)
            .json({ message: "Error deleting todo", error: err.message });
    }
});
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
