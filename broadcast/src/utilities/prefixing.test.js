import * as prefix from './prefixing'
import {Utils as U} from "@kpler/iot-utilities";

describe('testing prefixing utility', () => {
    describe('checking getPrefix functionality. Prefix has the structure c:${timestamp}', () => {
        const RealDate = Date.now;
        beforeEach(() => {
            global.Date.now = jest.fn(() => new Date('2022-01-19T10:20:30Z').getTime());
        });
        afterAll(() => {
            global.Date.now = RealDate;
        })
        const timestamp = '1642587630000';
        test('should return prefixing with default values', () => {
            expect(prefix.getPrefix()).toEqual(`\\c:${timestamp}*67\\`);
        });
    });
    describe('checking calculateChecksum', () => {
        test('should return correct checksum (CheckSum8 Xor) for the given text', () => {
            expect(U.calculateChecksum('test test')).toEqual('20');
            expect(U.calculateChecksum('')).toEqual('00');
            expect(U.calculateChecksum('AIVDM,1,1,,A,13Td@e0P00QdWJ4Ec:N>4?vN2D=3,0')).toEqual('6A');
            expect(U.calculateChecksum('AIVDM,1,1,,B,137LEv00001dIkFEe3HJFR6J0PSm,0')).toEqual('79');
            expect(U.calculateChecksum('AIVDM,1,1,,B,13VL:l0P011csLTEf9udDgvR00SS,0')).toEqual('3F');
            expect(U.calculateChecksum('AIVDM,1,1,,B,13VL:l0P011csLTEf9udDgvR00SS,0')).toEqual('3F');
            expect(U.calculateChecksum('AIVDM,1,1,,B,13P=Lp00001dJ2DEe95L>7`N0@9C,0')).toEqual('52');
        });
    });
});
