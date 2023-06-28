import { useState } from "react";
import styled from "styled-components";
import { deleteTodo, updateTodo } from "../Utils/TodoFunctions";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  padding: 0 50px;

  & li {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
`;

export default function Todos({ todos, setTodos }) {
  let accessToken = JSON.parse(localStorage.getItem("accessToken"));

  const [updateIdx, setUpdateIdx] = useState(-1);
  const [updateContent, setUpdateContent] = useState("");

  const handleDeleteTodo = async (todoId) => {
    await deleteTodo(accessToken, todoId);

    const updatedTodos = todos.filter((todo) => todo.id !== todoId);

    setTodos(updatedTodos);
  };

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
    <Container>
      {todos.map((todo) => (
        <li key={todo.id}>
          {updateIdx === todo.id ? (
            <>
              <div>
                <input type="checkbox" />
                <input
                  value={updateContent}
                  onChange={(event) =>
                    setUpdateContent((prev) => event.target.value)
                  }
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
          ) : (
            <>
              <label>
                <input
                  type="checkbox"
                  checked={todo.isCompleted}
                  onChange={(event) => {
                    event.preventDefault();
                    handleUpdate(todo.id, todo.todo, event.target.checked);
                  }}
                />
                <span>{todo.todo}</span>
              </label>
              <div>
                <button
                  onClick={(event) => {
                    event.preventDefault();
                    setUpdateIdx((prev) => todo.id);
                    setUpdateContent((prev) => todo.todo);
                  }}
                  data-testid="modify-button"
                >
                  수정
                </button>
                <button
                  onClick={(event) => {
                    event.preventDefault();
                    handleDeleteTodo(todo.id);
                  }}
                  data-testid="delete-button"
                >
                  삭제
                </button>
              </div>
            </>
          )}
        </li>
      ))}
    </Container>
  );
}
