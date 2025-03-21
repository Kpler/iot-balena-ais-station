import dgram from "dgram";
import L from '../../../appLogger';
import { dnsLookup } from '../../../utilities/utils';

class UDP {
    #udpClient;
    #serverHost;
    #serverPort;

    constructor(port, host) {
        this.#udpClient = dgram.createSocket('udp4');
        dnsLookup(host, (address) => this.#serverHost = address, 60000);
        this.#serverPort = port;
    }

    sendData(data) {
        if (this.#serverHost === null || this.#serverHost === undefined || this.#serverHost === '') {
            L.warn(`No valid host: ${this.#serverHost}`);
            return false;
        }

        this.#udpClient.send(data, this.#serverPort, this.#serverHost, (error) => {
            if (error) {
                L.error('error on UDP data send: ');
                L.error(error);
            }
        });
        return true;
    }
}

export default UDP;
