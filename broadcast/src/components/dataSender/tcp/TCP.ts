import {Socket} from 'net';
import L from '../../../appLogger';

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
        //reconnect every 1 day
        setInterval(() => this.reconnect(), 86400000)
    }

    connect() {
        L.info(`Try to connect with server ${this.#serverHost}:${this.#serverPort}`);
        this.#tcpClient = new Socket();
        this.#tcpClient.on('error', (err) => {
            L.error('TCP ERROR ' + err.code);
            L.error(err);
            this.reconnect();
        });
        this.#tcpClient.on('timeout', (err) => {
            L.warn('Connection timeout');
            if (err) {
                L.error(err);
            }
            this.reconnect();
        });
        this.#tcpClient.on('end', (err) => {
            L.info('Connection end');
            if (err) {
                L.error(err);
            }
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
            return false;
        }

        return this.#tcpClient.write(data);
    }
}


export default TCP;
