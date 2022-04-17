import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import {
  listDepartments,
  deleteDepartment,
} from "../actions/departmentActions";
import { PlusIcon } from "@heroicons/react/solid";

const Department = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const departmentList = useSelector((state) => state.departmentList);
  const { loading, error, departments } = departmentList;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [isRefresh, setIsRefresh] = useState(false);

  async function deleteItem(department) {
    await dispatch(deleteDepartment(department._id));
    setIsRefresh(true);
  }

  useEffect(() => {
    dispatch(listDepartments());
    setIsRefresh(false);
  }, [dispatch, isRefresh]);

  return (
    <>
      <main className="flex flex-col items-center">
        <h2 className="text-center text-lg font-bold mt-4">Department List</h2>

        <div>
          <button
            className="bg-purple-400 text-white p-1 m-2 ml-4 shadow flex items-center justify-center hover:bg-purple-600"
            onClick={() => {
              navigate("/adddepartment");
            }}
          >
            <PlusIcon className="h-5 w-5 " />
            <span>Add Department</span>
          </button>
        </div>

        <table className="border-collapse shadow w-full ">
          <thead>
            <tr className="text-lg text-white bg-purple-400  text-left">
              <th>Department</th>
              <th>Description</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {departments.map((department, index) => (
              <tr
                key={index}
                className="font-thin odd:bg-white even:bg-gray-200 hover:bg-purple-50 text-md text-left "
              >
                <th className="flex items-center">
                  <img src={department.pictureUrl} className="h-10 w-10 mx-3" />
                  <span>{department.name}</span>
                </th>
                <th>{department.description}</th>
                <th className="">
                  <div className="flex">
                    <NavLink
                      className="bg-purple-500 text-white w-1/2 font-normal hover:bg-purple-600 text-center"
                      to={`/editdepartment/${department._id}`}
                    >
                      Edit
                    </NavLink>
                    <button
                      className="bg-red-500 text-white w-1/2 font-normal hover:bg-red-600"
                      onClick={() => {
                        deleteItem(department);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </>
  );
};

export default Department;
