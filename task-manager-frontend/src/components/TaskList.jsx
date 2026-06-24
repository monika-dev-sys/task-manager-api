function TaskList({ tasks, fetchTasks }) {
  const deleteTask = async (id) => {
    await fetch(`http://localhost:3000/api/tasks/${id}`, {
      method: "DELETE"
    });
    fetchTasks();
  };

  const completeTask = async (task) => {
    await fetch(`http://localhost:3000/api/tasks/${task.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        ...task,
        status: "completed"
      })
    });

    fetchTasks();
  };

  return (
    <div>
      <h2>Tasks</h2>

      {tasks.map((task) => (
        <div key={task.id} className="task-card">
          <h3>{task.title}</h3>

          <p>
            Status:{" "}
            <span className={`status ${task.status}`}>
              {task.status}
            </span>
          </p>

          <p>
            Priority:{" "}
            <span className={`priority-${task.priority || "medium"}`}>
              {task.priority || "medium"}
            </span>
          </p>

          {task.status === "pending" && (
            <button
              className="complete-btn"
              onClick={() => completeTask(task)}
            >
              Complete
            </button>
          )}

          <button
            className="delete-btn"
            onClick={() => deleteTask(task.id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default TaskList;