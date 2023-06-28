import styled from "styled-components";
import { updateTodo } from "../Utils/TodoFunctions";

export default function UpdateTodo({
  accessToken,
  updateContent,
  setUpdateContent,
}) {
  const handleUpdate = async (todoId, todo, isCompleted) => {
    await updateTodo(accessToken, todoId, todo, isCompleted);

    const updatedTodos = todos.map((item) => {
      if (item.id === todoId) {
        return {
          id: todoId,
          todo,
          isCompleted,
          userId: item.userId,
        };
      }

      return item;
    });

    setTodos(updatedTodos);
  };

  return (
    <>
      <div>
        <input type="checkbox" />
        <input
          value={updateContent}
          onChange={(event) => setUpdateContent((prev) => event.target.value)}
          data-testid="modify-input"
        />
      </div>
      <div>
        <button
          onClick={(event) => {
            event.preventDefault();
            handleUpdate(todo.id, updateContent, todo.isCompleted);
            setUpdateContent((prev) => "");
            setUpdateIdx((prev) => -1);
          }}
          data-testid="submit-button"
        >
          제출
        </button>
        <button
          onClick={(event) => {
            event.preventDefault();
            setUpdateIdx((prev) => -1);
            setUpdateContent((prev) => "");
          }}
          data-testid="cancel-button"
        >
          취소
        </button>
      </div>
    </>
  );
}
