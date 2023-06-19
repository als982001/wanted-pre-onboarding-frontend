import { useEffect, useState } from "react";
import styled from "styled-components";
import {
  createTodo,
  deleteTodo,
  getTodos,
  updateTodo,
} from "../Utils/TodoFunctions";

const Wrapper = styled.main`
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.main`
  margin-top: 50px;
  width: 500px;
  min-height: 500px;
  border: 2px solid black;
  border-radius: 20px;
  display: grid;
  grid-template-rows: 1fr 1fr 6fr 1fr;
`;

const Title = styled.h2`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  font-weight: bold;
`;

const ToDos = styled.div`
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

const Form = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Input = styled.input`
  width: 300px;
  height: 30px;
`;

const SubmitButton = styled.button`
  margin-left: 20px;
  width: 100px;
  height: 30px;
`;

const Logout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-weight: bold;

  & span {
    cursor: pointer;
  }
`;

export default function AllToDo() {
  let accessToken = JSON.parse(localStorage.getItem("accessToken"));

  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [updateIdx, setUpdateIdx] = useState(-1);
  const [updateContent, setUpdateContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleNewTodo = async (event) => {
    event.preventDefault();

    const result = await createTodo(accessToken, newTodo);

    if (result) {
      setTodos((prev) => [...prev, result]);
    }

    setNewTodo((prev) => "");

    return;
  };

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

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    window.location.href = "/";
    return;
  };

  useEffect(() => {
    if (accessToken === null) {
      window.location.href = "/signin";
    }

    (async () => {
      setIsLoading((prev) => true);

      const result = await getTodos(accessToken);

      setTodos((prev) => [...result]);

      setIsLoading((prev) => false);
    })();
  }, []);

  return (
    <Wrapper>
      <Container>
        <Title>Todos</Title>
        <Form onSubmit={handleNewTodo}>
          <Input
            value={newTodo}
            onChange={(event) => setNewTodo((prev) => event.target.value)}
            data-testid="new-todo-input"
          />
          <SubmitButton data-testid="new-todo-add-button">추가</SubmitButton>
        </Form>
        {isLoading ? (
          <h1>Loading...</h1>
        ) : (
          <ToDos>
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
                          handleUpdate(
                            todo.id,
                            updateContent,
                            todo.isCompleted
                          );
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
                          handleUpdate(
                            todo.id,
                            todo.todo,
                            event.target.checked
                          );
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
          </ToDos>
        )}
        <Logout>
          <span onClick={handleLogout}>로그아웃하기...</span>
        </Logout>
      </Container>
    </Wrapper>
  );
}
