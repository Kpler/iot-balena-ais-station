import {Utils as U} from "@kpler/iot-utilities";
const getPrefix = () => {

    const prefixData = `c:${Date.now()}`;

    return `\\${prefixData}*${U.calculateChecksum(prefixData)}\\`;
};

export {
    getPrefix,
};
