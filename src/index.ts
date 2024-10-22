import express from "express";
import cors from "cors";
import helmet from "helmet";
import { cleanEnv, str, port } from "envalid";
import dotenv from "dotenv";
import mongoose from "mongoose";
import routes from "./routes";
import errorHandler from "./middlewares/errorHandler";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerOptions from "./config/swaggerConfig";
import swaggerUi from 'swagger-ui-express';

dotenv.config();

const env = cleanEnv(process.env, {
    MONGO_URI: str(),
    PORT: port({ default: 8080 })
});

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

const swaggerSpec = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'My API Docs',
}));

app.use("/api", routes);

app.use(errorHandler);

mongoose
    .connect(env.MONGO_URI)
    .then(() => {
        app.listen(env.PORT, () => {
            console.log(`Server is running on port ${env.PORT}`);
        });
    })
    .catch((err) => {
        console.error('Database connection error', err);
    });