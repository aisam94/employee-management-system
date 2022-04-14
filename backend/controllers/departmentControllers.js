import asyncHandler from "express-async-handler";
import Department from "../models/departmentModels.js";

//@description  Fetch all department
//@router       GET /api/department
//@access       Private

const getAllDepartment = asyncHandler(async (req, res) => {
  const departments = await Department.find({
    company: req.query.company,
  });

  res.json(departments);
});

//@description  Fetch a single department
//@router       GET /api/department/:id
//@access       Private

const getDepartmentById = asyncHandler(async (req, res) => {
  const department = await Department.findById(req.params.id);

  if (department) {
    res.json(department);
  } else {
    res.status(404);
    throw new Error("Department cannot be found.");
  }
});

//@description  Create a single department
//@router       POST /api/department
//@access       Private

const addDepartment = asyncHandler(async (req, res) => {
  const { name, description, pictureUrl } = req.body;
  const company = req.user.company;

  // check if department already existed
  const departmentExists = await Department.findOne({
    name,
    description,
    company,
    pictureUrl,
  });

  if (departmentExists) {
    res.status(404);
    throw new Error("Department already exist.");
  }

  const department = await Department.create({
    name,
    description,
    company,
    pictureUrl,
  });

  if (department) {
    res.status(201).json({
      _id: department._id,
      name: department.name,
      description: department.description,
      company: department.company,
      pictureUrl: department.pictureUrl,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data.");
  }
});

//@description  Update a single department
//@router       PUT /api/department/:id
//@access       Private

const updateDepartmentById = asyncHandler(async (req, res) => {
  const department = await Department.findById(req.params.id);

  if (department) {
    department.name = req.body.name || department.name;
    department.description = req.body.description || department.description;
    department.pictureUrl = req.body.pictureUrl || department.pictureUrl;

    const updatedDepartment = await department.save();
    return res.json({
      _id: updatedDepartment._id,
      name: updatedDepartment.name,
      description: updatedDepartment.description,
      pictureUrl: updatedDepartment.pictureUrl,
      company: updatedDepartment.company,
    });
  } else {
    res.status(404);
    throw new Error("Department not found.");
  }
});

//@description  Delete a single department
//@router       DELETE /api/department/:id
//@access       Private

const deleteDepartment = asyncHandler(async (req, res) => {
  try {
    const department = await Department.findById(req.params.id);

    // check if department exist
    if (!department) {
      return res.status(404).json({ message: "Department not found." });
    }

    await department.remove();
    return res.json({
      message: "Department has been deleted.",
    });
  } catch (error) {
    console.error(error.message);

    if (error.kind === "ObjectId") {
      return res.status(404).json({ message: "Department not found." });
    }
    res.status(500).send("Server error");
  }
});

export {
  getAllDepartment,
  getDepartmentById,
  addDepartment,
  updateDepartmentById,
  deleteDepartment,
};
