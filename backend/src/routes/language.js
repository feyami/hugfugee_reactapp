import express from "express";
import { getLanguages, getLanguage, createLanguage, updateLanguage, deleteLanguage } from "../controllers/Language.js";
 
const router = express.Router();


 
router.get('/', getLanguages);
router.get('/:id', getLanguage);
router.post('/' , createLanguage);
router.patch('/:id', updateLanguage);
router.delete('/:id', deleteLanguage);


export default router;