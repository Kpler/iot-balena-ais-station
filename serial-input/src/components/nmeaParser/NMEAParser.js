import L from '../../appLogger.js';

class NMEAParser {
    #buffer = '';

    constructor() {
        L.info('NMEAParse is on');
    }

    parseData(chunk) {
        this.#buffer += chunk;
        const answers = this.#buffer.split(/\r?\n/); // Split data by new line character or smth-else
        this.#buffer = answers.pop(); // Store unfinished data

        return answers;
    }
}

export default NMEAParser;
