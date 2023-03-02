import axios from "axios";
import API from '../api';

export const addRole =
  ({ name }) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: "ROLE_ADD_REQUEST" });

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
        "/api/roles",
        {
          name: name,
        },
        config
      );

      dispatch({ type: "ROLE_ADD_SUCCESS", payload: data });
    } catch (error) {
      dispatch({
        type: "ROLE_ADD_FAIL",
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const listRoles = () => async (dispatch, getState) => {
  try {
    dispatch({ type: "ROLE_LIST_REQUEST" });

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

    const { data } = await API.get("/api/roles", config);

    dispatch({ type: "ROLE_LIST_SUCCESS", payload: data });
  } catch (error) {
    dispatch({
      type: "ROLE_LIST_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteRole = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: "ROLE_DELETE_REQUEST" });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await API.delete(`/api/roles/${id}`, config);
  } catch (error) {
    dispatch({
      type: "ROLE_DELETE_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const editRole =
  ({ name, id }) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: "ROLE_EDIT_REQUEST" });

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
        `/api/roles/${id}`,
        { name },
        config
      );

      dispatch({ type: "ROLE_ADD_SUCCESS", payload: data });
    } catch (error) {
      dispatch({
        type: "ROLE_ADD_FAIL",
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
