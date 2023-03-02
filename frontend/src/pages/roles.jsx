import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { listRoles, deleteRole } from "../actions/rolesActions";
import { addRole } from "../actions/rolesActions";
import Loading from "../components/loading";

const Roles = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const rolesList = useSelector((state) => state.rolesList);
  const { loading, error, roles } = rolesList;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [roleInput, setRoleInput] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);

  const change = (event) => {
    setRoleInput(event.target.value);
  };

  async function submit(event) {
    event.preventDefault();
    await dispatch(addRole({ name: roleInput }));
    setRoleInput("");
    setIsSubmit(true);
  }

  async function deleteItem(role) {
    // event.preventDefault();
    await dispatch(deleteRole(role._id));
    setIsSubmit(true);
  }

  useEffect(() => {
    dispatch(listRoles());
    setIsSubmit(false);
  }, [dispatch, isSubmit]);

  return (
    <div className="mb-12">
      <main className="flex flex-col items-center">
        <h2 className="text-center text-base md:text-lg font-bold mt-4">
          Roles List
        </h2>

        <form
          id="roleInputForm"
          className="flex items-center"
          onSubmit={submit}
        >
          <input
            type="text"
            aria-label="Enter new role"
            placeholder="Enter new role..."
            className="text-sm md:text-base w-full p-1 m-2 bg-gray border border-gray outline-none text-center"
            value={roleInput}
            onChange={change}
          />
          <button type="submit" form="roleInputForm">
            <img
              className="h-8 w-8 bg-secondary hover:bg-secondary-focus text-white p-1"
              src="/icons/plus.svg"
              onClick={submit}
            />
          </button>
        </form>

        <table className="border-collapse shadow w-2/3 md:w-1/2">
          <thead>
            <tr className="text-sm md:text-lg text-white bg-primary">
              <th>Roles Name</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>

          <tbody className="text-sm md:text-base">
            {loading ? (
              <tr>
                <td className="text-center" colSpan="2">
                  <Loading />
                </td>
              </tr>
            ) : (
              roles.map((role, index) => (
                <tr
                  key={index}
                  className="odd:bg-white even:bg-gray hover:bg-primary-light text-md"
                >
                  <td className="text-center">{role.name}</td>
                  <td className="flex justify-around items-center ">
                    {/* Edit */}
                    <NavLink
                      className="flex items-center justify-center bg-secondary text-white w-1/2 font-normal hover:bg-secondary-focus text-center"
                      to={`/editrole/${role._id}`}
                    >
                      <img className="h-5 w-5" src="/icons/edit-pencil.svg" />
                    </NavLink>
                    {/* Delete */}
                    <button
                      className="flex items-center justify-center bg-red text-white w-1/2 font-normal hover:bg-red-focus"
                      onClick={() => {
                        deleteItem(role);
                      }}
                    >
                      <img className="h-5 w-5" src="/icons/cross.svg" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default Roles;
