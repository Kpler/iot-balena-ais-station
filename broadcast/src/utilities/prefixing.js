import {calculateChecksum} from "./utils.js";
import config from "../config.js";
const getPrefix = () => {
    const stationId = config.app.stationId ? config.app.stationId : '5320';
    const token = config.app.output.token ? config.app.output.token : '';

    const prefixData = `s:${stationId},t:${token},c:${Date.now()}`;

    return `\\${prefixData}*${calculateChecksum(prefixData)}\\`;
};

export {
    getPrefix,
};
