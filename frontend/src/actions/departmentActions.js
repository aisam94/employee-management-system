import axios from "axios";

export const addDepartment =
  ({ name, description, pictureUrl }) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: "DEPARTMENT_ADD_REQUEST" });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(
        "/api/department",
        {
          name: name,
          description: description,
          pictureUrl: pictureUrl,
        },
        config
      );

      dispatch({ type: "DEPARTMENT_ADD_SUCCESS", payload: data });
    } catch (error) {
      dispatch({
        type: "DEPARTMENT_ADD_FAIL",
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const listDepartments = () => async (dispatch, getState) => {
  try {
    dispatch({ type: "DEPARTMENT_LIST_REQUEST" });

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

    const { data } = await axios.get("/api/department", config);

    dispatch({ type: "DEPARTMENT_LIST_SUCCESS", payload: data });
  } catch (error) {
    dispatch({
      type: "DEPARTMENT_LIST_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteDepartment = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: "DEPARTMENT_DELETE_REQUEST" });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/department/${id}`, config);
  } catch (error) {
    dispatch({
      type: "DEPARTMENT_DELETE_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const editDepartment =
  ({ name, description, pictureUrl, id }) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: "DEPARTMENT_EDIT_REQUEST" });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put(
        `/api/department/${id}`,
        { name, description, pictureUrl },
        config
      );

      dispatch({ type: "DEPARTMENT_ADD_SUCCESS", payload: data });
    } catch (error) {
      dispatch({
        type: "DEPARTMENT_ADD_FAIL",
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
