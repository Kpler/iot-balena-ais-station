import {Transform, TransformCallback, Writable} from "stream";
import L from './appLogger';
import AISDecoder from './components/AISDecoder/index';
import Downsampling from './components/downsampling/index';
import * as dataSend from './components/dataSender/index';
import * as inputStream from './components/inputStream/index';
import {getPrefix} from './utilities/prefixing';
import config from "./config";

const inputType = config.app.input.type;
const inputHost = config.app.input.host;
const inputPort = +config.app.input.port;

const outputHost = config.app.output.host;
const outputPort = +config.app.output.port;
const sendMode = config.app.output.sendMode;
const isDataSendEnabled = config.app.output.isDataSendEnabled;
const downsamplingRate = +config.app.downSampling;

L.info('starting broadcast');

const aisDecoder: () => Transform = (): Transform => {
    const aisDecoder = new AISDecoder();

    return new Transform({
        writableObjectMode: true,
        transform(chunk: Buffer, encoding: BufferEncoding, callback: TransformCallback): void {
            const aisObj = aisDecoder.decode(chunk.toString());
            L.debug(`Decoded AIS obj: ${aisObj && JSON.stringify(aisObj)}`);

            if (aisObj) {
                this.push(JSON.stringify(aisObj));
            }
            callback();
        },
    })
};

const downsampling: () => Transform = (): Transform => {
    const ds = new Downsampling(downsamplingRate);

    return new Transform({
        writableObjectMode: true,
        transform(chunk: Buffer, encoding: BufferEncoding, callback: TransformCallback): void {
            const aisObj = JSON.parse(chunk.toString());
            if (ds.sampling(aisObj)) {
                aisObj.rawMessages.forEach((message: string): void => {
                    this.push(message);
                });
            }
            callback();
        },
    })
};

const output: () => Writable = (): Writable => {
    let output;
    switch (sendMode) {
        case 'tcp': {
            output = new dataSend.TCP(outputPort, outputHost,);
            break;
        }
        case 'udp':
        default: {
            output = new dataSend.UDP(outputPort, outputHost);
        }
    }

    return new Writable({
        write(chunk: Buffer, encoding: BufferEncoding, callback: () => void): void {
            const dataToSend = `${getPrefix()}${chunk.toString()}\r\n`;
            if (isDataSendEnabled) {
                const sendDataStatus = output.sendData(dataToSend);
                if (sendDataStatus) {
                    L.debug(`Data sent: ${dataToSend}`);
                }
            }
            callback();
        },
        final(callback: () => void): void {
            callback();
        }
    });
};

let input;
L.info(`Input Type: ${inputType}`);
switch (inputType) {
    case 'MULTICAST': {
        input = new inputStream.MulticastServerInputStream(inputPort, inputHost).dataInputStream;
        break;
    }
    case 'UDP_SERVER':
    default: {
        input = new inputStream.UDPServerInputStream(inputPort).dataInputStream;
    }
}

input
    .pipe(aisDecoder())
    .pipe(downsampling())
    .pipe(output());
