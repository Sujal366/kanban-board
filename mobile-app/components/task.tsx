import FontAwesome6 from "@react-native-vector-icons/fontawesome6";
import React, { useState, useContext } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { updateTaskStatus, updateTaskDetails, deleteTask } from "@/services/api";
import DropdownComponent from "./Dropdown";
import DateTimePicker from "@react-native-community/datetimepicker";
import { TaskContext } from "@/app/(tabs)/_layout";

type Priority = "low" | "medium" | "high";

interface TaskType {
  _id: string;
  title: string;
  description: string;
  priority: Priority;
  dueDate: string;
  timestamp: string;
  status: string;
}

const Task = ({ task }: { task: TaskType }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(task.title);
  const [newDescription, setNewDescription] = useState(task.description);
  const [newPriority, setNewPriority] = useState<Priority>(task.priority);
  const [newDueDate, setNewDueDate] = useState(task.dueDate);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [statusValue, setStatusValue] = useState<string | null>(null);
  const date = new Date();

  const taskContext = useContext(TaskContext);
    if (!taskContext) {
      throw new Error("DropdownComponent must be used within TaskContext");
    }
    const { setTasks } = taskContext;

  const statusOnChangeFunction = async (item) => {
    setStatusValue(item.value);
    try {
      await updateTaskStatus(task._id, item.value, date);

      // Update local state immediately after successful API call
      setTasks((prevTasks) =>
        prevTasks.map((t) =>
          t._id === task._id ? { ...t, status: item.value, timestamp: date } : t
        )
      );
    } catch (error) {
      console.error("Failed to update task status:", error);
      // Optionally revert the UI change
    }
  };

    const handleSave = () => {
      if (newTitle === "") {
        alert("Task title cannot be empty");
        return;
      }
      const newTimestamp =
        task.title === newTitle &&
        task.description === newDescription &&
        task.priority === newPriority
          ? task.timestamp
          : date;
      updateTaskDetails(
        task._id,
        newTitle,
        newDescription,
        newPriority,
        newTimestamp,
        newDueDate
      );
      setTasks((prevTasks) =>{
        return prevTasks.map((t) =>
          t._id === task._id
            ? {
                ...t,
                title: newTitle,
                description: newDescription ?? t.description,
                priority: newPriority,
                dueDate: newDueDate ?? t.dueDate,
                timestamp: newTimestamp,
              }
            : t
        )
      });
      setIsEditing(false);
    };

    const handleDelete = (id) => {
      deleteTask(id);
      setTasks((prevTasks) => prevTasks.filter((t) => t._id !== id));
      setConfirmDelete(false);
    }

  const priorityMap = {
    low: "🟢",
    medium: "🟡",
    high: "🔴",
  };

  return (
    <TouchableOpacity
      className={`p-2 ${isEditing ? "cursor-default" : "cursor-grab"} ${
        confirmDelete ? "bg-red-200 border border-red-500" : "bg-white"
      } rounded-md ${
        task.status !== "completed" && new Date(task.dueDate) < new Date()
          ? "border border-red-500 bg-red-100"
          : ""
      } `}
      //   ref={isEditing ? undefined : dragRef}
      //   style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      {!confirmDelete ? (
        isEditing ? (
          <View className="flex justify-between gap-4 flex-col xl:flex-row">
            <View className="flex items-center gap-2 flex-col xl:flex-row">
              <View className="flex flex-col gap-2 w-full">
                <View>
                  <Text className="text-sm">Title:</Text>
                  <TextInput
                    className="border border-gray-200 pl-1 pr-1"
                    value={newTitle}
                    onChangeText={(e) => setNewTitle(e)}
                  />
                </View>
              <View>
                <Text className="text-sm">Description:</Text>
                <TextInput
                  className="border border-gray-200 pl-1 pr-1 mt-1 resize-none h-auto"
                  multiline
                  numberOfLines={2}
                  value={newDescription}
                  onChangeText={(e) => setNewDescription(e)}
                />
              </View>
              </View>
              <View className="flex-row justify-between xl:flex-col w-full">
                <View className="flex flex-col justify-start">
                  <Text className="text-sm">Due Date:</Text>
                  <DateTimePicker
                    value={newDueDate ? new Date(newDueDate) : new Date()}
                    mode="date"
                    display="default"
                    onChange={(e, selectedDate) => {
                      const currentDate = selectedDate || new Date();
                      setNewDueDate(currentDate.toISOString());
                    }}
                  />
                </View>
                <View>
                  <Text className="text-sm">Priority:</Text>
                  <DropdownComponent
                    items={[
                      { label: "Low", value: "low" },
                      { label: "Medium", value: "medium" },
                      { label: "High", value: "high" },
                    ]}
                    value={task.priority}
                    onChangeFunction={(item) =>
                      setNewPriority(item.value as Priority)
                    }
                    placeholder="Select Priority"
                  />
                </View>
              </View>
            </View>
            <View className="flex-row justify-center items-center gap-2 w-full">
              <TouchableOpacity
                onPress={() => {
                  setIsEditing(false);
                }}
              >
                <FontAwesome6 name="circle-xmark" iconStyle="solid" size={18} />
              </TouchableOpacity>
              <TouchableOpacity
                className="border border-black pl-1 pr-1 rounded-sm bg-blue-400 text-white"
                onPress={handleSave}
              >
                <Text className="text-md">Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View className="flex flex-col gap-2">
            {task.status !== "completed" &&
            new Date(task.dueDate) < new Date() ? (
              <Text className="text-red-500 text-sm border-b border-red-500">
                Task deadline exceeded!
              </Text>
            ) : (
              ""
            )}
            <View className="flex justify-between gap-1 xl:flex-row md:flex-col">
              <Text className="text-sm text-gray-500">
                Last Updated:{" "}
                {new Date(task.timestamp).toLocaleTimeString([], {
                  year: "numeric",
                  month: "numeric",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Text>
              <Text
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
              </Text>
            </View>
            <View className="flex-row justify-between xl:items-center gap-2 md:flex-col xl:flex-row">
              <View className="flex flex-col gap-1 flex-1 pr-2">
                <View className="flex flex-row items-center gap-2">
                  <Text>
                    {priorityMap[task.priority]} {task.title}
                  </Text>
                  <TouchableOpacity onPress={() => setIsEditing(true)}>
                    <FontAwesome6 name="pen" iconStyle="solid" size={10} />
                  </TouchableOpacity>
                </View>
                <Text
                  className="text-sm text-gray-500"
                  numberOfLines={3}
                  ellipsizeMode="tail"
                >
                  {task.description}
                </Text>
              </View>
              <View className="flex-row justify-between items-center gap-2 flex-shrink-0">
                {/* <Picker
                  // className="p-1 rounded-md bg-gray-200"
                  style={{
                    backgroundColor: "#e5e7eb",
                    borderRadius: 8,
                    padding: 4,
                    width: 120,
                    height: 25,
                  }}
                  selectedValue={task.status}
                  onValueChange={(e) => updateTaskStatus(task._id, e, date)}
                >
                  <Picker.Item value="todo" label="To Do" />
                  <Picker.Item value="in-progress" label="In Progress" />
                  <Picker.Item value="completed" label="Completed" />
                </Picker> */}
                <DropdownComponent
                  items={[
                    { label: "Todo", value: "todo" },
                    { label: "In Progress", value: "in-progress" },
                    { label: "Completed", value: "completed" },
                  ]}
                  // task={task}
                  // updateTaskStatus={updateTaskStatus}
                  // statusValue={statusValue}
                  // setStatusValue={setStatusValue}
                  value={task.status}
                  onChangeFunction={statusOnChangeFunction}
                  placeholder={
                    task.status.charAt(0).toUpperCase() +
                    task.status.slice(1).replace("-", " ")
                  }
                />
                <TouchableOpacity
                  className={` ${isEditing ? "hidden" : "cursor-pointer"}`}
                  onPress={() => setConfirmDelete(true)}
                >
                  <FontAwesome6
                    name="trash-can"
                    iconStyle="regular"
                    size={15}
                    color="red"
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )
      ) : (
        <View className="flex flex-col items-center gap-2 h-20 justify-center">
          <Text>Are you sure you want to delete this task?</Text>
          <View className="flex-row gap-2">
            <TouchableOpacity
              className="border border-black pl-1 pr-1 rounded-sm bg-red-400 text-white"
              onPress={() => handleDelete(task._id)}
            >
              <Text>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="border border-black pl-1 pr-1 rounded-sm bg-blue-400 text-white"
              onPress={() => setConfirmDelete(false)}
            >
              <Text>No</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default Task;
