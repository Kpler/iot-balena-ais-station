import * as U from './utils';

describe('Testing utilities', () => {
    describe('checking calculateNMEAMessageChecksum', () => {
        test('should return the calculated checksum based on given NMEA message', () => {
            expect(U.calculateNMEAMessageChecksum('!AIVDM,1,1,,A,13Td@e0P00QdWJ4Ec:N>4?vN2D=3,0*6A')).toEqual('6A');
            expect(U.calculateNMEAMessageChecksum('!AIVDM,1,1,,B,13Tgd`0nP01d@JbEe4dv40BN089I,0*65')).toEqual('65');
            expect(U.calculateNMEAMessageChecksum('!AIVDM,1,1,,B,138MqB9000Qd=v@EeKi0<AfP04it,0*36')).toEqual('36');
            expect(U.calculateNMEAMessageChecksum('!AIVDM,1,1,,B,H3RoGn4UCBD6RTACImmin0282140,0*2F')).toEqual('2F');
            expect(U.calculateNMEAMessageChecksum('!AIVDM,1,1,,B,H3RoGn4UCBD6RTACImmin0282140,0')).toEqual('2F');
            expect(U.calculateNMEAMessageChecksum('!AIVDM,2,1,3,A,53UMj`01r<Sq=OO;;F0THE=@u>3>22222222220l1HC261k>`7D2DPAEDp88,0*45')).toEqual('45');
        });
    });
    describe('checking clearNMEAMessageFromChecksumAndNMEAStartChar', () => {
        test('should return the cleaned message', () => {
            expect(U.clearNMEAMessageFromChecksumAndNMEAStartChar('!AIVDM,1,1,,A,13Td@e0P00QdWJ4Ec:N>4?vN2D=3,0*6A'))
                .toEqual('AIVDM,1,1,,A,13Td@e0P00QdWJ4Ec:N>4?vN2D=3,0');
            expect(U.clearNMEAMessageFromChecksumAndNMEAStartChar('!AIVDM,1,1,,A,13Td@e0P00QdWJ4Ec:N>4?vN2D=3,0'))
                .toEqual('AIVDM,1,1,,A,13Td@e0P00QdWJ4Ec:N>4?vN2D=3,0');
            expect(U.clearNMEAMessageFromChecksumAndNMEAStartChar('!AIVDM,1,1,,B,13Tgd`0nP01d@JbEe4dv40BN089I,0*65'))
                .toEqual('AIVDM,1,1,,B,13Tgd`0nP01d@JbEe4dv40BN089I,0');
            expect(U.clearNMEAMessageFromChecksumAndNMEAStartChar('!AIVDM,1,1,,B,138MqB9000Qd=v@EeKi0<AfP04it,0*36'))
                .toEqual('AIVDM,1,1,,B,138MqB9000Qd=v@EeKi0<AfP04it,0');
            expect(U.clearNMEAMessageFromChecksumAndNMEAStartChar('!AIVDM,1,1,,B,H3RoGn4UCBD6RTACImmin0282140,0*2F'))
                .toEqual('AIVDM,1,1,,B,H3RoGn4UCBD6RTACImmin0282140,0');
            expect(U.clearNMEAMessageFromChecksumAndNMEAStartChar('!AIVDM,2,1,3,A,53UMj`01r<Sq=OO;;F0THE=@u>3>22222222220l1HC261k>`7D2DPAEDp88,0*45'))
                .toEqual('AIVDM,2,1,3,A,53UMj`01r<Sq=OO;;F0THE=@u>3>22222222220l1HC261k>`7D2DPAEDp88,0');
        });
    });
    describe('checking exportChecksumFromNMEAMessage', () => {
        test('should return the checksum from given NMEA message', () => {
            expect(U.exportChecksumFromNMEAMessage('!AIVDM,1,1,,A,13Td@e0P00QdWJ4Ec:N>4?vN2D=3,0*6A')).toEqual('6A');
            expect(U.exportChecksumFromNMEAMessage('!AIVDM,1,1,,B,13Tgd`0nP01d@JbEe4dv40BN089I,0*65')).toEqual('65');
            expect(U.exportChecksumFromNMEAMessage('!AIVDM,1,1,,B,138MqB9000Qd=v@EeKi0<AfP04it,0*36')).toEqual('36');
            expect(U.exportChecksumFromNMEAMessage('!AIVDM,1,1,,B,H3RoGn4UCBD6RTACImmin0282140,0*2F')).toEqual('2F');
            expect(U.exportChecksumFromNMEAMessage('!AIVDM,2,1,3,A,53UMj`01r<Sq=OO;;F0THE=@u>3>22222222220l1HC261k>`7D2DPAEDp88,0*45')).toEqual('45');
        });
    });
    describe('checking calculateChecksum', () => {
        test('should return correct checksum (CheckSum8 Xor) for the given text', () => {
            expect(U.calculateChecksum('test test')).toEqual('20');
            expect(U.calculateChecksum('')).toEqual('00');
            expect(U.calculateChecksum('AIVDM,1,1,,A,13Td@e0P00QdWJ4Ec:N>4?vN2D=3,0')).toEqual('6A');
            expect(U.calculateChecksum('AIVDM,1,1,,B,137LEv00001dIkFEe3HJFR6J0PSm,0')).toEqual('79');
            expect(U.calculateChecksum('AIVDM,1,1,,B,13VL:l0P011csLTEf9udDgvR00SS,0')).toEqual('3F');
            expect(U.calculateChecksum('AIVDM,1,1,,B,13VL:l0P011csLTEf9udDgvR00SS,0')).toEqual('3F');
            expect(U.calculateChecksum('AIVDM,1,1,,B,13P=Lp00001dJ2DEe95L>7`N0@9C,0')).toEqual('52');
        });
    });
    describe('checking findNMEAStartIndex', () => {
        test('should return NMEA message start index (! or $) is the start prefix. If no start prefix return null', () => {
            expect(U.findNMEAStartIndex('!AIVDM,1,1,,A,13Td@e0P00QdW')).toEqual(0);
            expect(U.findNMEAStartIndex('$AIVDM,1,1,,A,13Td@e0P00QdW')).toEqual(0);
            expect(U.findNMEAStartIndex('AIVDM,1,1,,A,13Td@e0P00QdW')).toBeNull();
        });
    });
    describe('checking convertHexToBinaryString', () => {
        test('should convert a hex string to binary string', () => {
            expect(U.convertHexToBinaryString('6bcb8795abdbcc02fff4012cfa82c6'))
                .toEqual('011010111100101110000111100101011010101111011011110011000000001011111111111101000000000100101100111110101000001011000110');
            expect(U.convertHexToBinaryString('04380b5f7c000a906c44e81596ce97cf63f400c0f36f09'))
                .toEqual('0000010000111000000010110101111101111100000000000000101010010000011011000100010011101000000101011001011011001110100101111100111101100011111101000000000011000000111100110110111100001001');
        });
    });
    describe('checking convertBinary6BitASCIIToASCII', () => {
        test('should convert the binary 6bit ASCII to ASCII', () => {
            expect(U.convertBinary6BitASCIIToASCII(U.convertHexToBinaryString('6bcb8795abdbcc02fff4012cfa82c6')))
                .toEqual('Jtf7UJgKk0;wu04dv`;6');
            expect(U.convertBinary6BitASCIIToASCII(U.convertHexToBinaryString('043928c0602000006c0ce815b800b000fff801087d000439013043e000086c9d2b95ac3bfe10fff209c058314e')))
                .toEqual('13T`h60P001d3>PEf02h0?wp0@Qu00@q0C13p008K9lcUJhswQ3wtPW0F35>');
        });
    });
    describe('checking isHexMessageValid', () => {
        test('should be valid if hexMessage ends with 2c410d0a or 2c420d0a ', () => {
            expect(U.isHexMessageValid('0c97a377dd6000086c01aa95b8218e10fff209504a03722c420d0a')).toBe(true);
            expect(U.isHexMessageValid('04380b5f7c000a906c44e81596ce97cf63f400c0f36f092c410d0a')).toBe(true);
            expect(U.isHexMessageValid('04380b5f7c000a906c44e81596ce97cf63f400c0f36f09')).toBe(false);
        });
    });
    describe('checking findReceiverChannelFromHexMessage', () => {
        test('should return the receiver channel (A/B) based on given hexMessage', () => {
            expect(U.findReceiverChannelFromHexMessage('0c97a377dd6000086c01aa95b8218e10fff209504a03722c420d0a')).toEqual('B');
            expect(U.findReceiverChannelFromHexMessage('04380b5f7c000a906c44e81596ce97cf63f400c0f36f092c410d0a')).toEqual('A');
        });
    });
});
