import dns from 'dns';

const dnsLookup = (host, cb, timeout, family = 4) => {
    dns.lookup(host, (err, address, family) => {
        cb(address);
    });

    if (timeout > 0) {
        setTimeout(() => {
            dnsLookup(host, cb, timeout);
        }, timeout)
    }
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

export {
    dnsLookup,
    calculateChecksum,
};
