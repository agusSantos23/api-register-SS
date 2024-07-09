import {Router} from 'express'

import { register, login } from '../controllers/auth.controller.js'
import { validateDataSchema } from '../middlewares/validatorData.middleware.js'
import { loginSchema, registerSchema } from '../schemas/auth.schema.js'


const router = Router()


router.post('/register', validateDataSchema(registerSchema), register)

router.post('/login', validateDataSchema(loginSchema), login)



export default router