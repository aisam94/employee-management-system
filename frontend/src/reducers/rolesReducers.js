export const rolesListReducer = (state = { roles: [] }, action) => {
  switch (action.type) {
    case "ROLE_LIST_REQUEST":
      return { loading: true, roles: [] };
    case "ROLE_LIST_SUCCESS":
      return { loading: false, roles: action.payload };
    case "ROLE_LIST_FAIL":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const rolesAddReducer = (state = { roles: [] }, action) => {
  switch (action.type) {
    case "ROLE_ADD_REQUEST":
      return { loading: true, roles: [] };
    case "ROLE_ADD_SUCCESS":
      return { loading: false, roles: action.payload };
    case "ROLE_ADD_FAIL":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
