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
  const [newDueDate, setNewDueDate] = useState(task.dueDate);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const date = new Date().toISOString();

  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: "TASK",
    item: { id: task._id, status: task.status },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const handleSave = () => {
    if (newTitle === "") {
      alert("Task title cannot be empty");
      return;
    }
    const newTimestamp = (task.title === newTitle) && (task.description === newDescription) && (task.priority === newPriority) ? task.timestamp : date;
    updateTaskDetails(task._id, newTitle, newDescription, newPriority, newTimestamp, newDueDate);
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
      } rounded-md ${
        task.status !== "completed" && new Date(task.dueDate) < new Date()
          ? "border border-red-500 bg-red-100"
          : ""
      }`}
      ref={isEditing ? undefined : dragRef}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      {!confirmDelete ? (
        isEditing ? (
          <div className="flex justify-between gap-2 flex-col xl:flex-row">
            <div className="flex items-center gap-2 flex-col xl:flex-row">
              <div className="flex flex-col gap-2 w-full">
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
              <div className="flex justify-between xl:flex-col gap-1 w-full">
                <div>
                  <p className="text-sm">Priority:</p>
                  <select
                    className="border-2 border-gray-200 p-1 rounded-md text-xs"
                    value={newPriority}
                    onChange={(e) => setNewPriority(e.target.value)}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
                <div>
                  <p className="text-sm">Due Date:</p>
                  <input
                    type="date"
                    className="border-2 border-gray-200 p-1 rounded-md text-xs"
                    value={
                      newDueDate
                        ? new Date(newDueDate).toISOString().split("T")[0]
                        : ""
                    }
                    onChange={(e) => setNewDueDate(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 w-full">
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
          <div className="flex flex-col gap-2">
            {task.status !== "completed" && new Date(task.dueDate) < new Date()
              ? <p className="text-red-500 text-sm border-b border-red-500">Task deadline exceeded!</p>
              : ""}
            <div className="flex justify-between gap-1 xl:flex-row md:flex-col">
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
              <p
                className={`text-sm text-gray-500 ${
                  task.status !== "completed" &&
                  new Date(task.dueDate) < new Date()
                    ? "text-red-500 underline"
                    : ""
                }`}
              >
                Due Date:{" "}
                {task.dueDate
                  ? new Date(task.dueDate).toLocaleDateString([], {
                      year: "numeric",
                      month: "numeric",
                      day: "numeric",
                    })
                  : "-"}
              </p>
            </div>
            <div className="flex justify-between xl:items-center gap-2 md:flex-col xl:flex-row">
              <div className="flex flex-col gap-1">
                <p className="flex items-center gap-2">
                  {priorityMap[task.priority]} {task.title}
                  <FaRegEdit
                    className="cursor-pointer"
                    onClick={() => setIsEditing(true)}
                  />
                </p>
                <p className="text-sm text-gray-500">{task.description}</p>
              </div>
              <div className="flex justify-between items-center gap-2">
                <select
                  className="p-1 rounded-md bg-gray-200"
                  value={task.status}
                  onChange={(e) =>
                    updateTaskStatus(task._id, e.target.value, date)
                  }
                >
                  <option value="todo">To Do</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
                <MdOutlineDelete
                  className={`text-lg text-red-500 bg-grey-200 border-black ${
                    isEditing ? "hidden" : "cursor-pointer"
                  }`}
                  onClick={() => setConfirmDelete(true)}
                />
              </div>
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
