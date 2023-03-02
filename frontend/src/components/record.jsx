import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { deleteEmployee, listEmployees } from "../actions/employeeActions";
import Loading from "./loading";

const Record = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const employeesList = useSelector((state) => state.employeesList);
  const { loading, error, employees } = employeesList;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [isRefresh, setIsRefresh] = useState(false);

  const parseRole = (roles) => {
    let arr = [];
    for (let i = 0; i < 3; i++) {
      if (roles[i]) {
        arr.push(roles[i].name);
      }
    }
    return arr.filter(Boolean).join();
  };

  async function deleteItem(employee) {
    await dispatch(deleteEmployee(employee._id));
    setIsRefresh(true);
  }

  useEffect(() => {
    dispatch(listEmployees());
    setIsRefresh(false);
  }, [dispatch, isRefresh]);

  return (
    <div className="mb-12">
      <main className="flex flex-col items-center">
        <h2 className="text-center text-base md:text-lg font-bold mt-4">
          Employee Records
        </h2>
        <div>
          <button
            className="bg-secondary hover:bg-secondary-focus text-sm md:text-base text-white p-1 m-2 ml-4 shadow flex items-center justify-center"
            onClick={() => {
              navigate("/addemployee");
            }}
          >
            <img className="h-5 w-5" src="/icons/plus.svg"/>
            <span>Add Employee</span>
          </button>
        </div>

        <div className="overflow-x-auto md:overflow-visible w-full">
          <table className="border-collapse w-full shadow border border-slate-500">
            <thead>
              <tr className="text-sm md:text-lg text-white bg-primary text-left">
                <th>Name</th>
                <th>Employee Id</th>
                <th>Role</th>
                <th>Department</th>
                <th>Age</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="text-sm md:text-base">
              {loading ? (
                <tr>
                  <td className="text-center" colSpan="7">
                    <Loading />
                  </td>
                </tr>
              ) : (
                employees.map((employee, index) => (
                  <tr
                    key={index}
                    className="odd:bg-white even:bg-gray hover:bg-primary-light text-md align-middle"
                  >
                    <td className="flex items-center w-20">
                      <img
                        src={employee.pictureUrl}
                        className="h-2 w-2 mx-1 md:h-10 md:w-10 md:mx-3"
                      />
                      <span>{employee.name}</span>
                    </td>
                    <td>{employee.employeeId}</td>
                    <td>{parseRole(employee.role)}</td>
                    <td>{employee.department.name}</td>
                    <td>{employee.age}</td>
                    <td>{employee.email}</td>
                    <td className="">
                      <div className="flex">
                        {/* Edit */}
                        <NavLink
                          className="flex items-center justify-center bg-secondary hover:bg-secondary-focus text-white w-1/2 font-normal text-center"
                          to={`/editemployee/${employee._id}`}
                        >
                          <img className="h-5 w-5" src="/icons/edit-pencil.svg"/>
                        </NavLink>
                        {/* Delete */}
                        <button
                          className="flex items-center justify-center bg-red hover:bg-red-focus text-white w-1/2 "
                          onClick={() => {
                            deleteItem(employee);
                          }}
                        >
                          <img className="h-5 w-5" src="/icons/cross.svg"/>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default Record;
