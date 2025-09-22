import express from 'express';

// Configs
import { userSchema } from '../config/validation-schema';

// Controllers
import {
    Login,
    SignUp,
    VerifyEmail
} from '../controllers/auth.controller';

// Middlewares
import {schemaValidator} from '../middlewares/schema-validator.middleware'

const router:express.Router = express.Router();


router.post('/signup',schemaValidator(userSchema), SignUp)
router.get('/verify-email', VerifyEmail)
router.get('/login', Login)


export default router;