import dgram from "dgram";
import UDP from './UDP';

jest.mock("dgram");
jest.mock('./utils',() => ({
    dnsLookup: jest.fn(),
}));

describe('testing udp data send', () => {
    const dataSend = 'test';
    let udpClient;
    beforeEach(() => {
        // Clear all instances and calls to constructor and all methods:
        dgram.createSocket.mockClear();
        udpClient = new UDP(33333, '127.0.0.1');
    });

    describe('with no error in response', () => {
        dgram.createSocket = jest.fn(() => {
            let callbacks = {};
            return {
                send: jest.fn(),
            };
        });

        test('should send data to UDP server', () => {
            udpClient.sendData(dataSend);
            expect(dgram.createSocket).toHaveBeenCalledTimes(1);
        });
    });
    describe('with error in response', () => {
        dgram.createSocket = jest.fn(() => {
            let callbacks = {};
            return {
                send: jest.fn((data, serverPort, serverHost, cb) => {
                    cb(new Error('error'));
                }),
            };
        });

        test('should send data to UDP server', () => {
            udpClient.sendData(dataSend);
            expect(dgram.createSocket).toHaveBeenCalledTimes(1);
        });
    });
});
