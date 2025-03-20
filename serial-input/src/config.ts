const config = {
    env: process.env.APP_ENV ?? 'prod',
    app: {
        serial: process.env.SERIAL ?? '/dev/ttyS0',
        baudRate: process.env.BAUD_RATE ?? 38400,
        isHexParserEnabled: process.env.IS_HEX_PARSER_ENABLED && process.env.IS_HEX_PARSER_ENABLED === 'true',
        isRawModeEnabled: process.env.IS_RAW_MODE_ENABLED === 'true' || process.env.IS_RAW_MODE_ENABLED === undefined,
        output: {
            host: process.env.SERIAL_OUTPUT_HOST ?? '230.230.230.230',
            port: process.env.SERIAL_OUTPUT_PORT ?? 55501,
        },
    },
    device: {
        uuid: process.env.BALENA_DEVICE_UUID ?? process.env.RESIN_DEVICE_UUID ?? 'AIS-Station',
        arch: process.env.BALENA_DEVICE_ARCH ?? process.env.RESIN_DEVICE_ARCH ?? 'AIS-Station-Arch',
        stationName: process.env.BALENA_DEVICE_NAME_AT_INIT ?? process.env.RESIN_DEVICE_NAME_AT_INIT ?? 'AIS-Station',
        fleet: process.env.BALENA_APP_NAME ?? process.env.RESIN_APP_NAME ?? 'AIS-Station-Fleet',
        service: process.env.BALENA_SERVICE_NAME ?? process.env.RESIN_SERVICE_NAME ?? 'serial-input',
    },
    logger: {
        level: process.env.LOG_LEVEL ?? 'info',
        destination: process.env.LOG_DESTINATION ?? 'stdout',
        logUrl: process.env.LOG_URL ?? '',
        logApiKey: process.env.LOG_API_KEY ?? '',
        project: process.env.LOG_PROJECT ?? 'AIS-Station-Project',
        hostname: process.env.LOG_HOSTNAME ?? 'AIS-Station-Host',
    },
}

export default Object.freeze(config);
