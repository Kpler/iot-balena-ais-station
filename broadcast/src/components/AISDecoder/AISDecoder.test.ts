import AISDecoder from './AISDecoder';
import m from './AISDecoder.mock';

describe('testing AIS decoder', () => {
    let aisDecoder: AISDecoder;
    beforeAll(() => {
        aisDecoder = new AISDecoder();
    });
    test('should decode correct all the list with single part messages', () => {
        m.decodedNMEAMessagesSinglePartScenario.forEach((message) => {
            expect(aisDecoder.decode(message.input)).toEqual(message.output);
        })
    });
    test('should decode correct all the list with multi part messages', () => {
        m.decodedNMEAMessagesMultiPartScenario.forEach((message) => {
            expect(aisDecoder.decode(message.input)).toEqual(message.output);
        });
    });
    test('should decode correct all the list with real time messages', () => {
        m.decodedNMEAMessagesRealTimeScenario.forEach((message) => {
            expect(aisDecoder.decode(message.input)).toEqual(message.output);
        });
    });
    test('should not decode a unsupported message and return the raw messages', () => {
        expect(aisDecoder.decode(m.decodedNMEAMessagesUnsupportedScenario.input)).toEqual(m.decodedNMEAMessagesUnsupportedScenario.output);
    });
    test('should not decode a invalid message and return the raw messages', () => {
        expect(aisDecoder.decode(m.decodedNMEAMessagesInvalidScenario.input)).toEqual(m.decodedNMEAMessagesInvalidScenario.output);
    });
});
