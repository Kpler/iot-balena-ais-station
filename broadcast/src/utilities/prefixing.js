import {calculateChecksum} from "./utils.js";

const getPrefix = () => {

    const prefixData = `c:${Date.now()}`;

    return `\\${prefixData}*${calculateChecksum(prefixData)}\\`;
};

export {
    getPrefix,
};
