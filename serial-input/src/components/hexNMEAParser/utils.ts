const calculateNMEAMessageChecksum = (message:string):string => calculateChecksum(clearNMEAMessageFromChecksumAndNMEAStartChar(message));

const clearNMEAMessageFromChecksumAndNMEAStartChar:(message:string) =>string = (message:string):string => {
    const startIndex = findNMEAStartIndex(message) + 1;
    const endIndex = message.includes("*") ? message.indexOf('*') : message.length;

    return message.substring(startIndex, endIndex);
};

const exportChecksumFromNMEAMessage = (message:string):string => message.substring(message.length - 2);

const findNMEAStartIndex:(message:string)=>number = (message:string):number => {
    if (message.indexOf('!') !== -1) {
        return message.indexOf('!');
    } else if (message.indexOf('$') !== -1) {
        return message.indexOf('$');
    }
    return 0;
}

const calculateChecksum:(text:string)=>string = (text:string):string => {
    let checksum = 0;

    for (let i = 0; i < text.length; i++) {
        checksum ^= text.charCodeAt(i);
    }

    let hex = Number(checksum).toString(16).toUpperCase();
    if (hex.length < 2) {
        hex = ('00' + hex).slice(-2);
    }

    return hex;
};

const convertHexToBinaryString:(msg:string)=>string = (msg:string):string => {
    const charArray:string[] = msg.split('');
    const stringBuilder:string[] = [];

    charArray.forEach((cChar) => {
        const i = parseInt(cChar, 16);
        stringBuilder.push(String(`0000${Number(i).toString(2)}`).slice(-4));
    });

    return stringBuilder.join('');
}

const convertBinary6BitASCIIToASCII:(binary:string)=>string = (binary:string):string => {
    const decodedString = [];

    for (let i = 0; i < binary.length / 6; ++i) {
        let c = parseInt(binary.slice(i * 6, i * 6 + 6), 2);

        if (c >= 0 && c <= 39) {
            c += 48;
            decodedString.push(String.fromCharCode(c));
        } else if (c >= 40 && c <= 64) {
            c += 56;
            decodedString.push(String.fromCharCode(c));
        }
    }
    return decodedString.join('');
}

const isHexMessageValid:(hexMessage:string)=>boolean = (hexMessage:string):boolean => {
    const regex = /2c(.*?)0d0a/ig;
    const match = regex.exec(hexMessage);

    return match !== null;
};

const findReceiverChannelFromHexMessage:(hexMessage:string)=>string = (hexMessage:string):string => {
    const regex = /2c(.*?)0d0a/ig;
    const match = regex.exec(hexMessage);
    if (match === null) {
        return '';
    }
    let channel;
    switch (match[1]) {
        case '42':
            channel = 'B';
            break;
        case '41':
        default:
            channel = 'A';
            break;
    }

    return channel;
};

export {
    calculateNMEAMessageChecksum,
    clearNMEAMessageFromChecksumAndNMEAStartChar,
    exportChecksumFromNMEAMessage,
    findNMEAStartIndex,
    calculateChecksum,
    convertHexToBinaryString,
    convertBinary6BitASCIIToASCII,
    isHexMessageValid,
    findReceiverChannelFromHexMessage,
};
