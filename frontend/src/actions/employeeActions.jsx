import axios from "axios";
import API from '../api';

export const listEmployees = () => async (dispatch, getState) => {
  try {
    dispatch({ type: "EMPLOYEES_LIST_REQUEST" });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
      params: {
        company: userInfo.company,
      },
    };

    const { data } = await API.get(
      "/api/employees",
      config
    );

    dispatch({ type: "EMPLOYEES_LIST_SUCCESS", payload: data });
  } catch (error) {
    dispatch({
      type: "EMPLOYEES_LIST_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const addEmployee =
  ({ name, email, employeeId, role, department, age, pictureUrl }) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: "EMPLOYEES_ADD_REQUEST" });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await API.post(
        "/api/employees",
        {
          name: name,
          email: email,
          employeeId: employeeId,
          role: role,
          department: department,
          age: age,
          pictureUrl: pictureUrl,
        },
        config
      );

      dispatch({ type: "EMPLOYEES_ADD_SUCCESS", payload: data });
    } catch (error) {
      dispatch({
        type: "EMPLOYEES_ADD_FAIL",
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const editEmployee =
  ({ name, email, employeeId, role, department, age, id, pictureUrl }) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: "EMPLOYEES_EDIT_REQUEST" });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await API.put(
        `/api/employees/${id}`,
        {
          name: name,
          email: email,
          employeeId: employeeId,
          role: role,
          department: department,
          age: age,
          pictureUrl: pictureUrl,
        },
        config
      );

      dispatch({ type: "EMPLOYEES_ADD_SUCCESS", payload: data });
    } catch (error) {
      dispatch({
        type: "EMPLOYEES_ADD_FAIL",
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const deleteEmployee = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: "EMPLOYEES_DELETE_REQUEST" });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await API.delete(`/api/employees/${id}`, config);

    dispatch({ type: "EMPLOYEES_DELETE_SUCCESS" });
  } catch (error) {
    dispatch({
      type: "EMPLOYEES_DELETE_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
