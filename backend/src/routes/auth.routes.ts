import express from 'express';

// Controllers
import {
    SignUp
} from '../controllers/auth.controller';

const router:express.Router = express.Router();


router.post('/signup', SignUp)


export default router;