import { Socket } from 'net';
import L from '../../../appLogger.js';

class TCP {
    #tcpClient;
    #serverHost;
    #serverPort;
    #connected = false;
    #intervalConnect = null;

    constructor(port, host) {
        this.#serverHost = host;
        this.#serverPort = port;

        this.connect();
    }

    connect() {
        L.info(`Try to connect with server ${this.#serverHost}:${this.#serverPort}`);
        this.#tcpClient = new Socket();
        this.#tcpClient.on('error', (err) => {
            L.error('TCP ERROR ' + err.code);
            L.error(err);
            this.reconnect();
        });
        this.#tcpClient.on('timeout', () => {
            L.info('Connection timeout');
            this.reconnect();
        });
        this.#tcpClient.on('end', () => {
            L.info('Connection end');
            this.reconnect();
        });
        this.#tcpClient.connect(this.#serverPort, this.#serverHost, () => {
            this.#connected = true;
            this.clearIntervalConnect()
            L.info(`TCP connection established with server ${this.#serverHost}:${this.#serverPort}`);
        });
    }

    reconnect() {
        L.info('Start reconnection');
        this.#connected = false;
        this.#tcpClient.destroy();
        this.launchIntervalConnect();
    }

    launchIntervalConnect() {
        if (null !== this.#intervalConnect) {
            return;
        }
        this.#intervalConnect = setInterval(() => this.connect(), 30000);
    }

    clearIntervalConnect() {
        if (null === this.#intervalConnect) {
            return
        }
        clearInterval(this.#intervalConnect);
        this.#intervalConnect = null;
    }

    sendData(data) {
        if (!this.#connected) {
            return;
        }

        this.#tcpClient.write(data);
    }

}

export default TCP;

