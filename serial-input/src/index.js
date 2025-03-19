import {Transform, Writable} from 'stream';
import SerialPort from 'serialport';

import C from './config.js';
import L from './appLogger.js'
import HexNMEAParser from './components/hexNMEAParser/index.js';
import NMEAParser from './components/nmeaParser/index.js';
import * as dataSend from './components/dataSender/index.js';

const input = () => {
    const port = C.app.serial;
    const baudRate = C.app.baudRate;

    const serialInput = new SerialPort(port, {baudRate});

    serialInput.on('open', () => {
        L.info(`serial ${port} ${baudRate} opened`);
    });
    serialInput.on('error', (err) => {
        L.error(`Error on serial ${port}:${err.message}`);
    });
    serialInput.on('data', (data) => {
        L.debug(`Data received: ${data.toString()}`);
    });

    return serialInput;
};

const parser = () => {
    const parser = C.app.isHexParserEnabled ?
        new HexNMEAParser()
        : new NMEAParser();

    return new Transform({
        encoding: 'ascii',
        transform(chunk, encoding, callback) {
            L.debug(`parser input: ${chunk.toString()}`)
            const nmeaMessages = parser.parseData(chunk);
            L.debug(`parser output: ${nmeaMessages}`)
            nmeaMessages.forEach((message => this.push(message)));
            callback();
        }
    });
};

const output = () => {
    const host = C.app.output.host;
    const port = C.app.output.port;
    const isRawMode = C.app.isRawModeEnabled;

    let output = new dataSend.Multicast(port, host);

    return new Writable({
        write(chunk, encoding, callback) {
            const timestamp = new Date().getTime();
            const data = {
                type: "serial",
                timestamp,
                sentence: chunk.toString(),
            };
            L.debug(`send data to ${host} ${port}`);
            output.sendData(isRawMode ? data.sentence : JSON.stringify(data));
            callback();
        },
        final(callback) {
            L.debug('stream finalized');
            callback();
        }
    });
};

L.info('Serial input started');
input()
    .pipe(parser())
    .pipe(output());
