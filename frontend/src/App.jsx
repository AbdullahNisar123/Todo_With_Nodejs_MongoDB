import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "./config/api";
function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    axios
      .get(`${BASE_URL}/todo`)
      .then((res) => setTodos(res.data))
      .catch((err) => console.log("Error fetching todos:", err));
  }, []);

  const addTodo = async () => {
    if (!newTodo.trim()) return;

    try {
      const res = await axios.post(`${BASE_URL}/todo`, {
        "task": newTodo,
      });
      setTodos("");

      console.log(res.data ,"TODO from backend");
      console.log(todos,"TODO Lish");
      
    } catch (err) {
      console.error("Error adding todo:", err);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/todo/${id}`);
      setTodos(todos.filter((todo) => todo._id !== id));
    } catch (err) {
      console.error("Error deleting todo:", err);
    }
  };
  
  return (
    <div className="app" style={{ padding: "30px" }}>
      <h1>Todo App 📝</h1>
      <input
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Add a new todo"
      />
      <button onClick={addTodo}>Add</button>

      <ul>
        {todos.map((todo) => {
          return (
            <li key={todo._id}>
              {todo.task || "empy"}
              <button onClick={() => deleteTodo(todo._id)}>❌</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default App;
