import { DataTypes } from "sequelize";
import sequelize from "./index.js";

const httpcheck = sequelize.define('httpcheck', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
        readOnly: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    uri: {
        type: DataTypes.STRING,
        allowNull: false
    },
    is_paused: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    num_retries: {
        type: DataTypes.INTEGER,
        allowNull: false,
        Range: {
            min: 0,
            max: 5
        }
    },
    uptime_sla: {
        type: DataTypes.INTEGER,
        allowNull: false,
        Range: {
            min: 0,
            max: 100
        }
    },
    response_time_sla: {
        type: DataTypes.INTEGER,
        allowNull: false,
        Range: {
            min: 0,
            max: 100
        }
    },
    use_ssl: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    response_status_code: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 200
    },
    check_interval_in_seconds: {
        type: DataTypes.INTEGER,
        allowNull: false,
        Range: {
            min: 0,
            max: 86400
        }
    },
}, {
    timestamps: true,
    createdAt: 'check_created',
    updatedAt: 'check_updated',
    freezeTableName: true
});

export default httpcheck;