import NMEAParser from './NMEAParser';
import rawInput from './NMEAParser.mock';

describe('Testing NMEA Parser', () => {
    test('should return all the expected NMEA messages', () => {
        const parser = new NMEAParser();
        rawInput.forEach(({input, output}) => {
            expect(parser.parseData(input)).toEqual(output);
        })
    });
});
