import React, { useState } from "react";
import { useDrag } from "react-dnd";
import { MdOutlineDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";

const Task = ({ task, updateTaskStatus, deleteTask, updateTaskDetails }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(task.title);
  const [newDescription, setNewDescription] = useState(task.description);
  const [newPriority, setNewPriority] = useState(task.priority);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: "TASK",
    item: { id: task._id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const handleSave = () => {
    if (newTitle === "") {
      alert("Task title cannot be empty");
      return;
    }
    updateTaskDetails(task._id, newTitle, newDescription, newPriority);
    setIsEditing(false);
  };

  const priorityMap = {
    low: "🟢",
    medium: "🟡",
    high: "🔴",
  };

  return (
    <div
      className={`p-2 mt-2 ${isEditing ? "cursor-default" : "cursor-grab"} ${
        confirmDelete ? "bg-red-200 border border-red-500" : "bg-white"
      } rounded-md`}
      ref={isEditing ? undefined : dragRef}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      {!confirmDelete ? (        
          isEditing ? (
            <div className="flex justify-between gap-2 md:flex-col xl:flex-row">
              <div className="flex gap-2 md:flex-col xl:flex-row">
                <div className="flex flex-col gap-2">
                  <input
                    type="text"
                    className="border border-gray-200 pl-1 pr-1"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                  />
                  <textarea
                    className="border border-gray-200 pl-1 pr-1 mt-1 resize-none h-auto"
                    rows="2"
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                  />
                </div>
                <div>
                  <p className="text-sm">Priority:</p>
                  <select
                    className="border-2 border-gray-200 p-1 rounded-md"
                    value={newPriority}
                    onChange={(e) => setNewPriority(e.target.value)}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <RxCross2
                  className="cursor-pointer"
                  onClick={() => setIsEditing(false)}
                />
                <button
                  className="border border-black pl-1 pr-1 rounded-sm bg-blue-400 text-white"
                  onClick={handleSave}
                >
                  Save
                </button>
              </div>
            </div>
          ) : (
            <div className="HAHA flex justify-between gap-2 md:flex-col lg:flex-row lg:items-center">
              <div className="flex flex-col gap-1">
                <p className="text-sm text-gray-500">
                  Last Updated:{" "}
                  {new Date(task.timestamp).toLocaleTimeString([], {
                    year: "numeric",
                    month: "numeric",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
                <p className="flex items-center gap-2">
                  {priorityMap[task.priority]} {task.title}
                  <FaRegEdit
                    className="cursor-pointer"
                    onClick={() => setIsEditing(true)}
                  />
                </p>
                <p className="text-sm text-gray-500">{task.description}</p>
              </div>
              <div className="flex items-center gap-2">
                <select
                  className="p-1 rounded-md bg-gray-200"
                  value={task.status}
                  onChange={(e) => updateTaskStatus(task._id, e.target.value)}
                >
                  <option value="todo">To Do</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
                <MdOutlineDelete
                  className={`text-lg text-red-500 bg-grey-200 border-black ${
                    isEditing ? "hidden" : "cursor-pointer"
                  }`}
                  onClick={isEditing ? undefined : () => setConfirmDelete(true)}
                />
              </div>
            </div>
          )
      ) : (
        <div className="flex flex-col items-center gap-2">
          <p>Are you sure you want to delete this task?</p>
          <div className="flex gap-2">
            <button
              className="border border-black pl-1 pr-1 rounded-sm bg-red-400 text-white"
              onClick={() => deleteTask(task._id)}
            >
              Yes
            </button>
            <button
              className="border border-black pl-1 pr-1 rounded-sm bg-blue-400 text-white"
              onClick={() => setConfirmDelete(false)}
            >
              No
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Task;
