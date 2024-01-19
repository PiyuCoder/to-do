import axios from "axios";

const url = process.env.REACT_APP_API_URL || "http://localhost:8000";

export const loginUser = async (email, password) => {
  try {
    const res = await axios.post(`${url}/api/users/login`, {
      email,
      password,
    });
    return res;
  } catch (error) {
    return error.response;
  }
};

export const registerUser = async (name, email, password) => {
  try {
    const res = await axios.post(`${url}/api/users/register`, {
      name,
      email,
      password,
    });
    return res;
  } catch (error) {
    return error.response;
  }
};

export const getUserData = async (token) => {
  try {
    const response = await axios.get(`${url}/api/todo/dashboard`, {
      headers: {
        jwt: token,
      },
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

export const getAllTaskData = async (taskIds, token) => {
  try {
    const response = await axios.get(
      `${url}/api/todo/dashboard/tasks?taskIds=${taskIds.join(",")}`,
      {
        headers: {
          jwt: token,
        },
      }
    );
    return response;
  } catch (error) {
    return error.response;
  }
};

export const saveTask = async (task, category, token) => {
  try {
    const response = await axios.post(
      `${url}/api/todo/dashboard?jwt=${token}`,
      {
        task,
        category,
      }
    );
    return response;
  } catch (error) {
    return error.response;
  }
};

export const deleteAllTask = async (token) => {
  console.log("this is my id: ", token);
  try {
    const response = await axios.delete(`${url}/api/todo/dashboard`, {
      headers: {
        jwt: token,
      },
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

export const deleteSingleTask = async (token, taskId) => {
  try {
    const response = await axios.delete(
      `${url}/api/todo/dashboard/single?taskId=${taskId}`,
      {
        headers: {
          jwt: token,
        },
      }
    );
    return response;
  } catch (error) {
    return error.response;
  }
};

export const updateTaskStatus = async (taskId, token) => {
  try {
    const response = await axios.patch(
      `${url}/api/todo/dashboard/status?taskId=${taskId}&jwt=${token}`
    );
    return response;
  } catch (error) {
    return error.response;
  }
};

export const updateTaskData = async (task, category, taskId, token) => {
  try {
    const response = await axios.put(
      `${url}/api/todo/dashboard/update?taskId=${taskId}&jwt=${token}`,
      { task, category }
    );
    return response;
  } catch (error) {
    return error.response;
  }
};
