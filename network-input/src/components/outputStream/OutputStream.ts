import {Writable} from "stream";
import Multicast from "./Multicast";

export default class OutputStream extends Writable{
    private multicast: Multicast;

    constructor(port: number, host: string) {
        super();
        this.multicast = new Multicast(port, host);
    }

    _write(chunk: any, encoding: BufferEncoding, callback: (error?: (Error | null)) => void) {
        const timestamp = new Date().getTime();
        const data = {
            type: "network",
            timestamp,
            sentence: chunk.toString(),
        };
        this.multicast.sendData(JSON.stringify(data));
        callback();
    }

    _final(callback: (error?: Error | null) => void) {
        callback();
    }
}