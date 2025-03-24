declare module 'aisparser' {

    export interface AISMessage {
        messageType: number;
        mmsi: number;
        [key: string]: any;
    }

    export interface ParseOptions {
        checksum?: boolean;
    }

    export class AisParser {
        constructor(options?: ParseOptions);
        parse(sentence: string, options?: ParseOptions): AISMessage;
    }
}
