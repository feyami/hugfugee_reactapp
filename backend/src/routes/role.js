import express from "express";
import { getRoles, getRole, createRole, updateRole, deleteRole } from "../controllers/Role.js";
 
const router = express.Router();


 
router.get('/', getRoles);
router.get('/:id', getRole);
router.post('/' , createRole);
router.patch('/:id', updateRole);
router.delete('/:id', deleteRole);


export default router;