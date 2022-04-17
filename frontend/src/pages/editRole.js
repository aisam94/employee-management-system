import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { editRole, listRoles } from "../actions/rolesActions";
import { ArrowNarrowLeftIcon } from "@heroicons/react/solid";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";

const EditRole = () => {
  const navigate = useNavigate();
  const rolesList = useSelector((state) => state.rolesList);
  const { loading, error, roles } = rolesList;
  const params = useParams();
  const role = roles.find((role) => role._id === params.id);

  const [formData, setFormData] = useState({
    // name: role.name,
    name: "",
  });
  const { name } = formData;

  const dispatch = useDispatch();

  const change = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const submit = (event) => {
    event.preventDefault();
    dispatch(
      editRole({
        name,
        id: params.id,
      })
    );
    createNotification("success");
  };

  const createNotification = (message) => {
    switch (message) {
      case "success":
        return NotificationManager.success("Role details updated.", "", 500);
        break;
    }
  };

  async function getRole() {
    await dispatch(listRoles());
    setFormData({ name: role.name });
  }

  useEffect(() => {
    // dispatch(listRoles());
    getRole();
  }, [dispatch]);

  return (
    <>
      <NotificationContainer />
      <button
        className="bg-purple-500 hover:bg-purple-600 text-white p-2 m-2 flex items-center space-x-2"
        onClick={() => {
          navigate("/roles");
        }}
      >
        <ArrowNarrowLeftIcon className="w-4 h-4" />
        <span>Go back</span>
      </button>
      <main className="flex flex-col items-center justify-center  space-y-5 pt-4 mt-8">
        <h1 className="text-3xl font-bold">Update Role</h1>

        {/* Form */}
        <form className="flex flex-col" onSubmit={(event) => submit(event)}>
          {/*Input Form*/}
          <div className="flex flex-col space-y-8 mb-5">
            {/*Name*/}
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={name}
              className="px-2 py-1 border border-gray-300 appearance-none focus:outline-none focus:border-indigo-500 shadow"
              onChange={(event) => change(event)}
              required
            />
          </div>

          {/* Update button */}
          <input
            type="submit"
            value="UPDATE"
            className="py-2 text-white bg-purple-700  hover:bg-purple-800"
          />
        </form>
      </main>
    </>
  );
};

export default EditRole;
