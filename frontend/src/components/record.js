import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { deleteEmployee, listEmployees } from "../actions/employeeActions";
import { PlusIcon } from "@heroicons/react/solid";

const Record = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const employeesList = useSelector((state) => state.employeesList);
  const { loading, error, employees } = employeesList;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const parseRole = (roles) => {
    let arr = [];
    for (let i = 0; i < 3; i++) {
      if (roles[i]) {
        arr.push(roles[i].name);
      }
    }
    return arr.filter(Boolean).join();
  };

  useEffect(() => {
    dispatch(listEmployees());
  }, [dispatch]);

  return (
    <>
      <main className="flex flex-col">
        <h2 className="text-center text-lg font-bold mt-4">Employee Records</h2>
        <div>
          <button
            className="bg-purple-500 text-white p-1 m-2 ml-4 shadow flex items-center justify-center hover:bg-purple-600"
            onClick={() => {
              navigate("/addemployee");
            }}
          >
            <PlusIcon className="h-5 w-5 " />
            <span>Add Employee</span>
          </button>
        </div>

        <table className="border-collapse m-4 shadow border border-slate-500">
          <thead>
            <tr className="text-lg text-white bg-purple-400 ">
              <th>Name</th>
              <th>Employee Id</th>
              <th>Role</th>
              <th>Department</th>
              <th>Age</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee, index) => (
              <tr
                key={index}
                className="font-thin odd:bg-white even:bg-gray-200 hover:bg-purple-50 text-md align-middle"
              >
                <th className="flex items-center">
                  <img src={employee.pictureUrl} className="h-10 w-10 mx-3" />
                  <span>{employee.name}</span>
                </th>
                <th>{employee.employeeId}</th>
                <th>{parseRole(employee.role)}</th>
                <th>{employee.department.name}</th>
                <th>{employee.age}</th>
                <th>{employee.email}</th>
                <th className="">
                  <div className="flex">
                    <NavLink
                      className="bg-purple-500 text-white w-1/2 font-normal hover:bg-purple-600 text-center"
                      to={`/editemployee/${employee._id}`}
                    >
                      Edit
                    </NavLink>
                    <button
                      className="bg-red-500 text-white w-1/2 font-normal hover:bg-red-600"
                      onClick={() => {
                        dispatch(deleteEmployee(employee._id));
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

export default Record;
