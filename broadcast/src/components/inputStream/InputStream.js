import { Transform } from 'stream';

class InputStream {
    dataInputStream = new Transform({
        writableObjectMode: true,
        transform(chunk, encoding, callback) {
            callback(null, chunk.toString());
        },
    });

    write(data){
        this.dataInputStream.write(data);
    }
}

export default InputStream;
