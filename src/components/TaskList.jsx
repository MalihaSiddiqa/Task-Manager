import React from "react";

function TaskList({tasks,updateTask,deleteTask}){
    const toggleComplete=(index)=>{
        const updatedTask={...tasks[index],completed: !tasks[index].completed}
        updateTask(updatedTask,index);
    }
    return(
         <ul className="task-list">
          {tasks.map((task, index) => (
            <li key={index} className={task.completed ? "completed":""}>
                <div>
                    <span> {task.text}</span>
                    <small>({task.priority})</small>
                </div>
                <div>
                    <button onClick={()=>toggleComplete(index)}>
                        {task.completed ? "undo" : "Completed"}</button>
                    <button onClick={()=>deleteTask(index)}>
                        Delete</button>
                </div>
            </li>
          ))}
         </ul>
    )
}
export default TaskList;