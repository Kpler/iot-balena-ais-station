import L from '../../appLogger'
import * as U from './utils';

class HexNMEAParser {
    private buffer:string = '';
    private multipartCounter:number = 0;
    private readonly multipartMessageLength:number = 60;

    constructor() {
        L.info('HexNMEAParse is on');
    }

    parseData(chunk:Buffer):string[] {
        let NMEAMessages:string[] = [];
        this._splitRawDataToMessages(chunk).forEach((hexMessage:string):void => {
            NMEAMessages = NMEAMessages.concat(this._parseHexToNMEAMessage(hexMessage));
        });
        return NMEAMessages;
    }

    _splitRawDataToMessages(chunk:Buffer):string[] {
        const NMEAMessages:string[] = [];
        let rawMessage:string = chunk.toString('hex').replace('2c410d0a', '2c410d0a==');
        rawMessage = rawMessage.replace('2c420d0a', '2c420d0a==');
        this.buffer += rawMessage;

        const messages:string[] = this.buffer.split('==');
        this.buffer = '';
        messages.forEach((message) => {
            if (message.endsWith('2c410d0a') || message.endsWith('2c420d0a')) {
                NMEAMessages.push(message);
            } else if (message.length > 0) {
                this.buffer += message;
            }
        });

        return NMEAMessages;
    }

    _parseHexToNMEAMessage(hexMessage:string):string[] {
        if (!U.isHexMessageValid(hexMessage)) {
            return [];
        }
        let channel = U.findReceiverChannelFromHexMessage(hexMessage);

        let payload = U.convertBinary6BitASCIIToASCII(U.convertHexToBinaryString(hexMessage.slice(0, hexMessage.length - 8)));

        if (this._isMultipart(payload)) {
            return this._handleMultipartMessage(payload, channel);
        }

        return this._handleSinglePartMessage(payload, channel);
    }

    _isMultipart(message:string):boolean {
        return message.length > this.multipartMessageLength;
    }

    _handleSinglePartMessage(payload:string, channel:string):string[] {
        let aisMessage = `AIVDM,1,1,,${channel},${payload},0`;

        return [`!${aisMessage}*${U.calculateChecksum(aisMessage)}`];
    }

    _handleMultipartMessage(fullPayload:string, channel:string):string[] {
        let payload:string = fullPayload;

        const payloadParts:string[] = [];
        while (payload.length > 60) {
            payloadParts.push(payload.slice(0, 60));
            payload = payload.slice(60);
        }
        payloadParts.push(payload);

        const NMEAMessages = payloadParts.map((payloadPart:string, index:number):string => {
            let aisMessage = `AIVDM,${payloadParts.length},${index + 1},${this.multipartCounter},${channel},${payloadPart},0`;
            return `!${aisMessage}*${U.calculateChecksum(aisMessage)}`;
        });

        if (this.multipartCounter === 9) {
            this.multipartCounter = 0;
        }else{
            this.multipartCounter += 1;
        }
        return NMEAMessages;
    }
}

export default HexNMEAParser;
