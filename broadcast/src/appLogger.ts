import config from "./config";
import pino from "pino";

const logLevel:string = config.logger.level;

const logger = pino({level: logLevel});

export default logger;
