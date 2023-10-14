import express from "express";
import cors from "cors";
import * as routes from "./routes/index.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

app.use((err, req, res, next) => {
    if (err instanceof SyntaxError) {
        res.status(400).json();
    } else {
        next();
    }
});

app.all('*', (req, res, next) => {
    if (req.originalUrl === '/' || req.originalUrl.startsWith('/healthz')) {
        next();
    } else {
        res.status(404).json();
    }
});

routes.healthCheck(app);
routes.currentDateTime(app);

export default app;