function TaskList({ tasks, updateTask, deleteTask }) {
  const toggleComplete = (task) => {
    updateTask({ ...task, completed: !task.completed });
  };

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <li key={task.id} className={task.completed ? "completed" : ""}>
          <div>
            <span>{task.text}</span>
            <small>({task.priority})</small>
          </div>
          <div>
            <button onClick={() => toggleComplete(task)}>
              {task.completed ? "Undo" : "Completed"}
            </button>
            <button onClick={() => deleteTask(task.id)}>
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default TaskList;