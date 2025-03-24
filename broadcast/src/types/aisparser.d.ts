declare module 'aisparser' {

    export interface AISMessage {
        aisType: ?number;
        mmsi: ?number;
        [key: string]: any;
    }

    export interface ParseOptions {
        checksum?: boolean;
    }

    class AisParser {
        constructor(options?: ParseOptions);
        parse(sentence: string, options?: ParseOptions): AISMessage;
    }

    export = AisParser;
}
