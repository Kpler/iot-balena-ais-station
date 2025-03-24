import dgram from "dgram";
import UDP from './UDP';

jest.mock("dgram");
jest.mock('../../../utilities/utils',() => ({
    dnsLookup: jest.fn(),
}));

describe('testing udp data send', () => {
    const dataSend = 'test';
    let udpClient: UDP;
    beforeEach(():void => {
        // Clear all instances and calls to constructor and all methods:
        (dgram.createSocket as jest.Mock).mockClear();
        udpClient = new UDP(33333, '127.0.0.1');
    });

    describe('with no error in response', () => {
        (dgram.createSocket as jest.Mock).mockImplementation(() => {
            return {
                send: jest.fn(),
            } as unknown as dgram.Socket;
        });

        test('should send data to UDP server', () => {
            udpClient.sendData(dataSend);
            expect(dgram.createSocket).toHaveBeenCalledTimes(1);
        });
    });
    describe('with error in response', () => {
        (dgram.createSocket as jest.Mock).mockImplementation(() => {
            return {
                send: jest.fn(),
            } as unknown as dgram.Socket;
        });

        test('should send data to UDP server', () => {
            udpClient.sendData(dataSend);
            expect(dgram.createSocket).toHaveBeenCalledTimes(1);
        });
    });
});
