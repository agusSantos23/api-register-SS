import { Router } from "express";
import { picture } from "../controllers/user.controller.js";


const router = Router()


router.post('/picture', picture)

export default router