import express from 'express';
import * as httpCheckController from '../controllers/http-check-controller.js';

const Router = express.Router();

Router.route('/').get(httpCheckController.getAll);

// Get Routers
Router.route('/:id').get(httpCheckController.getById);

// Post router
Router.route('/').post(httpCheckController.post);

// Put router
Router.route('/:id').put(httpCheckController.update);

// Delete router
Router.route('/:id').delete(httpCheckController.deleteHttpCheck);


Router.route('/').all((req,res) => {
    res.status(405).json();
})

Router.route('/:id').all((req,res) => {
    res.status(405).json();
})


export default Router;