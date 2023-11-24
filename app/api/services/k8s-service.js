import k8s, { CustomObjectsApi } from '@kubernetes/client-node';
import logger from '../logger/index.js';
import dotenv from 'dotenv';
dotenv.config();

const kc = new k8s.KubeConfig();
kc.loadFromDefault();

const k8sApi = kc.makeApiClient(CustomObjectsApi);

const group = 'csye7125-fall2023-group07.operator.souvikdinda.me';
const version = 'v1';
const plural = 'httpchecks';
const namespace = process.env.CR_NAMESPACE;

export const createHttpCheckResource = async (data) => {
    const body = {
        apiVersion: `${group}/${version}`,
        kind: 'HttpCheck',
        metadata: {
            name: `httpcheck-${data.name}`,
            namespace: namespace,
        },
        spec: {
            name: data.name,
            uri: data.uri,
            isPaused: data.is_paused,
            checkInterval: data.check_interval_in_seconds,
            numRetries: data.num_retries,
            responseStatusCode: data.response_status_code,
        },
    };

    try {    
        logger.info(`Checking if HttpCheck httpcheck-${data.name} already exists`); 
        const existingCR = await checkExistingCR(data.name);
        if (!existingCR) {
            const response = await k8sApi.createNamespacedCustomObject(group, version, namespace, plural, body);
            logger.info(`HttpCheck created/updated named httpcheck-${data.name}`);
            return response.body;
        }
    } catch (error) {
        logger.error('Error creating/updating CR:', error.body);
        return false;
    }
}

export const updateHttpCheckResource = async (data) => {
    try {
        const existingCR = await k8sApi.getNamespacedCustomObject(group, version, namespace, plural, `httpcheck-${data.name}`);
        const resourceVersion = existingCR.body.metadata.resourceVersion;

        const body = {
            apiVersion: `${group}/${version}`,
            kind: 'HttpCheck',
            metadata: {
                name: `httpcheck-${data.name}`,
                namespace: namespace,
                resourceVersion: resourceVersion,
            },
            spec: {
                name: data.name,
                uri: data.uri,
                isPaused: data.is_paused,
                checkInterval: data.check_interval_in_seconds,
                numRetries: data.num_retries,
                responseStatusCode: data.response_status_code,
            },
        };

        const response = await k8sApi.replaceNamespacedCustomObject(group, version, namespace, plural, `httpcheck-${data.name}`, body);
        logger.info(`HttpCheck updated with name httpcheck-${data.name}`);
        return response.body;
    } catch (error) {
        logger.error('Error creating/updating CR:', error.body);
        return false;
    }
}

const checkExistingCR = async (name) => {
    try {
        const checkCR = await k8sApi.getNamespacedCustomObject(group, version, namespace, plural, `httpcheck-${name}`);
        return true;
    } catch (error) {
        return false
    }
}

export const deleteHttpCheckResource = async (name) => {
    try {
        const response = await k8sApi.deleteNamespacedCustomObject(group, version, namespace, plural, `httpcheck-${name}`);
        logger.info(`HttpCheck ${name} deleted from k8s`);
        return response.body;
    } catch (error) {
        logger.error('Error deleting CR:', error.response ? error.response.body : error.message);
        return false;
    }
}
