import L from '../../appLogger';

class NMEAParser {
    #buffer: string = '';

    constructor() {
        L.info('NMEAParse is on');
    }

    parseData(chunk: Buffer): string[] {
        this.#buffer += chunk;
        const answers: string[] = this.#buffer.split(/\r?\n/);
        let last: string | undefined = answers.pop();
        if (last === undefined) {
            return [];
        }
        this.#buffer = last;
        return answers;
    }
}

export default NMEAParser;
