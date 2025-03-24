import * as prefix from './prefixing'
import config from "../config";

describe('testing prefixing utility', () => {
    describe(`checking getPrefix functionality. Prefix has the structure s:$\{stationId},t:$\{token}c:$\{timestamp}`, () => {
        const RealDate = Date.now;
        let replacedStationId = jest.replaceProperty(config.app, 'stationId', '12345');
        let replacedToken = jest.replaceProperty(config.app.output, 'token', 'aVeryLongToken');
        beforeEach(() => {

            global.Date.now = jest.fn(() => new Date('2022-01-19T10:20:30Z').getTime());
        });
        afterAll(() => {
            replacedToken.restore()
            replacedStationId.restore()
            global.Date.now = RealDate;
        })
        const timestamp = '1642587630000';

        test('should return prefixing with changed values', () => {
            expect(prefix.getPrefix()).toEqual(`\\s:${config.app.stationId},t:${config.app.output.token},c:${timestamp}*79\\`);
        });

    });

    describe('checking getPrefix functionality with default values', () => {
        const RealDate = Date.now;
        beforeEach(() => {
            global.Date.now = jest.fn(() => new Date('2022-01-19T10:20:30Z').getTime());
        });
        afterAll(() => {
            global.Date.now = RealDate;
        })
        const timestamp = '1642587630000';
        test('should return prefixing with default values', () => {
            expect(prefix.getPrefix()).toEqual(`\\s:5320,t:,c:${timestamp}*64\\`);
        });
    });
});
