import dgram from 'dgram';

import InputStream from './InputStream';
import L from '../../appLogger';

class UDPServerInputStream extends InputStream {
    #inputFeed;

    constructor(port) {
        super();
        this.#openInputFeed(port);
    }

    #openInputFeed(port) {
        this.#inputFeed = dgram.createSocket('udp4');
        this.#inputFeed.on('listening', () => {
            const address = this.#inputFeed.address();
            L.info(`Input Feed listening on ${address.address}:${address.port}`);
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

export default UDPServerInputStream;
