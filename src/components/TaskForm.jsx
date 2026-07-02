import React from "react";
import { useState } from "react";

function TaskForm({addTask}){
const [task,setTask]=useState("")
const [priority,setPriority]=useState("Medium")

const handlesubmit= (e)=>{
    e.preventDefault();
    if (!task.trim())return;
    addTask ({ text:task, priority, completed: false });
    setTask("");
    setPriority("Medium");

}
    return(
        <form onSubmit={handlesubmit} className="task-form">
          <div id="inp">
            <input type="text" 
            placeholder="Enter Your task..."
            onChange= {(e)=>setTask(e.target.value)}
            value={task}/>
        </div>
        <div className="btns">
           <select onChange= {(e)=>setPriority(e.target.value)} value={priority}>
                <option value="High">Priority : High</option>
                <option value="Medium">Priority : Medium</option>
                <option value="Low">Priority : Low</option>
            </select>
            <span><button type="submit">Add Task</button></span>

            </div>
        </form>
    )
}
export default TaskForm;