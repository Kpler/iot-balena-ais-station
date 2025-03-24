import dns from 'dns';

type DnsCallback = (address: string) => void;

const dnsLookup: (host: string, cb: DnsCallback, timeout: number, family: number) => void = (host: string, cb: DnsCallback, timeout: number, family: number = 4): void => {
    dns.lookup(host, (err: NodeJS.ErrnoException | null, address: string, family: number) => {
        cb(address);
    });

    if (timeout > 0) {
        setTimeout(() => {
            dnsLookup(host, cb, timeout, family);
        }, timeout);
    }
};

const calculateChecksum = (text: string): string => {
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

export {
    dnsLookup,
    calculateChecksum,
};
