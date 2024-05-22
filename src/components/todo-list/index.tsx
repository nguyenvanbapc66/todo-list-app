import React, { useMemo, useState } from "react";
import TodoItem from "../todo-item";
import { TodoDataType, initTodoData } from "src/constants";

type TodoItemListType = {
  title: string;
  variant: "default" | "success" | "error";
  data: TodoDataType[];
}[];

const TodoList: React.FC = () => {
  const [todoData, setTodoData] = useState<TodoDataType[]>(initTodoData);
  const [taskValue, setTaskValue] = useState<string>("");

  const openTodoData = useMemo(
    () => todoData.filter((item) => item.status === "open"),
    [todoData]
  );
  const completedTodoData = useMemo(
    () => todoData.filter((item) => item.status === "completed"),
    [todoData]
  );
  const pendingTodoData = useMemo(
    () => todoData.filter((item) => item.status === "pending"),
    [todoData]
  );

  const todoItemList: TodoItemListType = [
    {
      title: "Open",
      variant: "default",
      data: openTodoData,
    },
    {
      title: "Completed",
      variant: "success",
      data: completedTodoData,
    },
    {
      title: "Pending",
      variant: "error",
      data: pendingTodoData,
    },
  ];

  const handleAddTask = () => {
    if (!taskValue) return;

    const newTask: TodoDataType = {
      id: todoData.length + 1,
      name: taskValue,
      status: "open",
      isEdit: false,
    };
    const newTodoData = [...todoData, newTask];

    setTodoData(newTodoData);
    setTaskValue("");
  };

  return (
    <>
      <h1 className="text-3xl text-center font-bold">Todo List</h1>
      <hr className="my-2" />
      <div className="flex justify-center">
        <input
          className="bg-[#1A1A40] focus:outline-none p-2 w-1/3 border-[#e74c3c] border placeholder:text-[#ffffff4d]"
          placeholder="What is the task today?"
          value={taskValue}
          onChange={(e) => setTaskValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleAddTask();
            }
          }}
        />
        <button
          className="bg-[#e74c3c] text-[#1A1A40] px-3"
          onClick={handleAddTask}
        >
          Add task
        </button>
      </div>
      <div className="flex justify-around gap-16 mt-6">
        {todoItemList.map((todoItem, index) => (
          <TodoItem
            key={index}
            {...todoItem}
            todoData={todoData}
            setTodoData={setTodoData}
          />
        ))}
      </div>
    </>
  );
};

export default TodoList;
