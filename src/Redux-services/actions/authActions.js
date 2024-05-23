import axios from "axios";
const jsonToFormData = (data) => {
  const formData = new FormData();
  for (let key in data) {
    if (data[key] !== null || data[key] !== undefined) {
      formData.append(key, data[key]);
    }
  }
  return formData;
};
export const login = (credentials, userId) => async (dispatch) => {
  try {
    const res = await axios.post(
      "https://developmentapi.videocrypt.in/data_model/users/login_auth",
      jsonToFormData(credentials),
      {
        headers: {
          Userid: userId,
          Version: 1998,
          Lang: 1,
          Devicetype: 4,
          Appid: 427,
        },
      }
    );
    if (res.status) {
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    }
  } catch (error) {
    dispatch({ type: "LOGIN_FAIL", payload: error.response.data.message });
  }
};

export const signup = (userData) => async (dispatch) => {
  try {
    const res = await axios.post(
      "https://developmentapi.videocrypt.in/data_model/users/registration",
      jsonToFormData(userData),
      {
        headers: {
          Version: 1998,
          Lang: 1,
          Devicetype: 4,
          Appid: 427,
        },
      }
    );
    console.log(res.data);
    dispatch({ type: "SIGNUP_SUCCESS", payload: res.data });
  } catch (error) {
    dispatch({ type: "SIGNUP_FAIL", payload: error.response.data.message });
  }
};
export const sendOtp = (phoneDetails) => async (dispatch) => {
  try {
    await axios.post(
      "https://developmentapi.videocrypt.in/data_model/users/send_verification_otp",
      jsonToFormData(phoneDetails),
      {
        headers: {
          Version: 1998,
          Lang: 1,
          Devicetype: 4,
          Appid: 427,
        },
      }
    );
  } catch (error) {
    dispatch({ type: "SIGNUP_FAIL", payload: error.response.data.message });
  }
};
export const logout = (userId) => async (dispatch) => {
  await axios.post(
    "https://developmentapi.videocrypt.in/data_model/users/logout",
    {
      headers: {
        Userid: userId,
        Version: 1998,
        Lang: 1,
        Devicetype: 4,
        Appid: 427,
      },
    }
  );
  dispatch({ type: "LOGOUT" });
};
