import asyncHandler from "express-async-handler";
import Employee from "../models/employeeModels.js";
import Department from "../models/departmentModels.js";
import Role from "../models/roleModels.js";

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
  const { name, employeeId, email, picture, role, age, department } = req.body;
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

  const newDepartment = await Department.create({
    name: department,
  });

  const newRole = await Role.create({
    name: role,
  });

  const employee = await Employee.create({
    name: name,
    employeeId: employeeId,
    email: email,
    picture: picture,
    role: newRole,
    age: age,
    department: newDepartment,
    company: company,
  });

  //return employee profile json
  if (employee) {
    res.status(201).json({
      _id: employee._id,
      name: employee.name,
      employeeId: employee.employeeId,
      email: employee.email,
      company: employee.company,
      picture: employee.picture,
      role: employee.role,
      age: employee.age,
      department: employee.department,
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
  const company = req.query.company;
  const employee = await Employee.findById(req.params.id);

  const newDepartment = await Department.create({
    name: req.body.department,
  });

  const newRole = await Role.create({
    name: req.body.role,
  });

  if (employee) {
    employee.name = req.body.name || employee.name;
    employee.email = req.body.email || employee.email;
    employee.picture = req.body.picture || employee.picture;
    employee.age = req.body.age || employee.age;
    employee.employeeId = req.body.employeeId || employee.employeeId;
    employee.role = newRole || employee.role;
    employee.department = newDepartment || employee.department;

    const updatedEmployee = await employee.save();
    return res.json({
      _id: updatedEmployee._id,
      name: updatedEmployee.name,
      email: updatedEmployee.email,
      picture: updatedEmployee.picture,
      role: updatedEmployee.role,
      age: updatedEmployee.age,
      department: updatedEmployee.department,
      employeeId: updatedEmployee.employeeId,
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
    });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
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
