import asyncHandler from "express-async-handler";
import Employee from "../models/employeeModels.js";
import Department from "../models/departmentModels.js";
import Role from "../models/roleModels.js";

// function to parse roles into objects
async function parseRole(roles) {
  let arr = [];
  for (let i = 0;i < roles.length;i++) {
    const role = await Role.findById(roles[i]);
    if (role) {
      arr.push(role);
    }
  }
  return arr;
};

//@description  Fetch all employees
//@router       GET /api/employees
//@access       Private

const getEmployees = asyncHandler(async (req, res) => {
  const employees = await Employee.find({
    company: req.query.company,
  })
    .populate("department")
    .populate("role");

  res.json(employees);
});

//@description  Fetch single employee
//@router       GET /api/employees/:id
//@access       Private

const getEmployeeById = asyncHandler(async (req, res) => {
  const employee = await Employee.findById(req.params.id)
    .populate("department")
    .populate("role");

  if (employee) {
    res.json(employee);
  } else {
    res.status(404);
    throw new Error("Employee cannot be found.");
  }
});

//@description  Create a single employee
//@router       POST /api/employees/
//@access       Private

const addEmployee = asyncHandler(async (req, res) => {
  const { name, employeeId, email, role, age, department, pictureUrl, avatar } =
    req.body;
  const company = req.user.company;

  //check if employee already exists
  const employeeExists = await Employee.findOne({
    name,
    email,
    employeeId,
    company,
  });

  if (employeeExists) {
    res.status(400);
    throw new Error("Employee already exists.");
  }

  const newDepartment = await Department.findOne({
    name: department,
    company: company,
  });

  const newRoles = [];
  for (let i = 0;i < role.length;i++) {
    const newRole = await Role.findOne({
      name: role[i],
      company: company,
    });
    newRoles.push(newRole);
  }

  const employee = await Employee.create({
    name: name,
    employeeId: employeeId,
    email: email,
    pictureUrl: pictureUrl,
    role: newRoles,
    age: age,
    department: newDepartment,
    company: company,
    pictureUrl: pictureUrl,
    avatar: avatar,
  });

  //return employee profile json
  if (employee) {
    res.status(201).json({
      _id: employee._id,
      name: employee.name,
      employeeId: employee.employeeId,
      email: employee.email,
      company: employee.company,
      pictureUrl: employee.pictureUrl,
      role: employee.role,
      age: employee.age,
      department: employee.department,
      avatar: employee.avatar,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data.");
  }
});

//@description  Update an employee
//@router       PUT /api/employees/:id
//@access       Private

const updateEmployeeById = asyncHandler(async (req, res) => {
  const employee = await Employee.findById(req.params.id);
  const company = req.user.company;

  const newDepartment = await Department.findOne({
    name: req.body.department,
    company: company,
  });

  const newRoles = [];
  for (let i = 0;i < req.body.role.length;i++) {
    const newRole = await Role.findOne({
      name: req.body.role[i],
      company: company,
    });
    newRoles.push(newRole);
  }

  if (employee) {
    employee.name = req.body.name || employee.name;
    employee.email = req.body.email || employee.email;
    employee.pictureUrl = req.body.pictureUrl || employee.pictureUrl;
    employee.age = req.body.age || employee.age;
    employee.employeeId = req.body.employeeId || employee.employeeId;
    // employee.role = newRoles || employee.role;
    employee.role = newRoles;
    employee.department = newDepartment || employee.department;
    employee.avatar = req.body.avatar || employee.avatar;

    const updatedEmployee = await employee.save();
    const updatedRoles = await parseRole(updatedEmployee.role);

    return res.json({
      _id: updatedEmployee._id,
      name: updatedEmployee.name,
      email: updatedEmployee.email,
      pictureUrl: updatedEmployee.pictureUrl,
      role: updatedRoles,
      age: updatedEmployee.age,
      department: updatedEmployee.department,
      employeeId: updatedEmployee.employeeId,
      avatar: updatedEmployee.avatar,
    });
  } else {
    res.status(404);
    throw new Error("User not found.");
  }
});

//@description  Delete an employee
//@router       DELETE /api/employees/:id
//@access       Private

const deleteEmployee = asyncHandler(async (req, res) => {
  //need to check if employee under his company not from others
  try {
    const employee = await Employee.findById(req.params.id);

    //check if employee exist
    if (!employee) {
      return res.status(404).json({ message: "Employee not found." });
    }

    // await Employee.deleteOne({ _id: req.body.id });
    await employee.remove();
    return res.json({
      message: "Employee has been deleted.",
      id: req.params.id,
    });
  } catch (error) {
    console.error(error.message);
    if (error.kind === "ObjectId") {
      return res.status(404).json({ message: "Employee not found." });
    }
    res.status(500).send("Server error");
  }
});

export {
  getEmployees,
  getEmployeeById,
  addEmployee,
  updateEmployeeById,
  deleteEmployee,
};
