import React from"react";

function Header({tasks=[],darkMode,setDarkMode,searchQuery,setSearchQuery,filter,setFilter}) {
    const totalTasks=tasks.length;
    const completedTasks=tasks.filter(task => task.completed === true).length;
    const pendingTasks=totalTasks-completedTasks;
    return(
          <div className="App">
      <div className={`App ${darkMode ? "dark" : ""}`}></div>
      <nav>

        <div className="navbar">
      <h1 className="title">
        Task manager
      </h1>
      <button 
            onClick={() =>setDarkMode(!darkMode)} 
            className="theme-toggle-btn"
          >
            {darkMode ? "☀️ Light" : "🌙 Dark"}
          </button>
          </div>

          
      <input type="text" placeholder="Search tasks..."
      value={searchQuery}
      onChange={(e)=> setSearchQuery(e.target.value)} className="search"></input>

      <select  className="header-filter-select" value={filter} onChange={(e) => setFilter(e.target.value)}>
      <option value="All">Filter: All</option>
      <option value="Active">Filter: Active</option>
      <option value="Completed">Filter: Completed</option>
    </select>
      </nav>
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
             </div>
        
    )
}
export default Header;