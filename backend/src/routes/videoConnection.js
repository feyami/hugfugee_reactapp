import express from "express";
import {getVideoConnections,getVideoConnection,createVideoConnection,updateVideoConnection,deleteVideoConnection} from "../controllers/videoConnection.js";

const router = express.Router();

router.get('/', getVideoConnections);
router.get('/:id', getVideoConnection);
router.post('/', createVideoConnection);
router.patch('/:id', updateVideoConnection);
router.delete('/:id', deleteVideoConnection);

export default router;

