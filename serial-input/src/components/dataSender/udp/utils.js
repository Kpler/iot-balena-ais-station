import dns from 'dns';

const dnsLookup = (host, cb, timeout) => {
    dns.lookup(host, (err, address) => {
        cb(address);
    });

    if (timeout > 0) {
        setTimeout(() => {
            dnsLookup(host, cb, timeout);
        }, timeout)
    }
}

export {
    dnsLookup,
};
