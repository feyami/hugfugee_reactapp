import RoleSchema from '../models/roleModel.js';

export const getRoles = async (req, res) => {
    try {
        const roles = await RoleSchema.find();
        res.status(200).json(roles);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const getRole = async (req, res) => {
    const { id } = req.params;
    try {
        const role = await RoleSchema.findById(id);
        res.status(200).json(role);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const createRole = async (req, res) => {
    const role = req.body;
    const newRole = new RoleSchema(role);
    try {
        await newRole.save();
        res.status(201).json(newRole);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};

export const updateRole = async (req, res) => {
    const { id } = req.params;
    const role = req.body;
    if (!RoleSchema.findById(id)) {
        return res.status(404).json({ message: "Role not found" });
    }
    const updatedRole = await RoleSchema.findByIdAndUpdate(id, role, { new: true });
    res.json({ data: updatedRole });
};

export const deleteRole = async (req, res) => {
    const { id } = req.params;
    if (!RoleSchema.findById(id)) {
        return res.status(404).json({ message: "Role not found" });
    }
    await RoleSchema.findByIdAndRemove(id);
    res.json({ message: "Role deleted successfully" });
};
