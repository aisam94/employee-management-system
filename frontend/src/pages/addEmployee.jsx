import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addEmployee } from "../actions/employeeActions";
import { listDepartments } from "../actions/departmentActions";
import { listRoles } from "../actions/rolesActions";

const AddEmployee = () => {
  const navigate = useNavigate();
  const initialState = {
    name: "",
    email: "",
    employeeId: "",
    role: ["", "", ""],
    department: "",
    age: "",
    pictureUrl: "",
  };
  const [formData, setFormData] = useState(initialState);
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

  const addRole = (event) => {
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
        break;
    }
  };

  const submit = (event) => {
    event.preventDefault();
    dispatch(
      addEmployee({
        name,
        email,
        employeeId,
        role,
        department,
        age,
        pictureUrl,
      })
    );
    setFormData(initialState);
  };

  useEffect(() => {
    dispatch(listRoles());
    dispatch(listDepartments());
  }, [dispatch]);

  return (
    <div className="mb-12">
      {/* <NotificationContainer /> */}
      <button
        className="bg-primary hover:bg-primary-light text-white p-2 m-2 flex items-center space-x-2"
        onClick={() => {
          navigate("/record");
        }}
      >
        <img className="w-4 h-4" src="/icons/arrow-left.svg"/>
        <span>Go back</span>
      </button>
      <main className="flex flex-col items-center justify-center  space-y-5 pt-4">
        <h1 className="text-3xl font-bold">Add Employee</h1>

        {/* Form */}
        <form className="flex flex-col" onSubmit={(event) => submit(event)}>
          {/*Input Form*/}
          <div className="flex flex-col space-y-2 mb-5">
            {/*Name*/}
            <div className="flex flex-col">
              <span className="text-gray">Name</span>
              <input
                type="text"
                name="name"
                value={name}
                className="px-2 py-1 border border-gray appearance-none focus:outline-none focus:border-primary shadow"
                onChange={(event) => change(event)}
                required
              />
            </div>

            {/*Email*/}
            <div className="flex flex-col">
              <span className="text-gray">Email</span>
              <input
                type="email"
                name="email"
                value={email}
                className="px-2 py-1 border border-gray appearance-none focus:outline-none focus:border-primary shadow"
                onChange={(event) => change(event)}
                required
              />
            </div>

            {/*Employee Id*/}
            <div className="flex flex-col">
              <span className="text-gray">Employee ID</span>
              <input
                type="text"
                name="employeeId"
                value={employeeId}
                className="px-2 py-1 border border-gray appearance-none focus:outline-none focus:border-primary shadow"
                onChange={(event) => change(event)}
                required
              />
            </div>

            {/*Role*/}
            <div className="flex flex-col">
              <span className="text-gray">Roles (Max 3 roles)</span>
              <select
                className="px-2 py-1 border border-gray appearance-none bg-white text-black focus:outline-none focus:border-primary shadow"
                onChange={(event) => addRole(event)}
                name="role1"
              >
                <option value="">-- Choose a role --</option>
                {roles.map((role, index) => (
                  <option key={index} value={role.name}>
                    {role.name}
                  </option>
                ))}
              </select>

              <select
                className="px-2 py-1 border border-gray appearance-none bg-white text-black focus:outline-none focus:border-primary shadow"
                onChange={(event) => addRole(event)}
                name="role2"
              >
                <option value="">-- Choose a role --</option>
                {roles.map((role, index) => (
                  <option key={index} value={role.name}>
                    {role.name}
                  </option>
                ))}
              </select>

              <select
                className="px-2 py-1 border border-gray appearance-none bg-white text-black focus:outline-none focus:border-primary shadow"
                onChange={(event) => addRole(event)}
                name="role3"
              >
                <option value="">-- Choose a role --</option>
                {roles.map((role, index) => (
                  <option key={index} value={role.name}>
                    {role.name}
                  </option>
                ))}
              </select>
            </div>

            {/*Department*/}

            <div className="flex flex-col">
              <span className="text-gray">Department</span>
              <select
                className="px-2 py-1 border border-gray appearance-none bg-white text-black focus:outline-none focus:border-primary shadow"
                onChange={(event) => change(event)}
                name="department"
              >
                <option value="">-- Choose a department --</option>
                {departments.map((department, index) => (
                  <option key={index} value={department.name}>
                    {department.name}
                  </option>
                ))}
              </select>
            </div>

            {/*Age*/}
            <div className="flex flex-col">
              <span className="text-gray">Age</span>
              <input
                type="number"
                name="age"
                value={age}
                className="px-2 py-1 border border-gray appearance-none focus:outline-none focus:border-primary shadow"
                onChange={(event) => change(event)}
                required
              />
            </div>

            {/* Picture */}
            <div className="flex flex-col space-y-1 ">
              <label htmlFor="file" className="text-gray">
                Profile picture
              </label>
              <input
                type="file"
                id="file"
                placeholder="Picture"
                name="picture"
                accept="image/png, image/jpeg"
                className="px-2 py-1 border border-gray appearance-none focus:outline-none focus:border-primary shadow"
              />
              <span className="text-gray">Or</span>
              <input
                type="text"
                placeholder="Picture URL"
                name="pictureUrl"
                value={pictureUrl}
                className="px-2 py-1 border border-gray appearance-none focus:outline-none focus:border-primary shadow"
                onChange={(event) => change(event)}
              />
            </div>
          </div>

          {/* Submit button */}
          <input
            type="submit"
            value="SUBMIT"
            className="py-2 text-white bg-primary  hover:bg-primary-light"
          />
        </form>
      </main>
    </div>
  );
};

export default AddEmployee;
