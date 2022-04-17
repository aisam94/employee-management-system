import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addDepartment } from "../actions/departmentActions";
import { ArrowNarrowLeftIcon } from "@heroicons/react/solid";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";

const AddDepartment = () => {
  const navigate = useNavigate();
  const initialState = {
    name: "",
    description: "",
    pictureUrl: "",
  };
  const [formData, setFormData] = useState(initialState);
  const { name, description, pictureUrl } = formData;

  const dispatch = useDispatch();

  const change = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const submit = (event) => {
    event.preventDefault();
    dispatch(addDepartment({ name, description, pictureUrl }));
    setFormData(initialState);
    createNotification("success");
  };

  const createNotification = (message) => {
    switch (message) {
      case "success":
        return NotificationManager.success("Created a department", "", 500);
        break;
    }
  };

  return (
    <>
      <NotificationContainer />
      <button
        className="bg-purple-500 hover:bg-purple-600 text-white p-2 m-2 flex items-center space-x-2"
        onClick={() => {
          navigate("/department");
        }}
      >
        <ArrowNarrowLeftIcon className="w-4 h-4" />
        <span>Go back</span>
      </button>
      <main className="flex flex-col items-center justify-center  space-y-5 pt-4 mt-8">
        <h1 className="text-3xl font-bold">Add Department</h1>

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

            {/*Description*/}
            <textarea
              placeholder="Description"
              name="description"
              value={description}
              rows="10"
              cols="40"
              className="px-2 py-1 border border-gray-300 appearance-none focus:outline-none focus:border-indigo-500 shadow"
              onChange={(event) => change(event)}
            />

            {/* Picture */}

            <div className="flex flex-col space-y-1 ">
              <label htmlFor="file">Profile picture</label>
              <input
                type="file"
                id="file"
                placeholder="Picture"
                name="picture"
                accept="image/png, image/jpeg"
                className="px-2 py-1 border border-gray-300 appearance-none focus:outline-none focus:border-indigo-500 shadow"
              />
              <span>Or</span>
              <input
                type="text"
                placeholder="Picture URL"
                name="pictureUrl"
                value={pictureUrl}
                className="px-2 py-1 border border-gray-300 appearance-none focus:outline-none focus:border-indigo-500 shadow"
                onChange={(event) => change(event)}
              />
            </div>
          </div>

          {/* Submit button */}
          <input
            type="submit"
            value="SUBMIT"
            className="py-2 text-white bg-purple-700  hover:bg-purple-800"
          />
        </form>
      </main>
    </>
  );
};

export default AddDepartment;
