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
    const [dueDate, setDueDate] = useState("");
    const [sortBy, setSortBy] = useState(null);

    const statusMap = {
    "To Do": "todo",
    "In Progress": "in-progress",
    "Completed": "completed",
  };

  const [{ isOver }, dropRef] = useDrop(() => ({
    accept: "TASK",
    drop: (item) => {
      if (statusMap[title] !== item.status) {
        updateTaskStatus(item.id, statusMap[title], new Date().toISOString());
      }
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
    addTask(newTaskTitle, newTaskDescription, statusMap[title], priority, dueDate);
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
    if (sortBy === "date-created") {
      return new Date(b.timestamp) - new Date(a.timestamp);
    }
    if (sortBy === "due-date") {
      return new Date(b.dueDate) - new Date(a.dueDate);
    }
    return 0;
  })

  return (
    <div
      className={`border-2 border-black p-4 md:w-1/3 rounded-md ${
        isOver ? "bg-blue-200" : "bg-gray-200"
      } `}
      ref={dropRef}
    >
      <div className="flex justify-between border-b border-black pb-1">
        <div className="flex flex-row md:flex-col xl:flex-row justify-between xl:items-center gap-2">
          <div className="flex items-center gap-1">
            <p className="text-lg md:text-2xl font-bold text-center">{title}</p>
            <span className="text-lg">({tasks.length})</span>
          </div>
          <div className="flex items-center gap-2">
            <p>Sort by:</p>
            <select
              onChange={(e) => setSortBy(e.target.value)}
              className="border-2 border-gray-200 p-1 rounded-md"
            >
              <option value="title">Title</option>
              <option value="priority">Priority</option>
              <option value="date-created">Date Created</option>
              <option value="due-date">Due Date</option>
            </select>
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
        <div className="flex flex-col xl:flex-row items-center justify-between mt-2 gap-2">
          <div className="flex flex-col xl:flex-row gap-2 w-full">
            <div className="flex justify-between items-center md:flex-col lg:flex-row xl:flex-col gap-2">
              <input
                type="text"
                className="pl-1 pr-1 text-sm sm:min-w-[140px] w-full"
                placeholder="Enter task title"
                onChange={(e) => setNewTaskTitle(e.target.value)}
                required
              />
              <input
                type="text"
                className="pl-1 pr-1 text-sm sm:min-w-[140px] w-full"
                placeholder="Enter task description"
                onChange={(e) => setNewTaskDescription(e.target.value)}
              />
            </div>
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center md:flex-col lg:flex-row xl:flex-col gap-1">
                <p className="text-sm">Priority:</p>
                <select
                  className="border-2 border-gray-200 p-1 rounded-md text-xs"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              <div className="flex items-center md:flex-col lg:flex-row xl:flex-col gap-1">
                <p className="text-sm">Due Date:</p>
                <input
                  type="date"
                  className="border-2 border-gray-200 p-1 rounded-md text-xs"
                  onChange={(e) => setDueDate(e.target.value)}
                />
              </div>
            </div>
          </div>
          <button
            className="border border-black pl-2 pr-2 rounded-sm bg-blue-400 text-white w-full xl:w-auto"
            onClick={addNewTask}
          >
            Add
          </button>
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
