import {dnsLookup} from './utils.js';

const expectedDnsResolvedDomains = ['127.0.0.1', '::1', '8.8.8.8'];

describe('Testing Utils', () => {
    describe('Testing dns lookup', () => {
        test('with hostname', () => {
            dnsLookup('localhost', (address) => {
                expect(expectedDnsResolvedDomains).toContain(address);
            }, 0);
        });

        test('with hostname', () => {
            dnsLookup('8.8.8.8', (address) => {
                expect(expectedDnsResolvedDomains).toContain(address);
            }, 0);
        });
    });
});