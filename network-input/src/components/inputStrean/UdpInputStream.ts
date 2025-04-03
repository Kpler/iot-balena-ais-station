import {createSocket, RemoteInfo, Socket} from "node:dgram";
import {AddressInfo} from "node:net";

import InputStream from "./InputStream";
import L from "../../appLogger"


export default class UdpInputStream extends InputStream {
    private server: Socket;

    constructor() {
        super();
        this.server= createSocket('udp4');
        this.server.on('message', (msg: Buffer, rinfo: RemoteInfo ) => {
            L.debug(`UDP message from ${rinfo.address}:${rinfo.port} - ${msg}`);
            this.stream.write(msg.toString());
        });
        this.server.on('error', (err: Error) => {
            L.error(`UDP server error: ${err.message} - ${err.stack}`);
            this.server.close();
        });
        this.server.on('listening', () => {
            const address: AddressInfo = this.server.address();
            L.info(`UDP server listening on ${address.address}:${address.port}`);
        });
    }

    listen(port: number, host: string) {
        this.server.bind(port, host);
    }
}