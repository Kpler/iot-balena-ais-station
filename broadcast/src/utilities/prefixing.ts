import {calculateChecksum} from "./utils";
import config from "../config";
const getPrefix:()=>string = ():string => {
    const stationId:string = +config.app.stationId ? config.app.stationId : '5320';
    const token:string = config.app.output.token ? config.app.output.token : '';

    const prefixData = `s:${stationId},t:${token},c:${Date.now()}`;

    return `\\${prefixData}*${calculateChecksum(prefixData)}\\`;
};

export {
    getPrefix,
};
