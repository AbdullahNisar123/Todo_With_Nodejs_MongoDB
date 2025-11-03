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
  const [editID , setEditID]= useState(null)
  const fetchTodos = () => {
    axios
      .get(`${BASE_URL}/todo`)
      .then((res) => {
        setTodos(res.data);
      })
      .catch((err) => console.log("Error fetching todos:", err));
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = async () => {
    if (!newTodo.trim()) return;
    if (editID === null) {
      try {
        const res = await axios.post(`${BASE_URL}/todo`, {
          task: newTodo,
        });
        setNewTodo("");
        fetchTodos();
      } catch (err) {
        console.error("Error adding todo:", err);
      }
    } else {
      
      try {
        const res = await axios.put(`${BASE_URL}/todo/${editID}`, {
          task: newTodo,
        });
        setNewTodo("");
        setEditID(null)
        fetchTodos()
      } catch (err) {
        console.error("Error updating todo:", err);
      }
    }
  };

  const updateTodo = (id) => {
    const editTask = todos.find((todo) => todo._id === id);

    setNewTodo(editTask.task);
    setEditID(id)
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
    <div className="flex flex-col items-center justify-center gap-10 min-h-screen bg-gray-100 text-gray-800">
      <h1 className="text-4xl font-bold mt-5 capitalize animate-bounce">
        Welcome to Todo Website!
      </h1>

      <div className="w-[90%] md:w-[60%] bg-white rounded-xl shadow-lg p-6 flex flex-col gap-6">
        {/* Input */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <input
              type="text"
              className="w-4/5 h-10 rounded-md px-3 text-lg border border-gray-300"
              placeholder="Enter a task..."
              onChange={(e) => setNewTodo(e.target.value)}
              value={newTodo}
            />
            <button
              className="w-1/5 h-10 rounded-md bg-blue-500 text-white text-sm md:text-base hover:bg-blue-600 transition"
              onClick={addTodo}
            >
              {editID === null ? "Add Todo" : "Save"}
            </button>
          </div>
          {/* {error && <p className="text-red-500 text-base">{error}</p>} */}
        </div>

        {/* Tasks */}
        <div className="flex flex-col gap-4">
          <ol className="flex flex-col gap-4">
            {todos.length === 0 ? (
              <p className="text-center text-xl font-medium text-gray-700">
                No tasks added yet{" "}
                <span className="animate-pulse text-2xl">...</span>
              </p>
            ) : (
              todos.map((todo, index) => {
                return (
                  <li
                    key={index}
                    className="flex items-center gap-4 bg-gray-200 p-3 rounded-lg shadow-md"
                  >
                    <input type="checkbox" className="w-5 h-5 cursor-pointer" />
                    <span className="flex-1 text-lg text-center transition-transform hover:scale-110">
                      {todo.task}
                    </span>
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                      onClick={() => updateTodo(todo._id)}
                    >
                      Update
                    </button>
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                      onClick={() => deleteTodo(todo._id)}
                    >
                      Delete
                    </button>
                  </li>
                );
              })
            )}
          </ol>
        </div>
      </div>
    </div>
  );
}

export default App;
