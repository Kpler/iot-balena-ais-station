const calculateNMEAMessageChecksum = (message) => calculateChecksum(clearNMEAMessageFromChecksumAndNMEAStartChar(message));

const clearNMEAMessageFromChecksumAndNMEAStartChar = (message) => {
    const startIndex = findNMEAStartIndex(message) + 1;
    const endIndex = message.includes("*") ? message.indexOf('*') : message.length;

    return message.substring(startIndex, endIndex);
};

const exportChecksumFromNMEAMessage = (message) => message.substring(message.length - 2);

const findNMEAStartIndex = (message) => {
    if (message.indexOf('!') !== -1) {
        return message.indexOf('!');
    } else if (message.indexOf('$') !== -1) {
        return message.indexOf('$');
    }
    return null;
}

const calculateChecksum = (text) => {
    let checksum = 0;

    // For each char in the text
    for (let i = 0; i < text.length; i++) {
        checksum ^= text.charCodeAt(i);
    }

    // convert checksum to hex
    let hex = Number(checksum).toString(16).toUpperCase();
    if (hex.length < 2) {
        hex = ('00' + hex).slice(-2);
    }

    return hex;
};

const convertHexToBinaryString = (msg) => {
    const charArray = msg.split('');
    const stringBuilder = [];

    charArray.forEach((cChar) => {
        const i = parseInt(cChar, 16);
        stringBuilder.push(String(`0000${Number(i).toString(2)}`).slice(-4));
    });

    return stringBuilder.join('');
}

const convertBinary6BitASCIIToASCII = (binary) => {
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

const isHexMessageValid = (hexMessage) => {
    const regex = new RegExp('2c(.*?)0d0a', 'ig');
    const match = regex.exec(hexMessage);

    return match !== null;
};

const findReceiverChannelFromHexMessage = (hexMessage) => {
    const regex = new RegExp('2c(.*?)0d0a', 'ig');
    const match = regex.exec(hexMessage);

    let channel;
    switch (match[1]) {
        case '41':
        default:
            channel = 'A';
            break;
        case '42':
            channel = 'B';
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
