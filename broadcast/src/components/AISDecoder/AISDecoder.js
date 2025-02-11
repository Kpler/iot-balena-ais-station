import AisParser from 'aisparser';
import L from '../../appLogger.js';

class AISDecoder {
    #messageBuffer = [];
    #parser = new AisParser({checksum: true});

    decode(message) {
        const AISObj = {};
        this.#messageBuffer.push(message);
        const parsedMessage = this.#parser.parse(message);

        switch (parsedMessage.valid) {
            case 'VALID': {
                const suppValues = parsedMessage.supportedValues;
                Object.keys(suppValues).forEach((field) => {
                    switch (suppValues[field]) {
                        case 'number':
                        case 'deg':
                        case 'kn':
                        case 'index':
                        case 's': {
                            AISObj[field] = Number(parsedMessage[field]);
                            break;
                        }
                        case 'boolean': {
                            AISObj[field] = (parsedMessage[field] === 'true');
                            break;
                        }
                        default: {
                            AISObj[field] = parsedMessage[field];
                        }
                    }
                });
                AISObj.rawMessages = this.#messageBuffer;
                this.#messageBuffer = [];

                break;
            }
            case 'INCOMPLETE': {
                L.debug(`incomplete message, waiting for more : ${message}`);
                return null;
            }
            case 'UNSUPPORTED': {
                L.debug(`unsupported message: ${message}`);
                AISObj.rawMessages = this.#messageBuffer;
                this.#messageBuffer = [];
                break;
            }
            case 'INVALID':
            default: {
                L.debug(`invalid message: ${message}`);
                AISObj.rawMessages = this.#messageBuffer;
                this.#messageBuffer = [];
                break;
            }
        }

        return AISObj;
    }
}

export default AISDecoder;
