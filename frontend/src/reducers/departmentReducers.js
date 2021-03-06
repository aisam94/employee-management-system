export const departmentListReducer = (state = { departments: [] }, action) => {
  switch (action.type) {
    case "DEPARTMENT_LIST_REQUEST":
      return { loading: true, departments: [] };
    case "DEPARTMENT_LIST_SUCCESS":
      return { loading: false, departments: action.payload };
    case "DEPARTMENT_LIST_FAIL":
      return { loading: false, departments: [], error: action.payload };
    default:
      return state;
  }
};
