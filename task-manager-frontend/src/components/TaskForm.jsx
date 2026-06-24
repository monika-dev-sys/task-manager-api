import { useState } from "react";

function TaskForm({ fetchTasks }) {
  const [title, setTitle] = useState("");

  const addTask = async () => {
    if (!title) return;

    await fetch("http://localhost:3000/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title,
        status: "pending",
        priority: "medium",
        category: "personal"
      })
    });

    setTitle("");
    fetchTasks();
  };

  return (
    <div className="task-form">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter task"
      />
      <button onClick={addTask}>Add Task</button>
    </div>
  );
}

export default TaskForm;