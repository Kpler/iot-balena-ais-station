import moment, {Moment} from 'moment';
import L from '../../appLogger';
import {AISMessage} from "aisparser";

class Downsampling {
    private readonly samplingMap:Map<number,Moment> = new Map();
    private readonly downsamplingRate: number;

    constructor(downsamplingRate = 0) {
        this.downsamplingRate = downsamplingRate;
    }

    sampling(AISObj: AISMessage):boolean {
        const messageType = AISObj.aisType;
        L.debug(`Downsampling messageType: ${messageType}`);
        if (this.downsamplingRate === 0
            || !(messageType === 1 || messageType === 2 || messageType === 3)) {
            return true;
        }

        const mmsi:number = AISObj.mmsi;
        L.debug(`Downsampling mmsi: ${mmsi}`);
        if (this.samplingMap.has(mmsi)) {
            const now: Moment = moment();
            const lastMMSIUpdate = this.samplingMap.get(mmsi);
            const duration = moment.duration(now.diff(lastMMSIUpdate), 'seconds');
            if (duration.seconds() <= this.downsamplingRate) {
                return false;
            }
        }

        this.samplingMap.set(mmsi, moment());

        return true;
    }
}

export default Downsampling
