import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import DropdownComponent from "./Dropdown";
import { TaskContext } from "@/app/(tabs)/_layout";
import { addTask } from "@/services/api";
import FontAwesome6 from "@react-native-vector-icons/fontawesome6";

function AddTaskButton({ status }: { status: "todo" | "in-progress" | "completed" }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<"low" | "medium" | "high">("low");
  const [dueDate, setDueDate] = useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const taskContext = useContext(TaskContext);
  if (!taskContext) return null;
  const { setTasks } = taskContext;

  const priorityItems = [
    { label: "Low", value: "low" },
    { label: "Medium", value: "medium" },
    { label: "High", value: "high" },
  ];

  const handleAddTask = async () => {
    if (!title.trim()) {
      Alert.alert("Error", "Please enter a task title");
      return;
    }

    try {

      const createdTask = await addTask(title.trim(), description.trim(), status, priority, dueDate);

      // Update local state
      console.log("Created task from backend:", createdTask);
      setTasks(createdTask);

      // Reset form and close modal
      setTitle("");
      setDescription("");
      setPriority("medium");
      setDueDate(new Date());
      setModalVisible(false);

      Alert.alert("Success", "Task added successfully!");
    } catch (error) {
      console.error("Failed to add task:", error);
      Alert.alert("Error", "Failed to add task. Please try again.");
    }
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDueDate(selectedDate);
    }
  };

  return (
    <>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        className="flex items-center justify-center"
      >
        <Text className="text-4xl font-bold bg-blue-500 text-white rounded-full w-10 h-10 text-center">
          +
        </Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-black/50">
          <View className="bg-white rounded-lg p-6 w-11/12 gap-4 max-w-md">
            {/* Header */}
            <View className="flex-row justify-between items-center ">
              <Text className="text-xl font-bold text-black">Add New Task</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <FontAwesome6 name="circle-xmark" size={24} color="#666" />
              </TouchableOpacity>
            </View>

            {/* Title Input */}
            <View className="">
              <Text className="text-sm font-medium text-gray-700 mb-2">
                Title *
              </Text>
              <TextInput
                className="border border-gray-300 rounded-lg p-3 text-black"
                placeholder="Enter task title"
                value={title}
                onChangeText={setTitle}
                multiline={false}
              />
            </View>

            {/* Description Input */}
            <View className="">
              <Text className="text-sm font-medium text-gray-700 mb-2">
                Description
              </Text>
              <TextInput
                className="border border-gray-300 rounded-lg p-3 text-black"
                placeholder="Enter task description"
                value={description}
                onChangeText={setDescription}
                multiline={true}
                numberOfLines={3}
                style={{ height: 80, textAlignVertical: "top" }}
              />
            </View>

            {/* Priority Dropdown */}
            <View className="flex-row justify-between">
              <View className="w-1/2">
                <Text className="text-sm font-medium text-gray-700 mb-2">
                  Priority
                </Text>
                <DropdownComponent
                  items={priorityItems}
                  value={priority}
                  onChangeFunction={(item) =>
                    setPriority(item.value as "low" | "medium" | "high")
                  }
                  placeholder="Select priority"
                />
              </View>

              {/* Due Date */}
              <View className="w-1/2">
                <Text className="text-sm font-medium text-gray-700 mb-2">
                  Due Date
                </Text>
                <View
                  // onPress={() => setShowDatePicker(true)}
                  className="border border-gray-300 rounded-lg p-1 flex-row justify-between items-center"
                >
                  {/* <Text className="text-black">
                  {dueDate.toLocaleDateString()}
                </Text> */}
                  <DateTimePicker
                    value={dueDate}
                    mode="date"
                    display="default"
                    onChange={handleDateChange}
                    minimumDate={new Date()}
                  />
                  <FontAwesome6 name="calendar" size={16} color="#666" />
                </View>

                {/* {showDatePicker && (
                <DateTimePicker
                  value={dueDate}
                  mode="date"
                  display="default"
                  onChange={handleDateChange}
                  minimumDate={new Date()}
                />
              )} */}
              </View>
            </View>

            {/* Action Buttons */}
            <View className="flex-row justify-end gap-3">
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                className="bg-gray-200 px-4 py-2 rounded-lg"
              >
                <Text className="text-gray-700 font-medium">Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleAddTask}
                className="bg-blue-500 px-4 py-2 rounded-lg"
              >
                <Text className="text-white font-medium">Add Task</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

export default AddTaskButton;
