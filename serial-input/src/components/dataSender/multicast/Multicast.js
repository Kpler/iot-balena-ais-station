import dgram from 'dgram';
import { Transform } from 'stream';
import L from '../../../appLogger.js';

class Multicast {
    server;
    destinationPort;
    multicastAddress;

    constructor(destinationPort, multicastAddress) {
        this.server = dgram.createSocket('udp4');
        this.destinationPort = destinationPort;
        this.multicastAddress = multicastAddress;

        this.server.on('error', (err) => {
            L.error(`server error - Multicast destination - ${multicastAddress}:${destinationPort} - error: \n${err.stack}`);
            this.server.close();
        });

        this.server.on('listening', () => {
            const address = this.server.address();
            L.debug(`Multicast destination - ${multicastAddress}:${destinationPort} - server listening ${address.address}:${address.port}`);
            this.server.setBroadcast(true)
        });

        this.server.bind();
    }

    getMulticastStream(transformer = (text) => text) {
        const server = this.server;
        const destinationPort = this.destinationPort;
        const multicastAddress = this.multicastAddress;

        this.stream = new Transform({
            encoding: 'ascii',
            transform(chunk, encoding, callback) {
                const message = transformer(chunk.toString());

                if (message !== null) {
                    if (Array.isArray(message)) {
                        message.forEach(messageToSend => {
                            L.debug(`${multicastAddress}:${destinationPort} --> ${messageToSend}`);
                            server.send(messageToSend, destinationPort, multicastAddress);
                        });
                    } else {
                        L.debug(`${multicastAddress}:${destinationPort} --> ${message}`);
                        server.send(message, destinationPort, multicastAddress);
                    }
                }

                callback(null, chunk.toString());
            }
        });

        return this.stream;
    }

    sendData(data) {
        this.server.send(data, this.destinationPort, this.multicastAddress);
    }
}

export default Multicast;
