import axios from "axios";

const API_PATH = "https://www.pre-onboarding-selection-task.shop/";

export const postNewAccount = async (email, password) => {
  try {
    const response = await axios.post(
      `${API_PATH}auth/signup`,
      {
        email,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const handleLogin = async (email, password) => {
  try {
    const response = await axios.post(
      `${API_PATH}auth/signin`,
      { email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const accessToken = response.data.access_token;

    return accessToken;
  } catch (error) {
    console.log(error);
    return null;
  }
};
