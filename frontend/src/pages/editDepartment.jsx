import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { editDepartment } from "../actions/departmentActions";
import { listDepartments } from "../actions/departmentActions";

const EditDepartment = () => {
  const navigate = useNavigate();
  const departmentList = useSelector((state) => state.departmentList);
  const { loading, error, departments } = departmentList;
  const params = useParams();
  const department = departments.find(
    (department) => department._id === params.id
  );

  const [formData, setFormData] = useState({
    name: department.name,
    description: department.description,
    pictureUrl: department.pictureUrl,
  });
  const { name, description, pictureUrl } = formData;

  const dispatch = useDispatch();

  const change = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const submit = (event) => {
    event.preventDefault();
    dispatch(
      editDepartment({
        name,
        description,
        pictureUrl,
        id: params.id,
      })
    );
  };

  // useEffect(() => {
  //   dispatch(listDepartments());
  // }, [dispatch]);

  return (
    <div className="mb-12">
      <button
        className="bg-purple-500 hover:bg-purple-600 text-white p-2 m-2 flex items-center space-x-2"
        onClick={() => {
          navigate("/department");
        }}
      >
        <img className="w-4 h-4" src="/icons/arrow-left.svg"/>
        <span>Go back</span>
      </button>
      <main className="flex flex-col items-center justify-center  space-y-5 pt-4 mt-8">
        <h1 className="text-3xl font-bold">Update Department</h1>

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
              type="text"
              placeholder="Description"
              name="description"
              value={description}
              rows="10"
              cols="40"
              className="px-2 py-1 border border-gray-300 appearance-none focus:outline-none focus:border-indigo-500 shadow"
              onChange={(event) => change(event)}
            />
          </div>

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

          {/* Update button */}
          <input
            type="submit"
            value="UPDATE"
            className="py-2 text-white bg-purple-700  hover:bg-purple-800"
          />
        </form>
      </main>
    </div>
  );
};

export default EditDepartment;
