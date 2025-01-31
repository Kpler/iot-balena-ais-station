import {Logger as L} from '@kpler/iot-utilities';
import config from "./config.js";

const project = config.logger.project
const staticHost = config.logger.hostname;

const logLevel = config.logger.level;
const destination = config.logger.destination;
const logUrl = config.logger.logUrl;
const logApiKey = config.logger.logApiKey;
const logMetaData = {
    service: config.device.service,
    tags: `env:${config.env},project:${project},uuid:${config.device.uuid}`,
    hostname: staticHost
};

const logger = L.createLogger({destination, url: logUrl, apiKey: logApiKey}, logLevel, logMetaData);

export default logger;
