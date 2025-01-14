import httpcheck from '../models/http-check-model.js'
import logger from '../logger/index.js'
import { healthCheck } from '../routes/index.js';


export const getAllHttpChecks = async () => {
    try {
        const response = await httpcheck.findAll();
        return response;
    } catch(error) {
        logger.error(`HTTP Check Service: ${error}`)
        return {error: error}
    }
}

export const checkIfHttpCheckExists = async (name) => {
    try {
        const response = await httpcheck.findOne({where: {name}});
        if(response) {
            return true;
        } else {
            return false;
        }
    } catch(error) {
        logger.error(`HTTP Check Service: ${error}`)
        return {error: error}
    }
}


export const getHttpCheck = async (id) => {
    try {
        const response = await httpcheck.findOne({where: {id}});
        if(response) {
            return response;
        } else {
            return false;
        }
    } catch(error) {
        logger.error(`HTTP Check Service: ${error}`)
        return {error: error}
    }
}


export const saveHttpCheck = async (HttpCheckData) => {
    try {

        const response = await httpcheck.create(HttpCheckData);
        if(response) {
            return response;
        } else {
            return false;
        }
    } catch(error) {
        logger.error(`HTTP Check Service: ${error}`)
        return {error: error}
    }
}


export const updateHttpCheck =  async (id, data) => {
    try {
        const httpCheckData = await httpcheck.findOne({where: {id}});
        const response = await httpCheckData.update(data);
        
        if(response) {
            return response;
        } else {
            return false;
        }
    } catch(err) {
        logger.error(`HTTP Check Service: ${err}`)
        return {error: err}
    }

}

export const deleteHttpCheck = async (id) => {
    try {
        const response = await httpcheck.destroy({where: {id}});
        if(response === 0) {
            return false;
        } else return true;
    } catch(error) {
        logger.error(`HTTP Check Service: ${error}`)
        return {error: error}
    }
}