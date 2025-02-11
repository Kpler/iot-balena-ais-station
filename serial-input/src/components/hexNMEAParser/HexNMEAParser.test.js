import HexNMEAParser from './HexNMEAParser';
import M from './HexNMEAParser.mock';
import * as U from './utils';

describe('Testing HexParser', () => {
    let parser;
    beforeEach(() => {
        parser = new HexNMEAParser();
    });
    test('should return a array of valid nmea messages based on given raw hex data', () => {
        M.rawData.forEach(({input, output}) => {
            expect(parser.parseData(input)).toEqual(output);
        });
    });
    test('should parse correct all the given hex messages to NMEA messages', () => {
        M.hexToNMEAParser.forEach(({hex, nmea}) => {
            expect(parser._parseHexToNMEAMessage(hex)).toEqual(nmea);
        });
    });
    describe('testing _splitRawDataToMessages functionality', () => {
        test('should split the input to HexNMEA messages', () => {
            M.rawData.forEach(({input, splitRawDataToMessagesOutput}) => {
                expect(parser._splitRawDataToMessages(input)).toEqual(splitRawDataToMessagesOutput);
            })
        });
    });
    describe('testing Multipart validation functionality', () => {
        test('should return true if the given message length is greater than 60 chars.', () => {
            M.multiPartMessages.forEach(({hex}) => {
                let payload = U.convertBinary6BitASCIIToASCII(U.convertHexToBinaryString(hex.slice(0, hex.length - 8)));
                expect(parser._isMultipart(payload)).toBe(true);
            });
        });
        test('should return false if the given message length is not greater than 60 chars.', () => {
            M.singlePartMessages.forEach(({hex}) => {
                let payload = U.convertBinary6BitASCIIToASCII(U.convertHexToBinaryString(hex.slice(0, hex.length - 8)));
                expect(parser._isMultipart(payload)).toBe(false);
            });
        });
    });
    describe('testing handleSinglePartMessage functionality', () => {
        test('should return valid NMEA single part message', () => {
            M.singlePartMessages.forEach(({hex, nmea}) => {
                let payload = U.convertBinary6BitASCIIToASCII(U.convertHexToBinaryString(hex.slice(0, hex.length - 8)));
                let channel = U.findReceiverChannelFromHexMessage(hex);
                expect(parser._handleSinglePartMessage(payload, channel)).toEqual(nmea);
            });
        });
    });
    describe('testing handleMultipartMessage functionality', () => {
        test('should return valid NMEA multipart message', () => {
            M.multiPartMessages.forEach(({hex, nmea}) => {
                let payload = U.convertBinary6BitASCIIToASCII(U.convertHexToBinaryString(hex.slice(0, hex.length - 8)));
                let channel = U.findReceiverChannelFromHexMessage(hex);
                expect(parser._handleMultipartMessage(payload, channel)).toEqual(nmea);
            });
        });
    });
});
