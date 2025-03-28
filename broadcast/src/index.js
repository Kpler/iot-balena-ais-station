import { Writable, Transform } from "stream";
import L from './appLogger.js';
import AISDecoder from './components/AISDecoder/index.js';
import Downsampling from './components/downsampling/index.js';
import * as dataSend from './components/dataSender/index.js';
import * as inputStream from './components/inputStream/index.js';
import { getPrefix } from './utilities/prefixing.js';
import config from "./config.js";

const inputType = config.app.input.type;
const inputHost = config.app.input.host;
const inputPort = +config.app.input.port;

const outputHost = config.app.output.host;
const outputPort = +config.app.output.port;
const sendMode = config.app.output.sendMode;
const isDataSendEnabled = config.app.output.isDataSendEnabled;
const downsamplingRate = config.app.downSampling;

L.info('starting broadcast');

const aisDecoder = () => {
    const aisDecoder = new AISDecoder();

    return new Transform({
        writableObjectMode: true,
        transform(chunk, encoding, callback) {
            const aisObj = aisDecoder.decode(chunk.toString());
            L.debug(`Decoded AIS obj: ${aisObj && JSON.stringify(aisObj)}`);

            if (aisObj) {
                this.push(JSON.stringify(aisObj));
            }
            callback();
        },
    })
};

const downsampling = () => {
    const ds = new Downsampling(downsamplingRate);

    return new Transform({
        writableObjectMode: true,
        transform(chunk, encoding, callback) {
            const aisObj = JSON.parse(chunk.toString());
            if (ds.sampling(aisObj)) {
                aisObj.rawMessages.forEach((message) => {
                    this.push(message);
                });
            }
            callback();
        },
    })
};

const output = () => {
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
        write(chunk, encoding, callback) {
            const dataToSend = `${getPrefix()}${chunk.toString()}\r\n`;
            if (isDataSendEnabled) {
                const sendDataStatus = output.sendData(dataToSend);
                if (sendDataStatus) {
                    L.debug(`Data sent: ${dataToSend}`);
                }
            }
            callback();
        },
        final(callback) {
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
