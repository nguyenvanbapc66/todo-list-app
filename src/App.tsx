import React from "react";
import { TodoList } from "./components";
import { styles } from "./constants";

const App: React.FC = () => {
  return (
    <div className="bg-[#100804] h-screen flex justify-center items-center">
      <div
        className="w-3/4 min-h-[50%] text-white bg-[#8758ff] rounded-lg px-10 py-4"
        style={styles}
      >
        <TodoList />
      </div>
    </div>
  );
};

export default App;
