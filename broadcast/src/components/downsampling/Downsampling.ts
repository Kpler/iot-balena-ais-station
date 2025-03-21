import moment from 'moment';
import L from '../../appLogger';

class Downsampling {
    #samplingMap = new Map();
    #downsamplingRate;

    constructor(downsamplingRate = 0) {
        this.#downsamplingRate = downsamplingRate;
    }

    sampling(AISObj) {
        const messageType = AISObj.aisType;
        L.debug(`Downsampling messageType: ${messageType}`);
        if (this.#downsamplingRate === 0
            || !(messageType === 1 || messageType === 2 || messageType === 3)) {
            return true;
        }

        const mmsi = AISObj.mmsi;
        L.debug(`Downsampling mmsi: ${mmsi}`);
        if (this.#samplingMap.has(mmsi)) {
            const now = new moment();
            const lastMMSIUpdate = this.#samplingMap.get(mmsi);
            const duration = moment.duration(now.diff(lastMMSIUpdate), 'seconds');
            if (duration.seconds() <= this.#downsamplingRate) {
                return false;
            }
        }

        this.#samplingMap.set(mmsi, new moment());

        return true;
    }
}

export default Downsampling
