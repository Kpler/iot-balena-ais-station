import {dnsLookup} from './utils';
import {calculateChecksum} from "./utils";

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

describe('checking calculateChecksum', () => {
    test('should return correct checksum (CheckSum8 Xor) for the given text', () => {
        expect(calculateChecksum('test test')).toEqual('20');
        expect(calculateChecksum('')).toEqual('00');
        expect(calculateChecksum('AIVDM,1,1,,A,13Td@e0P00QdWJ4Ec:N>4?vN2D=3,0')).toEqual('6A');
        expect(calculateChecksum('AIVDM,1,1,,B,137LEv00001dIkFEe3HJFR6J0PSm,0')).toEqual('79');
        expect(calculateChecksum('AIVDM,1,1,,B,13VL:l0P011csLTEf9udDgvR00SS,0')).toEqual('3F');
        expect(calculateChecksum('AIVDM,1,1,,B,13VL:l0P011csLTEf9udDgvR00SS,0')).toEqual('3F');
        expect(calculateChecksum('AIVDM,1,1,,B,13P=Lp00001dJ2DEe95L>7`N0@9C,0')).toEqual('52');
    });
});