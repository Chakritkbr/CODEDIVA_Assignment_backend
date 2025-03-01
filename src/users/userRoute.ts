import express, { Router } from 'express';
import UserController from './userController';

const router: Router = express.Router();

router.post('/user', UserController.createUser);
router.post('/login', UserController.login);

router.get('/user/:userId', UserController.getUserById);

export default router;
