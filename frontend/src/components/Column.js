import React, { useState } from "react";
import Task from "./Task";
import { useDrop } from "react-dnd";
import { FaPlus } from "react-icons/fa";

const Column = ({ title, tasks, updateTaskStatus, addTask, deleteTask, 
        updateTaskDetails }) => {

    const [openTaskWindow, setOpenTaskWindow] = useState(false);
    const [newTaskTitle, setNewTaskTitle] = useState("");
    const [newTaskDescription, setNewTaskDescription] = useState("");
    const [priority, setPriority] = useState("low");
    const [sortBy, setSortBy] = useState(null);

    const statusMap = {
    "To Do": "todo",
    "In Progress": "in-progress",
    "Completed": "completed",
  };

  const [{ isOver }, dropRef] = useDrop(() => ({
    accept: "TASK",
    drop: (item) => {
      updateTaskStatus(item.id, statusMap[title]);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const addNewTask = () => {
    if (newTaskTitle === "") {
      alert("Task title cannot be empty");
      return;
    }
    addTask(newTaskTitle, newTaskDescription, statusMap[title], priority);
    setNewTaskTitle("");
    setOpenTaskWindow(false);
  };

  const sortedTasks = [...tasks].sort((a, b) => {
    if(sortBy==="title") {
      return a.title.localeCompare(b.title);
    }
    if (sortBy === "priority") {
      const priorityOrder = { low: 1, medium: 2, high: 3 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    }
    return 0;
  })

  return (
    <div
      className={`column border-2 border-black p-4 md:w-1/3 rounded-md ${
        isOver ? "bg-blue-200" : "bg-gray-200"
      }`}
      ref={dropRef}
    >
      <div className="flex justify-between border-b border-black pb-1">
        <div className="flex flex-row md:flex-col xl:flex-row justify-between xl:items-center gap-2">
          <div className="flex items-center gap-1">
            <p className="text-2xl font-bold text-center">{title}</p>
            <span className="text-lg">({tasks.length})</span>
          </div>
          <div className="flex items-center gap-2">
            <p>Sort by:</p>
            <div className="bg-white border-black rounded-sm">
            <button
              className={`${
                sortBy === "title" ? "bg-blue-200 hover:bg-blue-200" : ""
              } pl-1 pr-1 rounded-sm hover:bg-gray-300 border-r border-gray-400`}
              onClick={() => setSortBy("title")}
              >
              Title
            </button>
            <button
              className={`${
                sortBy === "priority" ? "bg-blue-200 hover:bg-blue-200" : ""
              } pl-1 pr-1 rounded-sm hover:bg-gray-300`}
              onClick={() => setSortBy("priority")}
              >
              Priority
            </button>
              </div>
          </div>
        </div>
        <FaPlus
          className={`text-3xl float-right cursor-pointer bg-white p-1 rounded-full ${
            openTaskWindow ? "rotate-45" : ""
          } transition`}
          onClick={() => setOpenTaskWindow(!openTaskWindow)}
        />
      </div>
      {openTaskWindow && (
        <div className="flex justify-between mt-2">
          <div className="flex flex-col gap-2">
            <input
              type="text"
              className="pl-1 pr-1"
              placeholder="Enter task title"
              onChange={(e) => setNewTaskTitle(e.target.value)}
              required
            />
            <input
              type="text"
              className="pl-1 pr-1"
              placeholder="Enter task description"
              onChange={(e) => setNewTaskDescription(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-4">
            <div className="flex flex-col gap-1">
              <p className="text-sm">Priority:</p>
              <select
                className="border-2 border-gray-200 p-1 rounded-md"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            <button
              className="border border-black pl-2 pr-2 rounded-sm bg-blue-400 text-white"
              onClick={addNewTask}
            >
              Add
            </button>
          </div>
        </div>
      )}
      {tasks.length === 0 ? (
        <p className="flex items-center w-full h-full justify-center">
          No Tasks
        </p>
      ) : (
        sortedTasks.map((task) => {
          return (
            <Task
              key={task._id}
              task={task}
              updateTaskStatus={updateTaskStatus}
              deleteTask={deleteTask}
              updateTaskDetails={updateTaskDetails}
            />
          );
        })
      )}
    </div>
  );
};

export default Column;
