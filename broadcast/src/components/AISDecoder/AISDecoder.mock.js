export default {
    decodedNMEAMessagesSinglePartScenario: [
        {
            input: '!AIVDM,1,1,,A,13uwvl0w2O1dEUfEUeD674jt0HAC,0*45',
            output: {
                aisType: 1,
                channel: 'A',
                repeatInd: 0,
                mmsi: 266338000,
                midCountry: 'Sweden',
                midCountryIso: 'SE',
                mmsiType: 'Vessel',
                class: 'A',
                navStatus: 0,
                navStatusStr: 'Under way using engine',
                rotStatus: 'LEFT',
                rot: -0.7142446133345274,
                heading: 153,
                sogStatus: 'VALID',
                sog: 15.9,
                cog: 156.4,
                latitude: 37.72984,
                longitude: 23.666651666666667,
                posAccuracy: false,
                utcTsSec: 30,
                utcTsStatus: 'VALID',
                rawMessages: ['!AIVDM,1,1,,A,13uwvl0w2O1dEUfEUeD674jt0HAC,0*45']
            },
        },
        {
            input: '!AIVDM,1,1,,B,33coFF5001Qd3inEehNIch>t2Dh:,0*06',
            output: {
                aisType: 3,
                channel: 'B',
                repeatInd: 0,
                mmsi: 247322200,
                midCountry: 'Italy',
                midCountryIso: 'IT',
                mmsiType: 'Vessel',
                class: 'A',
                navStatus: 5,
                navStatusStr: 'Moored',
                rotStatus: 'NONE',
                rot: 0,
                heading: 7,
                sogStatus: 'VALID',
                sog: 0.1,
                cog: 247.9,
                latitude: 37.949641666666665,
                longitude: 23.605858333333334,
                posAccuracy: false,
                utcTsSec: 30,
                utcTsStatus: 'VALID',
                rawMessages: ['!AIVDM,1,1,,B,33coFF5001Qd3inEehNIch>t2Dh:,0*06']

            },
        },
        {
            input: '!AIVDM,1,1,,B,402B4L0000Htt1Lg@6FV5vG00pAg,0*4F',
            output: {
                aisType: 4,
                channel: 'B',
                repeatInd: 0,
                mmsi: 2393200,
                midCountry: '',
                midCountryIso: '',
                mmsiType: '',
                latitude: 39.487988333333334,
                longitude: 20.258991666666667,
                posAccuracy: false,
                utcYear: 0,
                utcMonth: 0,
                utcDay: 0,
                utcHour: 24,
                utcMinute: 60,
                utcSecond: 60,
                epfd: 7,
                rawMessages: ['!AIVDM,1,1,,B,402B4L0000Htt1Lg@6FV5vG00pAg,0*4F']
            },
        },
        {
            input: '!AIVDM,1,1,,A,13VLuV0P001d3KPEf08e3?vv08Aj,0*61',
            output: {
                aisType: 1,
                channel: 'A',
                repeatInd: 0,
                mmsi: 241647000,
                midCountry: 'Greece',
                midCountryIso: 'GR',
                mmsiType: 'Vessel',
                class: 'A',
                navStatus: 0,
                navStatusStr: 'Under way using engine',
                rotStatus: 'LEFT',
                rot: NaN,
                heading: NaN,
                sogStatus: 'VALID',
                sog: 0,
                cog: 334,
                latitude: 37.95632333333333,
                longitude: 23.604666666666667,
                posAccuracy: false,
                utcTsSec: 31,
                utcTsStatus: 'VALID',
                rawMessages: ['!AIVDM,1,1,,A,13VLuV0P001d3KPEf08e3?vv08Aj,0*61']
            },
        },
        {
            input: '!AIVDM,1,1,,B,13Ua`L00001dF:`EeG;00IC00McS,0*5D',
            output: {
                aisType: 1,
                channel: 'B',
                repeatInd: 0,
                mmsi: 240806000,
                midCountry: 'Greece',
                midCountryIso: 'GR',
                mmsiType: 'Vessel',
                class: 'A',
                navStatus: 0,
                navStatusStr: 'Under way using engine',
                rotStatus: 'NONE',
                rot: 0,
                heading: 297,
                sogStatus: 'VALID',
                sog: 0,
                cog: 0.1,
                latitude: 37.93884666666667,
                longitude: 23.66862,
                posAccuracy: false,
                utcTsSec: 32,
                utcTsStatus: 'VALID',
                rawMessages: ['!AIVDM,1,1,,B,13Ua`L00001dF:`EeG;00IC00McS,0*5D']
            },
        },
        {
            input: '!AIVDM,1,1,,B,13dWSP0th0QdIcTEe4FdwB3:0@F`,0*1C',
            output: {
                aisType: 1,
                channel: 'B',
                repeatInd: 0,
                mmsi: 248112000,
                midCountry: 'Malta',
                midCountryIso: 'MT',
                mmsiType: 'Vessel',
                class: 'A',
                navStatus: 0,
                navStatusStr: 'Under way using engine',
                rotStatus: 'LEFT',
                rot: -7.544208728345946,
                heading: 65,
                sogStatus: 'VALID',
                sog: 0,
                cog: 332.5,
                latitude: 37.930816666666665,
                longitude: 23.680616666666666,
                posAccuracy: false,
                utcTsSec: 37,
                utcTsStatus: 'VALID',
                rawMessages: ['!AIVDM,1,1,,B,13dWSP0th0QdIcTEe4FdwB3:0@F`,0*1C']
            },
        },
        {
            input: '!AIVDM,1,1,,B,13P>1D@00l1d6>TEca><VbBb0@G<,0*43',
            output: {
                aisType: 1,
                channel: 'B',
                repeatInd: 0,
                mmsi: 235110737,
                midCountry: 'United Kingdom of Great Britain and Northern Ireland',
                midCountryIso: 'GB',
                mmsiType: 'Vessel',
                class: 'A',
                navStatus: 0,
                navStatusStr: 'Under way using engine',
                rotStatus: 'NONE',
                rot: 0,
                heading: 329,
                sogStatus: 'VALID',
                sog: 5.2,
                cog: 322.6,
                latitude: 37.891933333333334,
                longitude: 23.614216666666668,
                posAccuracy: false,
                utcTsSec: 21,
                utcTsStatus: 'VALID',
                rawMessages: ['!AIVDM,1,1,,B,13P>1D@00l1d6>TEca><VbBb0@G<,0*43']
            },
        },
    ],
    decodedNMEAMessagesMultiPartScenario: [
        {
            input: '!AIVDM,2,1,8,A,53V>o@00?F`m=H7KKO0l58h6222222222222221S4H>375nn081S2DmSlp88,0*05',
            output: null,
        },
        {
            input: '!AIVDM,2,2,8,A,88888888880,2*2C',
            output: {
                aisType: 5,
                channel: 'A',
                repeatInd: 0,
                mmsi: 241416000,
                midCountry: 'Greece',
                midCountryIso: 'GR',
                mmsiType: 'Vessel',
                callSign: 'SVA6670',
                name: 'MARLA               ',
                aisVer: 0,
                imo: 1006221,
                shipType: 99,
                shipTypeStr: 'Other Type, no additional information',
                dimToBow: 35,
                dimToBowStatus: 'VALID',
                dimToStern: 14,
                dimToSternStatus: 'VALID',
                dimToPort: 3,
                dimToPortStatus: 'VALID',
                dimToStbrd: 7,
                dimToStbrdStatus: 'VALID',
                epfd: 1,
                epfdStr: 'GPS',
                etaMonth: 7,
                etaDay: 13,
                etaHour: 23,
                etaMinute: NaN,
                draught: 3.2,
                destination: 'FLISVOS             ',
                rawMessages: [
                    '!AIVDM,2,1,8,A,53V>o@00?F`m=H7KKO0l58h6222222222222221S4H>375nn081S2DmSlp88,0*05',
                    '!AIVDM,2,2,8,A,88888888880,2*2C'
                ]
            },
        },
    ],
    decodedNMEAMessagesRealTimeScenario: [
        {
            input: '!AIVDM,1,1,,A,13uwvl0w2O1dEUfEUeD674jt0HAC,0*45',
            output: {
                aisType: 1,
                channel: 'A',
                repeatInd: 0,
                mmsi: 266338000,
                midCountry: 'Sweden',
                midCountryIso: 'SE',
                mmsiType: 'Vessel',
                class: 'A',
                navStatus: 0,
                navStatusStr: 'Under way using engine',
                rotStatus: 'LEFT',
                rot: -0.7142446133345274,
                heading: 153,
                sogStatus: 'VALID',
                sog: 15.9,
                cog: 156.4,
                latitude: 37.72984,
                longitude: 23.666651666666667,
                posAccuracy: false,
                utcTsSec: 30,
                utcTsStatus: 'VALID',
                rawMessages: ['!AIVDM,1,1,,A,13uwvl0w2O1dEUfEUeD674jt0HAC,0*45']
            },
        },
        {
            input: '!AIVDM,1,1,,B,33coFF5001Qd3inEehNIch>t2Dh:,0*06',
            output: {
                aisType: 3,
                channel: 'B',
                repeatInd: 0,
                mmsi: 247322200,
                midCountry: 'Italy',
                midCountryIso: 'IT',
                mmsiType: 'Vessel',
                class: 'A',
                navStatus: 5,
                navStatusStr: 'Moored',
                rotStatus: 'NONE',
                rot: 0,
                heading: 7,
                sogStatus: 'VALID',
                sog: 0.1,
                cog: 247.9,
                latitude: 37.949641666666665,
                longitude: 23.605858333333334,
                posAccuracy: false,
                utcTsSec: 30,
                utcTsStatus: 'VALID',
                rawMessages: ['!AIVDM,1,1,,B,33coFF5001Qd3inEehNIch>t2Dh:,0*06']

            },
        },
        {
            input: '!AIVDM,2,1,8,A,53V>o@00?F`m=H7KKO0l58h6222222222222221S4H>375nn081S2DmSlp88,0*05',
            output: null,
        },
        {
            input: '!AIVDM,2,2,8,A,88888888880,2*2C',
            output: {
                aisType: 5,
                channel: 'A',
                repeatInd: 0,
                mmsi: 241416000,
                midCountry: 'Greece',
                midCountryIso: 'GR',
                mmsiType: 'Vessel',
                callSign: 'SVA6670',
                name: 'MARLA               ',
                aisVer: 0,
                imo: 1006221,
                shipType: 99,
                shipTypeStr: 'Other Type, no additional information',
                dimToBow: 35,
                dimToBowStatus: 'VALID',
                dimToStern: 14,
                dimToSternStatus: 'VALID',
                dimToPort: 3,
                dimToPortStatus: 'VALID',
                dimToStbrd: 7,
                dimToStbrdStatus: 'VALID',
                epfd: 1,
                epfdStr: 'GPS',
                etaMonth: 7,
                etaDay: 13,
                etaHour: 23,
                etaMinute: NaN,
                draught: 3.2,
                destination: 'FLISVOS             ',
                rawMessages: [
                    '!AIVDM,2,1,8,A,53V>o@00?F`m=H7KKO0l58h6222222222222221S4H>375nn081S2DmSlp88,0*05',
                    '!AIVDM,2,2,8,A,88888888880,2*2C'
                ]
            },
        },
        {
            input: '!AIVDM,1,1,,B,402B4L0000Htt1Lg@6FV5vG00pAg,0*4F',
            output: {
                aisType: 4,
                channel: 'B',
                repeatInd: 0,
                mmsi: 2393200,
                midCountry: '',
                midCountryIso: '',
                mmsiType: '',
                latitude: 39.487988333333334,
                longitude: 20.258991666666667,
                posAccuracy: false,
                utcYear: 0,
                utcMonth: 0,
                utcDay: 0,
                utcHour: 24,
                utcMinute: 60,
                utcSecond: 60,
                epfd: 7,
                rawMessages: ['!AIVDM,1,1,,B,402B4L0000Htt1Lg@6FV5vG00pAg,0*4F']
            },
        },
        {
            input: '!AIVDM,1,1,,A,13VLuV0P001d3KPEf08e3?vv08Aj,0*61',
            output: {
                aisType: 1,
                channel: 'A',
                repeatInd: 0,
                mmsi: 241647000,
                midCountry: 'Greece',
                midCountryIso: 'GR',
                mmsiType: 'Vessel',
                class: 'A',
                navStatus: 0,
                navStatusStr: 'Under way using engine',
                rotStatus: 'LEFT',
                rot: NaN,
                heading: NaN,
                sogStatus: 'VALID',
                sog: 0,
                cog: 334,
                latitude: 37.95632333333333,
                longitude: 23.604666666666667,
                posAccuracy: false,
                utcTsSec: 31,
                utcTsStatus: 'VALID',
                rawMessages: ['!AIVDM,1,1,,A,13VLuV0P001d3KPEf08e3?vv08Aj,0*61']
            },
        },
        {
            input: '!AIVDM,1,1,,B,13Ua`L00001dF:`EeG;00IC00McS,0*5D',
            output: {
                aisType: 1,
                channel: 'B',
                repeatInd: 0,
                mmsi: 240806000,
                midCountry: 'Greece',
                midCountryIso: 'GR',
                mmsiType: 'Vessel',
                class: 'A',
                navStatus: 0,
                navStatusStr: 'Under way using engine',
                rotStatus: 'NONE',
                rot: 0,
                heading: 297,
                sogStatus: 'VALID',
                sog: 0,
                cog: 0.1,
                latitude: 37.93884666666667,
                longitude: 23.66862,
                posAccuracy: false,
                utcTsSec: 32,
                utcTsStatus: 'VALID',
                rawMessages: ['!AIVDM,1,1,,B,13Ua`L00001dF:`EeG;00IC00McS,0*5D']
            },
        },
        {
            input: '!AIVDM,1,1,,B,13dWSP0th0QdIcTEe4FdwB3:0@F`,0*1C',
            output: {
                aisType: 1,
                channel: 'B',
                repeatInd: 0,
                mmsi: 248112000,
                midCountry: 'Malta',
                midCountryIso: 'MT',
                mmsiType: 'Vessel',
                class: 'A',
                navStatus: 0,
                navStatusStr: 'Under way using engine',
                rotStatus: 'LEFT',
                rot: -7.544208728345946,
                heading: 65,
                sogStatus: 'VALID',
                sog: 0,
                cog: 332.5,
                latitude: 37.930816666666665,
                longitude: 23.680616666666666,
                posAccuracy: false,
                utcTsSec: 37,
                utcTsStatus: 'VALID',
                rawMessages: ['!AIVDM,1,1,,B,13dWSP0th0QdIcTEe4FdwB3:0@F`,0*1C']
            },
        },
        {
            input: '!AIVDM,1,1,,B,13P>1D@00l1d6>TEca><VbBb0@G<,0*43',
            output: {
                aisType: 1,
                channel: 'B',
                repeatInd: 0,
                mmsi: 235110737,
                midCountry: 'United Kingdom of Great Britain and Northern Ireland',
                midCountryIso: 'GB',
                mmsiType: 'Vessel',
                class: 'A',
                navStatus: 0,
                navStatusStr: 'Under way using engine',
                rotStatus: 'NONE',
                rot: 0,
                heading: 329,
                sogStatus: 'VALID',
                sog: 5.2,
                cog: 322.6,
                latitude: 37.891933333333334,
                longitude: 23.614216666666668,
                posAccuracy: false,
                utcTsSec: 21,
                utcTsStatus: 'VALID',
                rawMessages: ['!AIVDM,1,1,,B,13P>1D@00l1d6>TEca><VbBb0@G<,0*43']
            },
        },
    ],
    decodedNMEAMessagesUnsupportedScenario: {
        input: '!AIVDM,1,1,,B,KC5E2b@U19PFdLbMuc5=ROv62<7m,0*16',
        output: {
            rawMessages: ['!AIVDM,1,1,,B,KC5E2b@U19PFdLbMuc5=ROv62<7m,0*16']
        },
    },
    decodedNMEAMessagesInvalidScenario: {
        input: '!AIVDM,1,1,,B,402B4L0000Htt1Lg@6FV500pAg,0*4F',
        output: {
            rawMessages: ['!AIVDM,1,1,,B,402B4L0000Htt1Lg@6FV500pAg,0*4F']
        },
    },
}
