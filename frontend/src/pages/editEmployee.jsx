import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { editEmployee, listEmployees } from "../actions/employeeActions";
import { listDepartments } from "../actions/departmentActions";
import { listRoles } from "../actions/rolesActions";

const EditEmployee = () => {
  const navigate = useNavigate();
  const employeesList = useSelector((state) => state.employeesList);
  const { loading, error, employees } = employeesList;
  const params = useParams();

  const parseRoles = (roles) => {
    let arr = [];
    for (let i = 0; i < 3; i++) {
      if (roles[i]) {
        arr.push(roles[i].name);
      }
    }
    return arr;
  };

  const employee = employees.find((employee) => employee._id === params.id);
  const [formData, setFormData] = useState({
    name: employee.name,
    email: employee.email,
    employeeId: employee.employeeId,
    role: parseRoles(employee.role),
    department: employee.department.name,
    age: employee.age,
    pictureUrl: employee.pictureUrl,
  });

  const { name, email, employeeId, role, department, age, pictureUrl } =
    formData;
  const dispatch = useDispatch();

  const departmentList = useSelector((state) => state.departmentList);
  const { departments } = departmentList;
  const rolesList = useSelector((state) => state.rolesList);
  const { roles } = rolesList;

  const change = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const submit = (event) => {
    event.preventDefault();
    dispatch(
      editEmployee({
        name,
        email,
        employeeId,
        role,
        department,
        age,
        pictureUrl,
        id: params.id,
      })
    );
  };

  const changeRole = (event) => {
    switch (event.target.name) {
      case "role1":
        role[0] = event.target.value;
        setFormData({ ...formData, [role]: role });
        break;
      case "role2":
        role[1] = event.target.value;
        setFormData({ ...formData, [role]: role });
        break;
      case "role3":
        role[2] = event.target.value;
        setFormData({ ...formData, [role]: role });
        break;
      default:
        console.log("Error inserting roles.");
    }
  };

  useEffect(() => {
    dispatch(listRoles());
    // dispatch(listEmployees());
    // dispatch(listDepartments());
  }, [dispatch]);

  return (
    <div className="mb-12">
      {/* <NotificationContainer /> */}
      <button
        className="bg-purple-500 hover:bg-purple-600 text-white p-2 m-2 flex items-center space-x-2"
        onClick={() => {
          navigate("/record");
        }}
      >
        <img className="w-4 h-4" src="/icons/arrow-left.svg"/>
        <span>Go back</span>
      </button>
      <main className="flex flex-col items-center justify-center  space-y-5 pt-4">
        <h1 className="text-3xl font-bold">Update Employee</h1>

        {/* Form */}
        <form className="flex flex-col" onSubmit={(event) => submit(event)}>
          {/*Input Form*/}
          <div className="flex flex-col space-y-2 mb-5">
            {/*Name*/}
            <div className="flex flex-col">
              <span className="text-gray-400">Name</span>
              <input
                type="text"
                name="name"
                value={name}
                className="px-2 py-1 border border-gray-300 appearance-none focus:outline-none focus:border-indigo-500 shadow"
                onChange={(event) => change(event)}
                required
              />
            </div>

            {/*Email*/}
            <div className="flex flex-col">
              <span className="text-gray-400">Email</span>
              <input
                type="email"
                name="email"
                value={email}
                className="px-2 py-1 border border-gray-300 appearance-none focus:outline-none focus:border-indigo-500 shadow"
                onChange={(event) => change(event)}
                required
              />
            </div>

            {/*Employee Id*/}
            <div className="flex flex-col">
              <span className="text-gray-400">Employee ID</span>
              <input
                type="number"
                name="employeeId"
                value={employeeId}
                className="px-2 py-1 border border-gray-300 appearance-none focus:outline-none focus:border-indigo-500 shadow"
                onChange={(event) => change(event)}
                required
              />
            </div>

            {/*Role*/}

            <div className="flex flex-col">
              <span className="text-gray-400">Roles (Max 3 roles)</span>
              <select
                className="px-2 py-1 border border-gray-300 appearance-none bg-white text-black focus:outline-none focus:border-indigo-500 shadow"
                onChange={(event) => changeRole(event)}
                name="role1"
              >
                <option value={role[0]}>-- {role[0]} --</option>
                <option value="">None</option>
                {roles.map((role, index) => (
                  <option key={index} value={role.name}>
                    {role.name}
                  </option>
                ))}
              </select>

              <select
                className="px-2 py-1 border border-gray-300 appearance-none bg-white text-black focus:outline-none focus:border-indigo-500 shadow"
                onChange={(event) => changeRole(event)}
                name="role2"
              >
                <option value={role[1]}>-- {role[1]} --</option>
                <option value="">None</option>
                {roles.map((role, index) => (
                  <option key={index} value={role.name}>
                    {role.name}
                  </option>
                ))}
              </select>

              <select
                className="px-2 py-1 border border-gray-300 appearance-none bg-white text-black focus:outline-none focus:border-indigo-500 shadow"
                onChange={(event) => changeRole(event)}
                name="role3"
              >
                <option value={role[2]}>-- {role[2]} --</option>
                <option value="">None</option>
                {roles.map((role, index) => (
                  <option key={index} value={role.name}>
                    {role.name}
                  </option>
                ))}
              </select>
            </div>

            {/*Department*/}

            <div className="flex flex-col">
              <span className="text-gray-400">Department</span>
              <select
                className="px-2 py-1 border border-gray-300 appearance-none bg-white text-black focus:outline-none focus:border-indigo-500 shadow"
                onChange={(event) => change(event)}
                name="department"
              >
                <option value={department}>-- {department} --</option>
                {departments.map((department, index) => (
                  <option key={index} value={department.name}>
                    {department.name}
                  </option>
                ))}
              </select>
            </div>

            {/*Age*/}
            <div className="flex flex-col">
              <span className="text-gray-400">Age</span>
              <input
                type="number"
                placeholder="Age"
                name="age"
                value={age}
                className="px-2 py-1 border border-gray-300 appearance-none focus:outline-none focus:border-indigo-500 shadow"
                onChange={(event) => change(event)}
                required
              />
            </div>

            {/* Picture */}
            <div className="flex flex-col space-y-1 ">
              <label htmlFor="file" className="text-gray-400">
                Profile picture
              </label>
              <input
                type="file"
                id="file"
                placeholder="Picture"
                name="picture"
                accept="image/png, image/jpeg"
                className="px-2 py-1 border border-gray-300 appearance-none focus:outline-none focus:border-indigo-500 shadow"
              />
              <span className="text-gray-400">Or</span>
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

export default EditEmployee;
