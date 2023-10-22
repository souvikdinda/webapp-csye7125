import express from 'express';
import * as healthCheckController from '../controllers/health-check-controller.js';
import dotenv from 'dotenv';
dotenv.config();

const Router = express.Router();

Router.route('/').get(healthCheckController.getHealthCheck);
Router.route('/:id').get(healthCheckController.getHealthCheck);
Router.route('/').all((req,res) => {
    res.status(405).json();
})

Router.route('/:id').all((req,res) => {
    res.status(405).json();
})


export default Router;