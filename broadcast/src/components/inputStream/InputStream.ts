import {Transform, TransformCallback} from 'stream';

class InputStream {
    dataInputStream:Transform = new Transform({
        writableObjectMode: true,
        transform(chunk:Buffer, encoding:BufferEncoding, callback:TransformCallback):void {
            callback(null, chunk.toString());
        },
    });

    write(data:string):void{
        this.dataInputStream.write(data);
    }
}

export default InputStream;
