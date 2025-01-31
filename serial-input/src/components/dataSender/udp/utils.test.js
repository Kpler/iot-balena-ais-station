import { dnsLookup } from './utils.js';

describe('Testing Utils', () => {
    describe('Testing dns lookup', () => {
        test('with hostname', () => {
            dnsLookup('localhost', (address) => expect(address).toBe('127.0.0.1'), 0);
        });
        test('with ip', () => {
            dnsLookup('8.8.8.8', (address) => expect(address).toBe('8.8.8.8'), 0);
        });
    });
});
