import dgram from 'dgram';

import InputStream from './InputStream.js';
import L from '../../appLogger.js';

class MulticastServerInputStream extends InputStream {
    #inputFeed

    constructor(port, multicastAddress) {
        super();

        this.#openInputFeed(port, multicastAddress);
    }

    #openInputFeed(port, multicastAddress) {
        this.#inputFeed = dgram.createSocket('udp4');

        this.#inputFeed.on('listening', () => {
            const address = this.#inputFeed.address();
            L.info(`Input Feed listening on ${address.address}:${address.port}`);
            this.#inputFeed.setBroadcast(true);
            this.#inputFeed.addMembership(multicastAddress);
        });
        this.#inputFeed.bind(port);
        this.#inputFeed.on('message', (message) => {
            L.debug(`Message feed =>${message}<=`);
            super.write(message.toString().trim());
        });

        this.#inputFeed.on('error', (err) => {
           L.error('UDP ERROR ' + err.message);
        });
    }

}

export default MulticastServerInputStream;
