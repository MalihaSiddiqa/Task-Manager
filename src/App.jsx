import React from "react";
import { BrowserRouter as Router, Routes, Route , Navigate , Link } from "react-router-dom";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import ProgressTracker from "./components/ProgressTracker";
import Header from "./components/Header";
import { useState } from "react";
import { useEffect } from "react";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute"
import "./Style.css";


function App() {
  const [filter,setFilter]=useState("All");
  const [darkMode, setDarkMode] = useState(false);
  const [tasks,setTasks]=useState([]);

  useEffect(()=>{
    localStorage.setItem("tasks",JSON.stringify(tasks));
  });
   const addTask=(task)=>{
    setTasks([...tasks, task]) 
   }
   const updateTask=(updatedTask,index)=>{
    const newTask=[...tasks];
    newTask[index]=updatedTask;
    setTasks(newTask);
   }
   const deleteTask=(index)=>{
     setTasks(tasks.filter((_, i)=> i !=index))
   }
   const clearTasks=()=>{
    setTasks([]);
   }
   const [searchQuery, setSearchQuery]=useState("");
   const filteredTasks=tasks.filter(task =>{
    const matchesSearch = task.text.toLowerCase().includes(searchQuery.toLowerCase())
    let matchesFilter = true;
    if (filter === "Active") matchesFilter= !task.completed;
    if (filter==="Completed")matchesFilter=task.completed;
    return matchesSearch && matchesFilter;
  });
   const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    window.location.reload();
  };
  return(
    <Router>
    <div className="App">
      <div className={`App ${darkMode ? "dark" : ""}`}></div>
      <nav>

        <div className="navbar">
      <h1 className="title">
        Task manager
      </h1>
      <button 
            onClick={() => setDarkMode(!darkMode)} 
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

      <Routes>
        <Route path="/" element ={<Navigate to ="/dashboard" replace/>}/>
       <Route path="/login" element ={<Login/>}/>
      <Route
      path="/dashboard" element={
        <ProtectedRoute>
      <Header tasks={tasks}></Header>
      <TaskForm addTask={addTask}/>
      <TaskList tasks={filteredTasks} 
     updateTask={updateTask} 
     deleteTask={deleteTask}/>
      <ProgressTracker tasks={tasks} />

        {tasks.length>0 && (<button className="clear-btn"
        onClick={()=>{
          clearTasks();
        localStorage.removeItem("tasks");
        }}>Clear All Tasks</button> )}
        </ProtectedRoute>
      }/>
      <Route parh="*" element={<Navigate to="/dashboard" replace/>}/>
      </Routes>
       {localStorage.getItem("isLoggedIn") === "true" && (
              <button onClick={handleLogout} className="logout-btn"> Logout</button>
            )}
    </div>
    </Router>
      )
}

export default App;