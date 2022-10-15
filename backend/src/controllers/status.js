import StatusSchema from "../models/statusModel";

export const getStatuses = async (req, res) => {
    try {
        const statuses = await StatusSchema.find();
        res.status(200).json(statuses);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
    };

export const getStatus = async (req, res) => {
    const { id } = req.params;
    try {
        const status = await StatusSchema.findById(id);
        res.status(200).json(status);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
    };

export const createStatus = async (req, res) => {
    const status = req.body;
    const newStatus = new StatusSchema(status);
    try {
        await newStatus.save();
        res.status(201).json(newStatus);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
    };

export const updateStatus = async (req, res) => {
    const { id } = req.params;
    const status = req.body;
    if (!StatusSchema.findById(id)) {
        return res.status(404).json({ message: "Status not found" });
    }
    const updatedStatus = await StatusSchema.findByIdAndUpdate(id, status, { new: true });
    res.json({ data: updatedStatus });
    };

export const deleteStatus = async (req, res) => {
    const { id } = req.params;
    if (!StatusSchema.findById(id)) {
        return res.status(404).json({ message: "Status not found" });
    }
    await StatusSchema.findByIdAndRemove(id);
    res.json({ message: "Status deleted successfully" });
    };

    
