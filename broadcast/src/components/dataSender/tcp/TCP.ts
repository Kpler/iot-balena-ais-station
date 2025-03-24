import {Socket} from 'net';
import L from '../../../appLogger';

class TCP {
    private tcpClient: Socket | undefined;
    private readonly serverHost: string;
    private readonly serverPort: number;
    private connected: boolean = false;
    private intervalConnect: NodeJS.Timeout | null = null;

    constructor(port: number, host: string) {
        this.serverHost = host;
        this.serverPort = port;

        this.connect();
        //reconnect every 1 day
        setInterval((): void => this.reconnect(), 86400000)
    }

    connect() {
        L.info(`Try to connect with server ${this.serverHost}:${this.serverPort}`);
        this.tcpClient = new Socket();
        this.tcpClient.on('error', (err: Error): void => {
            L.error('TCP ERROR ' + err.message);
            L.error(err);
            this.reconnect();
        });
        this.tcpClient.on('timeout', (err: Error): void => {
            L.warn('Connection timeout');
            if (err) {
                L.error(err);
            }
            this.reconnect();
        });
        this.tcpClient.on('end', (err: Error): void => {
            L.info('Connection end');
            if (err) {
                L.error(err);
            }
            this.reconnect();
        });
        this.tcpClient.connect(this.serverPort, this.serverHost, (): void => {
            this.connected = true;
            this.clearIntervalConnect()
            L.info(`TCP connection established with server ${this.serverHost}:${this.serverPort}`);
        });
    }

    reconnect(): void {
        if (this.tcpClient === undefined) {
            return;
        }
        L.info('Start reconnection');
        this.connected = false;
        this.tcpClient.destroy();
        this.launchIntervalConnect();
    }

    launchIntervalConnect(): void {
        if (this.intervalConnect !== null) {
            return;
        }
        this.intervalConnect = setInterval((): void => this.connect(), 30000);
    }

    clearIntervalConnect() {
        if (this.intervalConnect === null) {
            return
        }
        clearInterval(this.intervalConnect);
        this.intervalConnect = null;
    }

    sendData(data: string): boolean {
        if (!this.connected || this.tcpClient === undefined) {
            return false;
        }

        return this.tcpClient.write(data);
    }
}


export default TCP;
