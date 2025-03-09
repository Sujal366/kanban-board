import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Column from './Column';

const API_URL = process.env.REACT_APP_API_URL;

const Board = () => {

    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        try{
            axios
            .get(API_URL)
            .then((response) => {
                setTasks(response.data);
            });
        }
        catch(error){
            console.log(error);
        }
    },[]);

    const updateTaskStatus = (taskId, newStatus, newTimestamp) => {
        axios.put(`${API_URL}/updateStatus/${taskId}`, { status: newStatus, newTimestamp: newTimestamp }).then(() => {
          setTasks((prevTasks) =>
            prevTasks.map((task) =>
              task._id === taskId ? { ...task, status: newStatus, timestamp: newTimestamp } : task
            )
          );
        });
    }

    const updateTaskDetails = (taskId, newTitle, newDescription, newPriority, newTimestamp, newDueDate) => {
      axios.put(`${API_URL}/updateDetails/${taskId}`, {title: newTitle, description: newDescription, priority: newPriority, newTimestamp: newTimestamp, newDueDate: newDueDate})
      .then(()=>{
        setTasks((prevTasks)=>
          prevTasks.map((task)=>
            task._id===taskId ? {...task, title: newTitle, description: newDescription, priority: newPriority, timestamp: newTimestamp, dueDate: newDueDate } : task
          )
        )
      })
    }

    const addTask = (title, description, status, priority, dueDate) => {
      const tempId = Date.now().toString(); // Temporary ID for instant UI update
      const newTask = { _id: tempId, title, status, description, priority, dueDate };

      // Optimistically update the UI first
      setTasks((prevTasks) => [...prevTasks, newTask]);

      // Send request to backend
      axios
        .post(API_URL, { title, description, status, priority, dueDate })
        .then(() => {
          // Fetch latest tasks to ensure state sync
          return axios.get(API_URL);
        })
        .then((response) => {
          setTasks(response.data); // Update tasks with fresh backend data
        })
        .catch((error) => {
          console.error("Error adding task:", error);
          setTasks((prevTasks) =>
            prevTasks.filter((task) => task._id !== tempId)
          ); // Remove temp task if API fails
        });
    };


    const deleteTask = (taskId) => {
      axios
      .delete(`${API_URL}/${taskId}`)
      .then(()=>
        setTasks(prevTasks=>prevTasks.filter((task)=>task._id!==taskId))
      )
    };

  return (
    <div className="md:flex md:justify-between pl-4 pr-4 pb-4 gap-2">
      <Column
        title="To Do"
        tasks={tasks.filter((task) => task.status === "todo")}
        updateTaskStatus={updateTaskStatus}
        addTask={addTask}
        deleteTask={deleteTask}
        updateTaskDetails={updateTaskDetails}
      />
      <Column
        title="In Progress"
        tasks={tasks.filter((task) => task.status === "in-progress")}
        updateTaskStatus={updateTaskStatus}
        addTask={addTask}
        deleteTask={deleteTask}
        updateTaskDetails={updateTaskDetails}
      />
      <Column
        title="Completed"
        tasks={tasks.filter((task) => task.status === "completed")}
        updateTaskStatus={updateTaskStatus}
        addTask={addTask}
        deleteTask={deleteTask}
        updateTaskDetails={updateTaskDetails}
      />
    </div>
  );
}

export default Board