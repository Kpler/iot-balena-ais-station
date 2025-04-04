import {Transform, TransformCallback} from "node:stream";

export default class InputStream extends Transform {
    constructor() {
        super({ writableObjectMode: true });
    }

    _transform(chunk: any, encoding: BufferEncoding, callback: TransformCallback) {
        callback(null, chunk.toString());
    }

}