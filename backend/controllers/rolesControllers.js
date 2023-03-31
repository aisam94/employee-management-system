import asyncHandler from "express-async-handler";
import Role from "../models/roleModels.js";

//@description  Fetch all roles
//@router       GET /api/roles
//@access       Private

const getAllRoles = asyncHandler(async (req, res) => {
  const roles = await Role.find({
    company: req.query.company,
  });

  res.json(roles);
});

//@description  Fetch a single role
//@router       GET /api/role/:id
//@access       Private

const getRoleById = asyncHandler(async (req, res) => {
  const role = await Role.findById(req.params.id);

  if (role) {
    res.json(role);
  } else {
    res.status(404);
    throw new Error("Role cannot be found.");
  }
});

//@description  Create a single role
//@router       POST /api/role
//@access       Private

const addRole = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const company = req.user.company;

  // check if department already existed
  const roleExists = await Role.findOne({
    name,
    company,
  });

  if (roleExists) {
    res.status(404);
    throw new Error("Role already exist.");
  }

  const role = await Role.create({
    name,
    company,
  });

  if (role) {
    res.status(201).json({
      _id: role._id,
      name: role.name,
      company: role.company,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data.");
  }
});

//@description  Update a single role
//@router       PUT /api/role/:id
//@access       Private

const updateRoleById = asyncHandler(async (req, res) => {
  const role = await Role.findById(req.params.id);

  if (role) {
    role.name = req.body.name || role.name;

    const updatedRole = await role.save();
    return res.json({
      _id: role._id,
      name: role.name,
      company: role.company,
    });
  } else {
    res.status(404);
    throw new Error("Role not found.");
  }
});

//@description  Delete a single role
//@router       DELETE /api/role/:id
//@access       Private

const deleteRole = asyncHandler(async (req, res) => {
  try {
    const role = await Role.findById(req.params.id);

    // check if role exist
    if (!role) {
      return res.status(404).json({ message: "Role not found." });
    }

    await role.remove();
    return res.json({
      message: "Role has been deleted.",
      id: req.params.id,
    });
  } catch (error) {
    console.error(error.message);

    if (error.kind === "ObjectId") {
      return res.status(404).json({ message: "Role not found." });
    }
    res.status(500).send("Server error");
  }
});

export { getAllRoles, getRoleById, addRole, updateRoleById, deleteRole };
