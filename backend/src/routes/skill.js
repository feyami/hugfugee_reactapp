import express from "express";
import { getSkills, getSkill, createSkill, updateSkill, deleteSkill } from "../controllers/Skill.js";
 
const router = express.Router();


 
router.get('/', getSkills);
router.get('/:id', getSkill);
router.post('/' , createSkill);
router.patch('/:id', updateSkill);
router.delete('/:id', deleteSkill);


export default router;
