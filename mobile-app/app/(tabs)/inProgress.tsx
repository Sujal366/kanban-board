import Task from "@/components/task";
import { getSortedTasks } from "@/services/api";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { FlatList, Text, TextInput, View } from "react-native";
import { TaskContext } from "./_layout";

const InProgress = () => {
  const taskContext = useContext(TaskContext);
  if (!taskContext) return null;

  const { tasks, sortBy } = taskContext;

  const sortedTasks = useMemo(() => {
    return getSortedTasks(tasks, sortBy, "in-progress");
  }, [tasks, sortBy]);

  const [search, setSearch] = useState("");
  const [results, setResults] = useState(sortedTasks);

  const handleSearch = (text: string) => {
    setSearch(text);
    if (text.trim() === "") {
      setResults(sortedTasks);
      return;
    }
    const lowerText = text.toLowerCase();

    const filtered = sortedTasks.filter(
      (task) =>
        task.title.toLowerCase().includes(lowerText) ||
        task.description?.toLowerCase().includes(lowerText)
    );

    setResults(filtered);
  };

  useEffect(() => {
    setResults(sortedTasks);
  }, [sortedTasks]);

  return (
    <View className="flex-1 justify-center items-center">
      <FlatList
        data={results}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <Task task={item} />}
        contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text className="text-gray-500">No tasks available</Text>
        }
        ListHeaderComponent={
          <TextInput
            placeholder="Search tasks..."
            value={search}
            onChangeText={handleSearch}
            className="border border-gray-500 rounded-md p-3 text-black w-full mb-2"
          />
        }
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        className="w-full"
      />
    </View>
  );
};

export default InProgress;
