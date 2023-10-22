import express from "express";
import cors from "cors";
import sequelize from "./models/index.js";
import logger from "./logger/index.js";
import * as routes from "./routes/index.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use((err, req, res, next) => {
    if (err instanceof SyntaxError) {
        res.status(400).json();
    } else {
        next();
    }
});

// app.all('*', (req, res, next) => {
//     if (req.originalUrl === '/' || req.originalUrl.startsWith('/healthz') || req.originalUrl.startsWith('/v1')) {
//         next();
//     } else {
//         res.status(404).json();
//     }
// });

routes.healthCheck(app);
routes.httpCheck(app);
// routes.currentDateTime(app);
app.use((req, res, next) => {
    res.status(404).json();
});

sequelize.sync({alter: false, force: false}).then((data) => {
    logger.info("Database connection established")
}).catch((err) => {
    logger.error(err)
})

export default app;