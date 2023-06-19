import axios from "axios";

const API_PATH = "https://www.pre-onboarding-selection-task.shop/";

export const createTodo = async (accessToken, todo) => {
  try {
    const response = await axios.post(
      `${API_PATH}todos`,
      { todo },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getTodos = async (accessToken) => {
  try {
    const response = await axios.get(`${API_PATH}todos`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const updateTodo = async (accessToken, todoId, todo, isCompleted) => {
  try {
    const response = await axios.put(
      `${API_PATH}todos/${todoId}`,
      {
        todo,
        isCompleted,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    console.log(response);

    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const deleteTodo = async (accessToken, todoId) => {
  try {
    const response = await axios.delete(`${API_PATH}todos/${todoId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log(response);

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
