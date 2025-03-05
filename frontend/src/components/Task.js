import React, { useState } from 'react';
import { useDrag } from 'react-dnd';
import { MdOutlineDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";

const Task = ({ task, updateTaskStatus, deleteTask, updateTaskDetails }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(task.title);
  const [newDescription, setNewDescription] = useState(task.description);
  const [newPriority, setNewPriority] = useState(task.priority);

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
      className={`flex md:flex-col lg:flex-row justify-between gap-2 lg:items-center bg-white p-2 mt-2 ${isEditing ? "cursor-default" : "cursor-grab"} rounded-md`}
      ref = {isEditing ? undefined : dragRef}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <div>
        <div className="flex items-center gap-2">
          {isEditing ? (
            <div className="flex items-center gap-2">
              <input
                type="text"
                className="border border-gray-200 pl-1 pr-1"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
              />
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
          ) : (
            <div className='flex items-center gap-2'>
              <p>
                {priorityMap[task.priority]} {task.title}
              </p>
              <FaRegEdit
                className="cursor-pointer"
                onClick={() => setIsEditing(true)}
              />
            </div>
          )}
        </div>
        <div>
          {isEditing ? (
            <textarea
              className="border border-gray-200 pl-1 pr-1 mt-1 resize-none h-auto"
              rows="2"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
            />
          ) : (
            <p className="text-sm text-gray-500">{task.description}</p>
          )}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <MdOutlineDelete
          className={`text-lg text-red-500 cursor-pointer bg-grey-200 border-black ${
            isEditing ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={isEditing ? undefined : () => deleteTask(task._id)}
        />
        {isEditing ? (
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
        ) : (
          <select
            className="p-1 rounded-md bg-gray-200"
            value={task.status}
            onChange={(e) => updateTaskStatus(task._id, e.target.value)}
          >
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        )}
      </div>
    </div>
  );
};

export default Task