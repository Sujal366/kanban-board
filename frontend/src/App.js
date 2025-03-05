import Board from "./components/Board";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
  return (
    <div className="dark:bg-gray-800 h-screen overflow-y-auto bg-blue-200">
      <h1 className="mt-4 ml-4 text-4xl font-bold pb-2 dark:text-white">Task Manager</h1>
      <DndProvider backend={HTML5Backend}>
        <Board />
      </DndProvider>
    </div>
  );
}

export default App;
