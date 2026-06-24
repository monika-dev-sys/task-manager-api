function Analytics({ tasks }) {
  const total = tasks.length;
  const completed = tasks.filter(task => task.status === "completed").length;
  const pending = tasks.filter(task => task.status === "pending").length;

  return (
    <div className="analytics">
      <div className="card">
        <h3>Total Tasks</h3>
        <p>{total}</p>
      </div>

      <div className="card">
        <h3>Completed</h3>
        <p>{completed}</p>
      </div>

      <div className="card">
        <h3>Pending</h3>
        <p>{pending}</p>
      </div>
    </div>
  );
}

export default Analytics;