import {Router} from 'express'

import { register } from '../controllers/auth.controller.js'


const router = Router()


router.post('/register', register)

router.get('/',(req,res)=>{

    res.send("hola")
})

export default router