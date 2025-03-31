import dgram from "dgram";
import L from '../../../appLogger';
import {dnsLookup} from '../../../utilities/utils';

class UDP {
    private readonly udpClient: dgram.Socket;
    private serverHost: string | undefined;
    private readonly serverPort:number;

    constructor(port: number, host: string) {
        this.udpClient = dgram.createSocket('udp4');
        dnsLookup(host, (address: string):string => this.serverHost = address, 60000);
        this.serverPort = port;
    }

    sendData(data: string): boolean {
        if (this.serverHost === null || this.serverHost === undefined || this.serverHost === '') {
            L.warn(`No valid host: ${this.serverHost}`);
            return false;
        }

        this.udpClient.send(data, this.serverPort, this.serverHost, (error: Error | null): void => {
            if (error) {
                L.error('error on UDP data send: ');
                L.error(error);
            }
        });
        return true;
    }
}

export default UDP;
