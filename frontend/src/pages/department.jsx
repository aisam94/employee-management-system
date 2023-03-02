import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import {
  listDepartments,
  deleteDepartment,
} from "../actions/departmentActions";
import Loading from "../components/loading";

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
    <div className="mb-12">
      <main className="flex flex-col items-center">
        <h2 className="text-center text-base md:text-lg font-bold mt-4">
          Department List
        </h2>
        <div>
          <button
            className="text-sm md:text-base bg-secondary hover:bg-secondary-focus text-white p-1 m-2 ml-4 shadow flex items-center justify-center"
            onClick={() => {
              navigate("/adddepartment");
            }}
          >
            <img className="h-5 w-5" src="/icons/plus.svg"/>
            <span>Add Department</span>
          </button>
        </div>

        <div className="w-full overflow-x-auto">
          <table className="border-collapse shadow w-full">
            <thead>
              <tr className="text-sm md:text-lg text-white bg-primary  text-left">
                <th>Department</th>
                <th>Description</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>

            <tbody className="text-sm md:text-base">
              {loading ? (
                <tr>
                  <td className="text-center" colSpan="3">
                    <Loading />
                  </td>
                </tr>
              ) : (
                departments.map((department, index) => (
                  <tr
                    key={index}
                    className="odd:bg-white even:bg-gray hover:bg-primary-light text-md text-left"
                  >
                    <td className="flex items-center">
                      <img
                        src={department.pictureUrl}
                        className="h-4 w-4 md:h-10 md:w-10 md:mx-3"
                      />
                      <span>{department.name}</span>
                    </td>
                    <td>{department.description}</td>
                    <td className="">
                      <div className="flex">
                        {/* Edit */}
                        <NavLink
                          className="flex items-center justify-center bg-secondary text-white w-1/2 font-normal hover:bg-secondary-focus text-center"
                          to={`/editdepartment/${department._id}`}
                        >
                          <img className="h-5 w-5" src="/icons/edit-pencil.svg"/>
                        </NavLink>
                        {/* Delete */}
                        <button
                          className="flex items-center justify-center bg-red text-white w-1/2 font-normal hover:bg-red-focus"
                          onClick={() => {
                            deleteItem(department);
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

export default Department;
