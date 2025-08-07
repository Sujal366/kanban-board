import axios from "axios";

// Define the Task interface for type safety
interface Task {
  _id: string;
  title: string;
  description?: string;
  status: "todo" | "in-progress" | "completed";
  priority: "low" | "medium" | "high";
  timestamp: Date;
  dueDate?: Date;
}

// API base URL for the local backend
const API_URL = "http://localhost:8080";

// Fetch tasks from the backend
export const fetchTasks = async (): Promise<Task[]> => {
  try {
    const response = await axios.get(`${API_URL}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error; // Re-throw to handle in the caller
  }
};

export const updateTaskStatus = async (
  taskId: string,
  newStatus: string,
  newTimestamp: Date
) => {
  try {
    const response = await axios.put(`${API_URL}/updateStatus/${taskId}`, {
      status: newStatus,
      newTimestamp: newTimestamp,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating task status:", error);
    throw error;
  }
};

export const updateTaskDetails = (
  taskId: string,
  newTitle: string,
  newDescription: string,
  newPriority: "low" | "medium" | "high",
  newTimestamp: Date,
  newDueDate: Date
) => {
  axios
    .put(`${API_URL}/updateDetails/${taskId}`, {
      title: newTitle,
      description: newDescription,
      priority: newPriority,
      newTimestamp: newTimestamp,
      newDueDate: newDueDate,
    })
    // .then(() => {
    //   setTasks((prevTasks) =>
    //     prevTasks.map((task) =>
    //       task._id === taskId
    //         ? {
    //             ...task,
    //             title: newTitle,
    //             description: newDescription,
    //             priority: newPriority,
    //             timestamp: newTimestamp,
    //             dueDate: newDueDate,
    //           }
    //         : task
    //     )
    //   );
    // });
};

export const addTask = async (title: string, description: string, status: "todo" | "in-progress" | "completed", priority: "low" | "medium" | "high", dueDate: Date) => {

  // Send request to backend
  try {
    await axios.post(API_URL, { title, description, status, priority, dueDate });
    // setTasks(response.data);
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error adding task:", error);
    throw error;
  }
};

export const deleteTask = (taskId: string) => {
  axios
    .delete(`${API_URL}/${taskId}`)
};

// Helper function to sort tasks; pass tasks and sortBy as arguments where you use this function
export const getSortedTasks = (
  tasks: Task[],
  sortBy: string,
  category: "todo" | "in-progress" | "completed"
): Task[] => {
  const filteredTasks = tasks.filter((task) => task.status === category);

  return filteredTasks.sort((a, b) => {
    switch (sortBy) {
      case "title":
        return a.title.localeCompare(b.title);
      case "priority":
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      case "timestamp":
        return (
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        );
      case "dueDate":
        if (!a.dueDate && !b.dueDate) return 0;
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      default:
        return 0;
    }
  });
};