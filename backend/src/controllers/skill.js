import SkillSchema from "../models/skillModel";

export const getSkills = async (req, res) => {
    try {
        const skills = await SkillSchema.find();
        res.status(200).json(skills);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
    };

export const getSkill = async (req, res) => {
    const { id } = req.params;
    try {
        const skill = await SkillSchema.findById(id);
        res.status(200).json(skill);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
    };

export const createSkill = async (req, res) => {
    const skill = req.body;
    const newSkill = new SkillSchema(skill);
    try {
        await newSkill.save();
        res.status(201).json(newSkill);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
    };

export const updateSkill = async (req, res) => {
    const { id } = req.params;
    const skill = req.body;
    if (!SkillSchema.findById(id)) {
        return res.status(404).json({ message: "Skill not found" });
    }
    const updatedSkill = await SkillSchema.findByIdAndUpdate(id, skill, { new: true });
    res.json({ data: updatedSkill });
    };

export const deleteSkill = async (req, res) => {
    const { id } = req.params;
    if (!SkillSchema.findById(id)) {
        return res.status(404).json({ message: "Skill not found" });
    }
    await SkillSchema.findByIdAndRemove(id);
    res.json({ message: "Skill deleted successfully" });
    };
    
