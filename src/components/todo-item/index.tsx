import React, { useCallback, useState } from "react";
import { variantConfig } from "./constants";
import { TodoDataType, styles } from "src/constants";
import StyledButton from "../button";
import { BurgerIcon, EditIcon } from "src/icons";

export type TodoItemPropsType = {
  title: string;
  variant: "default" | "success" | "error";
  data: TodoDataType[];
  todoData: TodoDataType[];
  setTodoData: (_payload: TodoDataType[]) => void;
};

const ENABLE_DRAG_DROP = false;

const TodoItem: React.FC<TodoItemPropsType> = ({
  title,
  variant = "default",
  data,
  todoData,
  setTodoData,
}) => {
  const [editedValue, setEditedValue] = useState("");
  const [draggedItem, setDraggedItem] = useState<TodoDataType>(
    {} as TodoDataType
  );
  const [filteredTodoData, setFilteredTodoData] =
    useState<TodoDataType[]>(data);

  const { color, borderColor } = variantConfig[variant];

  const renderActionButton = (item: TodoDataType) => {
    if (item.status === "open") {
      return (
        <>
          <StyledButton
            variant="success"
            onClick={() => changeTaskStatus("completed", item)}
          >
            Completed
          </StyledButton>
          <StyledButton
            variant="error"
            onClick={() => changeTaskStatus("pending", item)}
          >
            Pending
          </StyledButton>
        </>
      );
    }
    if (item.status === "completed") {
      return (
        <>
          <StyledButton
            variant="default"
            onClick={() => changeTaskStatus("open", item)}
          >
            Open
          </StyledButton>
          <StyledButton
            variant="error"
            onClick={() => changeTaskStatus("pending", item)}
          >
            Pending
          </StyledButton>
        </>
      );
    }
    if (item.status === "pending") {
      return (
        <>
          <StyledButton
            variant="default"
            onClick={() => changeTaskStatus("open", item)}
          >
            Open
          </StyledButton>
          <StyledButton
            variant="success"
            onClick={() => changeTaskStatus("completed", item)}
          >
            Completed
          </StyledButton>
        </>
      );
    }
  };

  const changeTaskStatus = useCallback(
    (newStatus: "open" | "completed" | "pending", item: TodoDataType) => {
      console.log(item);
      const newItem: TodoDataType = { ...item, status: newStatus };
      const newTodoData = todoData.filter((todo) => todo.id !== item.id);
      newTodoData.push(newItem);

      setTodoData(newTodoData);
    },
    [setTodoData, todoData]
  );

  const handleEditTask = useCallback(
    (id: number) => {
      const newTodoData = todoData.map((todo) => {
        if (todo.id === id) {
          setEditedValue(todo.name);
          return {
            ...todo,
            isEdit: !todo.isEdit,
          } as TodoDataType;
        }

        return todo;
      });

      setTodoData(newTodoData);
    },
    [setTodoData, todoData]
  );

  const handleEnterToUpdateText = useCallback(
    (id: number) => {
      const newTodoData = todoData.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            isEdit: !todo.isEdit,
            name: editedValue,
          } as TodoDataType;
        }

        return todo;
      });

      setTodoData(newTodoData);
    },
    [editedValue, setTodoData, todoData]
  );

  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    index: number
  ) => {
    setDraggedItem(filteredTodoData[index]);
    e.dataTransfer.effectAllowed = "move";
    //@ts-ignore
    e.dataTransfer.setData("text/html", e.target.parentNode.parentNode);
    //@ts-ignore
    e.dataTransfer.setDragImage(e.target.parentNode.parentNode, 20, 20);
  };

  const handleDragOver = (index: number) => {
    const draggedOverItem = filteredTodoData[index];

    if (
      draggedOverItem.id === draggedItem?.id ||
      draggedOverItem.status !== draggedItem.status
    ) {
      return;
    }

    const newItems = filteredTodoData.filter(
      (item) => item.id !== draggedItem?.id
    );
    newItems.splice(index, 0, draggedItem);
    setFilteredTodoData(newItems);
  };

  return (
    <div
      className="bg-[#1A1A40] w-1/3 min-h-24 h-fit rounded-lg pt-3"
      style={styles}
    >
      <p className="px-5 pb-1 font-bold" style={{ color }}>
        {title}
      </p>
      <hr style={{ borderColor }} />
      <div className="mt-3 mx-5">
        {(ENABLE_DRAG_DROP ? filteredTodoData : data).map((item, index) => (
          <div
            className="bg-[#8758ff] mb-3 px-4 py-2 rounded-md flex justify-between items-end"
            style={styles}
            key={`${item.id}-${index}`}
            onDragOver={() => handleDragOver(index)}
          >
            <div className="flex gap-1 items-end">
              {ENABLE_DRAG_DROP && (
                <div draggable onDragStart={(e) => handleDragStart(e, index)}>
                  <BurgerIcon width={18} className="pointer-events-none" />
                </div>
              )}
              {item.isEdit ? (
                <div>
                  <p className="text-[#1A1A40] font-semibold text-xs pb-1">
                    Press enter to update
                  </p>
                  <input
                    className="rounded-md bg-[#1A1A40] focus:outline-none p-1 text-sm"
                    value={editedValue}
                    onChange={(e) => setEditedValue(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleEnterToUpdateText(item.id);
                      }
                    }}
                  />
                </div>
              ) : (
                <p className="font-medium select-none">{item.name}</p>
              )}
            </div>
            <div className="flex gap-1">
              {renderActionButton(item)}
              <EditIcon
                className="cursor-pointer"
                width={18}
                onClick={() => handleEditTask(item.id)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoItem;
