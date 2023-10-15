import * as prod from './productionLogger.js';
import * as dev from './devLogger.js';
import dotenv from 'dotenv';
dotenv.config();

var logger = null;

if(process.env.ENVIRONMENT === 'dev') {
    logger = dev.devLogger();
} else {
    logger = prod.productionLogger();
}

export default logger;