import { View, Text, ImageBackground, Image, ActivityIndicator } from 'react-native'
import React, { createContext, useEffect, useState } from 'react'
import { Tabs } from 'expo-router'
import { images } from '@/constants/images';
import { fetchTasks } from '@/services/api';
import FontAwesome6 from "@react-native-vector-icons/fontawesome6";
import DropdownComponent from '@/components/Dropdown';
import AddTaskButton from '@/components/AddTaskButton';

// Define the Task interface based on your schema
interface Task {
  _id: string;
  title: string;
  description?: string;
  status: 'todo' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  timestamp: Date;
  dueDate?: Date;
}

// Create TaskContext
interface TaskContextType {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  sortBy: string;
  setSortBy: React.Dispatch<React.SetStateAction<string>>;
}
export const TaskContext = createContext<TaskContextType | undefined>(undefined);

const TabIcon = ({ focused, icon, title }: any) => {
  if (focused) {
    return (
      <ImageBackground
        source={images.highlight}
        className="flex flex-row w-full flex-1 min-w-[126px] min-h-16 mt-4 justify-center items-center rounded-full overflow-hidden"
      >
        <FontAwesome6
          name={icon}
          iconStyle="solid"
          size={24}
          color={focused ? "#151312" : "#A8B5DB"}
        />
        <Text className="text-secondary text-base font-semibold ml-2">
          {title}
        </Text>
      </ImageBackground>
    );
  }
  return (
    <View className="size-full justify-center items-center mt-4 rounded-full">
      <FontAwesome6
        name={icon}
        iconStyle="solid"
        size={24}
        color={focused ? "#151312" : "#A8B5DB"}
      />
    </View>
  );
};

const _Layout = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [sortBy, setSortBy] = useState<string>("");

    const sortItems = [
      { label: "Title", value: "title" },
      { label: "Priority", value: "priority" },
      { label: "Date Created", value: "timestamp" },
      { label: "Due Date", value: "dueDate" },
    ];

    const handleSortChange = (item: { label: string; value: string }) => {
      setSortBy(item.value);
    };

    useEffect(() => {
      const loadTasks = async () => {
        setLoading(true);
        setError(null);
        try {
          const data = await fetchTasks();
          setTasks(data);
        } catch (err) {
          setError(
            "Failed to fetch tasks. Please check your backend connection."
          );
        } finally {
          setLoading(false);
        }
      };
      loadTasks();
    }, []);

  return (
    <TaskContext.Provider
      value={{ tasks, loading, error, setTasks, sortBy, setSortBy }}
    >
      <Tabs
        screenOptions={{
          tabBarStyle: {
            backgroundColor: "#fff",
            borderRadius: 50,
            marginHorizontal: 27,
            marginBottom: 36,
            height: 54,
            position: "absolute",
            overflow: "hidden",
          },
          tabBarItemStyle: {
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
          },
          tabBarShowLabel: false,
        }}
      >
        <Tabs.Screen
          name="todo"
          options={{
            headerShown: true,
            title: "Todo",
            headerTitleAlign: "left",
            tabBarIcon: ({ focused }) => (
              <TabIcon focused={focused} icon="list-check" title="Todo" />
            ),
            headerRight: () => (
              <View
                style={{
                  marginRight: 16,
                  width: 170,
                  flexDirection: "row",
                  justifyContent: "center",
                  gap: 8,
                }}
              >
                <AddTaskButton status="todo" />
                <DropdownComponent
                  items={sortItems}
                  value={sortBy}
                  onChangeFunction={handleSortChange}
                  placeholder="Sort by"
                />
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="inProgress"
          options={{
            headerShown: true,
            title: "In Progress",
            headerTitleAlign: "left",
            tabBarIcon: ({ focused }) => (
              <TabIcon
                focused={focused}
                icon="business-time"
                title="In Progress"
              />
            ),
            headerRight: () => (
              <View
                style={{
                  marginRight: 16,
                  width: 170,
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <AddTaskButton status="in-progress" />
                <DropdownComponent
                  items={sortItems}
                  value={sortBy}
                  onChangeFunction={handleSortChange}
                  placeholder="Sort by"
                />
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="completed"
          options={{
            headerShown: true,
            title: "Completed",
            headerTitleAlign: "left",
            tabBarIcon: ({ focused }) => (
              <TabIcon
                focused={focused}
                icon="circle-check"
                title="Completed"
              />
            ),
            headerRight: () => (
              <View style={{ marginRight: 16, width: 170, flexDirection: "row", alignItems: "center", gap: 8 }}>
                <AddTaskButton status="completed" />
                <DropdownComponent
                  items={sortItems}
                  value={sortBy}
                  onChangeFunction={handleSortChange}
                  placeholder="Sort by"
                />
              </View>
            ),
          }}
        />
      </Tabs>
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      {error && <Text>{error}</Text>}
    </TaskContext.Provider>
  );
}

export default _Layout