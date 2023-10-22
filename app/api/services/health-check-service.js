import sequelize from "../models/index.js";

export const checkConnection = async () => {
    try {
        await sequelize.authenticate();
        return true;
    } catch (error) {
        return false;
    }
};