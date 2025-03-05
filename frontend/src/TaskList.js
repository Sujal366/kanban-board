import React, { useState, useEffect } from "react";
import axios from "axios";

// const API_URL = "http://localhost:3000/tasks";
console.log("API URL:", process.env.REACT_APP_API_GET_URL);
const API_URL = process.env.REACT_APP_API_GET_URL;

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios
      .get(API_URL)
      .then((response) => setTasks(response.data))
      .catch((error) => console.error("Error fetching tasks", error));
  }, []);

  return (
    <>
      <h2>Task List</h2>
      {tasks.length === 0 ? (
        <p>No tasks</p>
      ):(
        <ul>
            {tasks.map((task)=>{
                return (
                    <li key={task.id}>{task.title}</li>
                )
            })}
        </ul>
      )}
    </>
  );
};

export default TaskList;