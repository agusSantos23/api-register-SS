import { Router } from "express";
import { picture, profile } from "../controllers/user.controller.js";


const router = Router()


router.put('/picture', picture)

router.patch('/updateProfile', profile)

export default router