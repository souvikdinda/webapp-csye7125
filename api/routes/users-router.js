import express from 'express';
import * as usersController from '../controllers/user-controller.js';

const Router = express.Router();

Router.route('/').get(usersController.getAll);

// Get Routers
Router.route('/:userId').get(usersController.getById);

// Post router
Router.route('/').post(usersController.post);

// // Put router
Router.route('/:userId').put(usersController.update);

// // Delete router
// Router.route('/:id').delete(usersController.delete);

Router.route('/').all((req,res) => {
    res.status(405).json();
})


export default Router;