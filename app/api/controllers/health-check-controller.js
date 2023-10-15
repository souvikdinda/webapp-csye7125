import * as healthService from '../services/health-check-service.js';

export const getHealthCheck = async (req, res) => {
    if (req.body && Object.keys(req.body).length > 0 ||
    req.query && Object.keys(req.query).length > 0 || Object.keys(req.params).length > 0) {
        res.status(400).json();
    } else {
        const checkConnection = await healthService.checkConnection();
        if (checkConnection) {
            res.status(200).json();
        } else {
            res.status(503).json();
        }
    }
};