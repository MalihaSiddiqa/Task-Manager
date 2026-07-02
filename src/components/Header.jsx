import React from"react";

function Header({tasks=[]}) {
    const totalTasks=tasks.length;

    const completedTasks=tasks.filter(task => task.completed === true).length;
    const pendingTasks=totalTasks-completedTasks;
    return(
        <div className="stats-container">
          <div className="totalTasks">
            <h3>Total Tasks</h3>
            <h1>{totalTasks}</h1>
            <p>All your tasks</p>
          </div>
          <div className="completedTasks">
            <h3>Completed Tasks</h3>
            <h1>{completedTasks}</h1>
            <p>Tasks Completed</p>
          </div>
          <div className="pendingTasks">
            <h3>Pending Tasks</h3>
            <h1>{pendingTasks}</h1>
            <p>Tasks pending</p>
          </div>
        </div>
    )
}
export default Header;