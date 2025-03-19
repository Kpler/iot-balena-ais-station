declare module 'serialport' {
    import { Readable } from 'stream';
    interface SerialPortOptions {
        baudRate?: number;
        dataBits?: number;
        stopBits?: number;
        parity?: string;
        bufferSize?: number;
        rtscts?: boolean;
        xonxoff?: boolean;
        autoOpen?: boolean;
    }
    type SerialPortEvent = 'open' | 'error' | 'data' | 'close';

    class SerialPort extends Readable {
        constructor(path: string, options?: SerialPortOptions);

        open(): void;
        close(callback?: () => void): void;
        write(data: string | Buffer, encoding?: string, callback?: (err: Error | null) => void): void;
        flush(callback?: (err: Error | null) => void): void;

        on(event: 'open', listener: () => void): this;
        on(event: 'error', listener: (err: Error) => void): this;
        on(event: 'data', listener: (data: Buffer) => void): this;
        on(event: 'close', listener: () => void): this;
    }

    export = SerialPort;
}
