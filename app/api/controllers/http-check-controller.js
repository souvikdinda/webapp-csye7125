import * as httpCheckService from '../services/http-check-service.js';
import * as healthService from '../services/health-check-service.js';
import logger from '../logger/index.js';
import { DataTypes } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();


const checkConnection = async () => {
    const checkConnection = await healthService.checkConnection();
    if (checkConnection) {
        return true;
    } else {
        return false;
    }
}


export const getAll = async (req, res, next) => {
    logger.info(`/GETALL/HTTPController/Initiated`)

    if (req.body && Object.keys(req.body).length > 0 ||
    req.query && Object.keys(req.query).length > 0) {
        res.status(400).json();
    } else if(checkConnection()) {
        const response = await httpCheckService.getAllHttpChecks();
        if (response) {
            return res.status(200).json(response);
        } else {
            return res.status(404).json({ error: 'Resource not found' });
        }
    } else {
        return res.status(503).json();
    }
}


// Get method
export const getById  = async (req, res, next) => {

    logger.info(`/GET/HTTPController/Initiated`)
    if (req.body && Object.keys(req.body).length > 0 ||
    req.query && Object.keys(req.query).length > 0 || Object.keys(req.params).length > 0) {
        res.status(400).json();
    } else {
        try {
            if(checkConnection()) {
                const Data = await httpCheckService.getHttpCheck(req.params.id);
                if(Object.keys(Data)[0] === 'error') {
                    return res.status(404).json({ error: 'Resource not found' });
                } else
                if (Data) {
                    return res.status(200).json(Data);
                } else {
                    return res.status(404).json({ error: 'Resource not found' });
                }
            } else {
                return res.status(503).json();
            }
        } catch (error) {
            return next(error);
        }
    }

}


export const post = async (req, res, next) => {

    logger.info(`/POST/HTTPController/Initiated`)
    if(!Object.keys(req.body).length) {
        res.status(204);
        res.json();
    } else if(Object.keys(req.body).length != 9) { 
        return res.status(400).json({ error: 'Invalid request body' });
    } else {

        const validationRules = {
            name: { type: 'string', allowNull: false },
            uri: { type: 'string', allowNull: false },
            is_paused: { type: 'boolean', allowNull: false },
            num_retries: { type: 'number', allowNull: false, min: 0, max: 5 },
            uptime_sla: { type: 'number', allowNull: false, min: 0, max: 100 },
            response_time_sla: { type: 'number', allowNull: false, min: 0, max: 100 },
            use_ssl: { type: 'boolean', allowNull: false },
            response_status_code: { type: 'number', allowNull: false, defaultValue: 200, min: 0, max: 600 },
            check_interval_in_seconds: { type: 'number', allowNull: false, min: 0, max: 86400 },
        };
        
        const validationErrors = [];
        for (const field of Object.keys(validationRules)) {
            if (!(field in req.body)) {
                validationErrors.push(`Missing field: ${field}`);
            } else {
                const rule = validationRules[field];
                if (typeof req.body[field] !== rule.type) {
                    validationErrors.push(`Invalid data type for ${field}, expected ${rule.type}`);
                }
                if (rule.min && req.body[field] < rule.min) {
                    validationErrors.push(`${field} is less than the minimum allowed value: ${rule.min}`);
                }
                if (rule.max && req.body[field] > rule.max) {
                    validationErrors.push(`${field} is greater than the maximum allowed value: ${rule.max}`);
                }
            }
        }
        
        if (validationErrors.length > 0) {
            return res.status(400).json({ errors: validationErrors });
        }

        try {
            const savedData = await httpCheckService.saveHttpCheck(req.body);
            if (savedData) {
                return res.status(201).json(savedData);
            } else {
                return res.status(503).json();
            }
        } catch (error) {
            return next(error);
        }
    }
}

export const update = async (req, res, next) => {
    logger.info(`/UPDATE/HTTPController/Initiated`)

    if(!Object.keys(req.body).length) {
        setError(204, res,next);
    } else {
        const validationRules = {
            name: { type: 'string', allowNull: false },
            uri: { type: 'string', allowNull: false },
            is_paused: { type: 'boolean', allowNull: false },
            num_retries: { type: 'number', allowNull: false, min: 0, max: 5 },
            uptime_sla: { type: 'number', allowNull: false, min: 0, max: 100 },
            response_time_sla: { type: 'number', allowNull: false, min: 0, max: 100 },
            use_ssl: { type: 'boolean', allowNull: false },
            response_status_code: { type: 'number', allowNull: false, min: 0, max: 600 },
            check_interval_in_seconds: { type: 'number', allowNull: false, min: 0, max: 86400 },
        };

        const validationErrors = [];
        for (const field of Object.keys(validationRules)) {
            if (!(field in req.body)) {
                validationErrors.push(`Missing field: ${field}`);
            } else {
                const rule = validationRules[field];
                if (typeof req.body[field] !== rule.type) {
                    validationErrors.push(`Invalid data type for ${field}, expected ${rule.type}`);
                }
                if (rule.min && req.body[field] < rule.min) {
                    validationErrors.push(`${field} is less than the minimum allowed value: ${rule.min}`);
                }
                if (rule.max && req.body[field] > rule.max) {
                    validationErrors.push(`${field} is greater than the maximum allowed value: ${rule.max}`);
                }
            }
        }

        if (validationErrors.length > 0) {
            return res.status(400).json({ errors: validationErrors });
        }

        try {
            if(checkConnection()) {
                const updatedData = await httpCheckService.updateHttpCheck(req.params.id, req.body);
                if(Object.keys(updatedData)[0] === 'error') {
                    return res.status(404).json({ error: 'Resource not found' });
                } else
                if (updatedData) {
                    return res.status(200).json(updatedData);
                } else {
                    return res.status(404).json({ error: 'Resource not found' });
                }
            } else {
                return res.status(503).json();
            }
        } catch (error) {
            return next(error);
        }
        
    }
}


export const deleteHttpCheck = async (req, res, next) => {
    logger.info(`/DELETE/HTTPController/Initiated`)

    try {
        const id = req.params.id;
        if(checkConnection()) {
            const response = await httpCheckService.deleteHttpCheck(id);
            if(Object.keys(response)[0] === 'error') {
                return res.status(404).json({ error: 'Resource not found' });
            } else if (response) {
                return res.status(204).end();
            } else {
                return res.status(404).json({ error: 'Resource not found' });
            }
        } else {
            return res.status(503).json();
        }
    } catch (error) {
        return next(error);
    }
};
  