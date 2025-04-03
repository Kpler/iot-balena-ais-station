import {Transform} from "node:stream";

export default class InputStream {
    stream: Transform;

    constructor() {
        this.stream = new Transform({
            writableObjectMode: true,
            transform: (chunk, encoding, callback) => {
                callback(null, chunk.toString());
            }
        });
    }

    write(data: string) {
        this.stream.write(data);
    }
}