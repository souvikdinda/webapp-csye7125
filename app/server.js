import app from './api/app.js';
import logger from './api/logger/index.js';
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT;

app.listen(PORT, () => {
    logger.info(`Server running on port: ${PORT}`);
});
