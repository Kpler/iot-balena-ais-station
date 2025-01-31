import dgram from 'dgram';
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

    sendData(data) {
        this.server.send(data, this.destinationPort, this.multicastAddress);
    }
}

export default Multicast;
