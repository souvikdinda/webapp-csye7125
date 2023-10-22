import healthRouter from './health-router.js';
import httpCheckRouter from './http-check-router.js';
// import os from 'os';

export const healthCheck = (app) => {
    app.use('/healthz', healthRouter);
}

export const httpCheck = (app) => {
    app.use('/v1/http-check', httpCheckRouter);
}

// export const currentDateTime = (app) => {
//     app.use('/', (req, res) => {
//         res.status(200).json({
//             message: "Welcome to CSYE 7125 Web App",
//             date: new Date().toLocaleString('en-US', { timeZone: 'America/New_York' }).replace(',', ''),
//             operatingSystem: os.version(),
//             architecture: os.arch(),
//             cpu: os.cpus()[0]['model']
//         });
//     }); 
// }