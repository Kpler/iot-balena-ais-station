import dgram from "dgram";
import L from '../../../appLogger.js';
import { dnsLookup } from './utils.js';

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
        }

        this.#udpClient.send(data, this.#serverPort, this.#serverHost, (error) => {
            if (error) {
                L.error('error on UDP data send: ');
                L.error(error);
            }
        });
    }
}

export default UDP;
