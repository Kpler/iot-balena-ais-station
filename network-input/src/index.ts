import {Writable} from "stream";
import C from './config';
import L from './appLogger';
import UdpInputStream from "./components/inputStrean/UdpInputStream";
import {Multicast} from "./components/dataSender/index";


const host = C.app.input.host;
const port = C.app.input.port;
const networkInput = new UdpInputStream();
networkInput.listen(port, host);

const output: () => Writable = (): Writable => {
    const host: string = C.app.output.host;
    const port: number = C.app.output.port;

    let output: Multicast = new Multicast(port, host);
    return new Writable({
        write(chunk: any, encoding: BufferEncoding, callback) {
            const timestamp = new Date().getTime();
            const data = {
                type: "network",
                timestamp,
                sentence: chunk.toString(),
            };
            L.debug(`send data to ${host} ${port}`);
            output.sendData(JSON.stringify(data));
            callback();
        },
        final(callback) {
            L.debug('stream finalized');
            callback();
        }
    });
};

networkInput.stream.pipe(output());
