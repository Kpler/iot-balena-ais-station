import dgram from 'dgram';

import InputStream from './InputStream';
import L from '../../appLogger';
import {AddressInfo} from "node:net";

class MulticastServerInputStream extends InputStream {
    private readonly inputFeed: dgram.Socket

    constructor(port:number, multicastAddress:string) {
        super();
        this.inputFeed = dgram.createSocket('udp4');
        this.#openInputFeed(port, multicastAddress);
    }

    #openInputFeed(port:number, multicastAddress:string):void {
        this.inputFeed.on('listening', ():void => {
            const address:AddressInfo = this.inputFeed.address();
            L.info(`Input Feed listening on ${address.address}:${address.port}`);
            this.inputFeed.setBroadcast(true);
            this.inputFeed.addMembership(multicastAddress);
        });
        this.inputFeed.bind(port);
        this.inputFeed.on('message', (message:Buffer):void => {
            L.debug(`Message feed =>${message}<=`);
            super.write(message.toString().trim());
        });

        this.inputFeed.on('error', (err:Error):void => {
           L.error('UDP ERROR ' + err.message);
        });
    }

}

export default MulticastServerInputStream;
