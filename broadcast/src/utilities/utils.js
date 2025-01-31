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

export {
    dnsLookup,
};
