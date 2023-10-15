import bcrypt from 'bcrypt';
import User from '../models/user-model.js'
import logger from '../logger/index.js'

// Check if credentials match
export const authenticateUser = async (username, password) => {
    try {
        const auth = await User.findOne({where: {username}});
        if(auth !== null) {
            const hashPassword = auth.password;
            return bcrypt.compareSync(password, hashPassword);
        } else {
            return false
        }
    } catch(error) {
        logger.error(`UserService: ${error}`)
        return {error: error}
    }
}

export const getAllUsers = async () => {
    try {
        const response = await User.findAll({attributes: {exclude: ['password']}});
        return response;
    } catch(error) {
        logger.error(`UserService: ${error}`)
        return {error: error}
    }
}

// Check if user exists for given username
export const authorizeAndGetUser = async (id, username) => {
    try {
        const response = await User.findOne({where: {username}},{attributes: {exclude: ['password']}});
        if(response.id === id) {
            response.dataValues.password = undefined;
            return response;
        } else {
            return false;
        }
    } catch(error) {
        logger.error(`UserService: ${error}`)
        return {error: error}
    }
}

// Insert data for user creation
export const saveUser = async (userData) => {
    // Hashing password
    try {
        
        const {first_name, last_name, password, username} = userData;

        const userEsists = await User.findOne({where: {username}});
        if(userEsists) {
            return false
        } else {
            const hash = bcrypt.hashSync(password, 10);
            const response = await User.create({first_name, last_name, password: hash, username});
            if(response) {
                response.dataValues.password = undefined;
                return response;
            }
        }
    } catch(error) {
        logger.error(`UserService: ${error}`)
        return {error: error}
    }
}

// Update data for user
export const update =  async (id, data) => {
    try {
        if(!(data.password === undefined || data.password === "")) {
            const {password} = data;
            const hash = bcrypt.hashSync(password, 10);
            data.password = hash;
        }
        const user = await User.findOne({where: {id}});
        const response = await user.update(data);
        if(response) {
            response.dataValues.password = undefined;
            return response;
        }
    } catch(err) {
        logger.error(`UserService: ${err}`)
        return {error: err}
    }

}