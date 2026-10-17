import React from "react";
import { HashRouter as Router, Routes, Route , Navigate , Link } from "react-router-dom";
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
  const [tasks,setTasks]=useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks):[];
  });

  useEffect(()=>{
    localStorage.setItem("tasks",JSON.stringify(tasks));
  },[tasks]);
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
      <Routes>
        <Route path="/" element ={<Navigate to ="/dashboard" replace/>}/>
       <Route path="/login" element ={<Login/>}/>
      <Route
      path="/dashboard" element={
        <ProtectedRoute>
      <Header tasks={tasks} darkMode={darkMode} 
      setDarkMode={setDarkMode} searchQuery={searchQuery} 
      setSearchQuery={setSearchQuery} filter={filter} 
      setFilter={setFilter}></Header>
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
        {localStorage.getItem("isLoggedIn") === "true" && (
          <button onClick={handleLogout} className="logout-btn"> Logout</button>
        )}
        </ProtectedRoute>
      }/>
      <Route path="*" element={<Navigate to="/dashboard" replace/>}/>
      </Routes>
    </div>
    </Router>
      )
}

export default App;
