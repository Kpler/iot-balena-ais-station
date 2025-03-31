import dgram from 'dgram';

import InputStream from './InputStream';
import L from '../../appLogger';

class UDPServerInputStream extends InputStream {
    private readonly inputFeed:dgram.Socket;

    constructor(port:number) {
        super();
        this.inputFeed = dgram.createSocket('udp4');
        this.#openInputFeed(port);
    }

    #openInputFeed(port:number):void {
        this.inputFeed.on('listening', () => {
            const address = this.inputFeed.address();
            L.info(`Input Feed listening on ${address.address}:${address.port}`);
        });
        this.inputFeed.bind(port);
        this.inputFeed.on('message', (message: Buffer): void => {
            L.debug(`Message feed =>${message}<=`);
            this.write(message.toString().trim());
        });
        this.inputFeed.on('error', (err) => {
            L.error('UDP ERROR ' + err.message);
        });
    }

    write(message: string): void {
        super.write(message);
    }

}

export default UDPServerInputStream;
