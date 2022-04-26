export const employeesListReducer = (state = { employees: [] }, action) => {
  switch (action.type) {
    case "EMPLOYEES_LIST_REQUEST":
      return { loading: true, employees: [] };
    case "EMPLOYEES_LIST_SUCCESS":
      return { loading: false, employees: action.payload };
    case "EMPLOYEES_LIST_FAIL":
      return { loading: false, employees: [], error: action.payload };
    default:
      return state;
  }
};
