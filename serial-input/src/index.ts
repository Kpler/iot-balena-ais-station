import {Transform, Writable} from 'stream';
import SerialPort from 'serialport';
import C from './config';
import L from './appLogger'
import HexNMEAParser from './components/hexNMEAParser/index';
import NMEAParser from './components/nmeaParser/index';
import {Multicast} from "./components/dataSender";
import {TransformCallback} from "node:stream";

const input:()=> SerialPort = (): SerialPort => {
    const port = C.app.serial;
    const baudRate = +C.app.baudRate;

    const serialInput = new SerialPort(port, {baudRate});

    serialInput.on('open', () => {
        L.info(`serial ${port} ${baudRate} opened`);
    });
    serialInput.on('error', (err: { message: any; }) => {
        L.error(`Error on serial ${port}:${err.message}`);
    });
    serialInput.on('data', (data: { toString: () => any; }) => {
        L.debug(`Data received: ${data.toString()}`);
    });

    return serialInput;
};

const parser:()=>Transform = ():Transform => {
    const parser:HexNMEAParser | NMEAParser = C.app.isHexParserEnabled ?
        new HexNMEAParser()
        : new NMEAParser();

    return new Transform({
        encoding: 'ascii',
        transform(chunk:Buffer, encoding:BufferEncoding, callback:TransformCallback):void {
            L.debug(`parser input: ${chunk.toString()}`)
            const nmeaMessages = parser.parseData(chunk);
            L.debug(`parser output: ${nmeaMessages}`)
            nmeaMessages.forEach((message => this.push(message)));
            callback();
        }
    });
};

const output:()=>Writable = ():Writable => {
    const host:string = C.app.output.host;
    const port:number = +C.app.output.port;
    const isRawMode:boolean = C.app.isRawModeEnabled;

    let output:Multicast = new Multicast(port, host);

    return new Writable({
        write(chunk:any, encoding:BufferEncoding, callback) {
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
