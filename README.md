# Balena MT Station (Beta Release Candidate)

Balena MT Station is a simple AIS broadcaster designed to send AIS data to MarineTraffic. It runs on BalenaOS and is
built for devices that receive AIS messages from a serial port.

## Features

- Reads AIS messages from a serial port or RTL-SDR USB dongle
- Reads AIS messages from a Network through UDP
- Supports valid NMEA AIS messages (`!AIVDM,...` format)
- Broadcasts data to MarineTraffic
- Designed to run on a Balena-managed device

## Requirements

- Raspberry Pi 4 (default)
- Raspberry Pi 3B+
- Raspberry Pi 5
- QEMU (for testing and development)
- An AIS receiver with a serial output
- A RTL-SDR USB dongle + antenna
- A [MarineTraffic account](https://www.marinetraffic.com)
  and [successful application for becoming a contributor](https://www.marinetraffic.com/en/join-us/cover-your-area )
- BalenaCloud account

## Setup Instructions

### 1. Deploy with Balena

Click the button below to deploy this project to BalenaCloud:

[![balena deploy button](https://www.balena.io/deploy.svg)](https://dashboard.balena-cloud.com/deploy?repoUrl=https://github.com/Kpler/iot-balena-ais-station)

##### a)After clicking the button a modal  will appear. Chose the device that you want to use and fill the modal with the StationId and Token received from MarineTraffic's email.

##### b)This will create a fleet with the name that you gave

##### c)Visit your newly create fleet and click Add Device

1. Select the appropriate device type (e.g., Raspberry Pi 4).
2. Choose BalenaOS Version (latest recommended version).
3. Select **Network Connection** (Ethernet or Wi-Fi):
    - If using **Wi-Fi**, enter your SSID and password.
4. Click Download balenaOS.
5. Flash the downloaded image to an SD card using balenaEtcher.
6. Insert the SD card into your Raspberry Pi and power it on.

#### d) Alternatively, deploy manually by following the steps below.

### 2. Setup Balena and Configure the Device

#### a) Create a Balena Fleet

1. Go to [BalenaCloud](https://dashboard.balena.io/) and sign in or create an account.
2. Click **Create fleet** and enter a name for your fleet (e.g., `balena-mt-station`).
3. Select the default device type: **Raspberry Pi 4** (or your preferred supported device).
4. Choose **Starter** or **Microservices** fleet type.
5. Click **Create new fleet**.

#### b) Add a Device to the Fleet

1. Inside your new fleet, click **Add device**.
2. Select the appropriate device type (e.g., **Raspberry Pi 4**).
3. Choose **BalenaOS Version** (latest recommended version).
4. Select **Network Connection** (Ethernet or Wi-Fi):
    - If using **Wi-Fi**, enter your SSID and password.
5. Click **Download balenaOS**.
6. Flash the downloaded image to an SD card using [balenaEtcher](https://www.balena.io/etcher/).
7. Insert the SD card into your Raspberry Pi and power it on.

#### c) Verify Device Connectivity

1. Wait for the device to appear in your fleet on BalenaCloud.
2. Ensure it shows **Online** before proceeding.

### 3. Deploy to the Balena Fleet

1. Clone this repository:
   ```sh
   git https://github.com/Kpler/iot-balena-ais-station.git
   cd iot-balena-ais-station
   ```
2. Push the code to Balena:
   ```sh
   balena push <your-balena-fleet>
   ```
3. Wait for the deployment to complete.

### 4. Connect AIS Receiver

- Connect your AIS receiver to the device’s serial port (e.g., `/dev/ttyUSB0`).
- Ensure the receiver outputs valid NMEA AIS messages.

### 5. Configure Environment Variables

#### Serial Input Service Environment Variables

| Name                  | Default Value         | Options               | Description                                                                                                      |
|-----------------------|-----------------------|-----------------------|------------------------------------------------------------------------------------------------------------------|
| SERIAL                | `/dev/ttyAMA0`        | -                     | the serial port used to receive data                                                                             |
| BAUD_RATE             | `38400`               | -                     | baud rate of the serial port                                                                                     |
| IS_HEX_PARSER_ENABLED | `false`               | `true`, `false`       | if data are hex-formatted then enable this parser                                                                |
| IS_RAW_MODE_ENABLED   | `true`                | `true`, `false`       | enable if you want to send the sentence of the AIS messages otherwise a string represantion of the whole message |
| SERIAL_OUTPUT_HOST    | `230.230.230.230`     | -                     |                                                                                                                  |
| SERIAL_OUTPUT_PORT    | `55501`               | -                     |                                                                                                                  |
| LOG_LEVEL             | `info`                | `debug`               |                                                                                                                  |
| LOG_DESTINATION       | `stdout`              | `DataDog`, `NewRelic` |                                                                                                                  |
| LOG_URL               | `""`                  | -                     | DataDog or NewRelic URL                                                                                          |
| LOG_API_KEY           | `""`                  | -                     | DataDog or NewRelic API key                                                                                      |
| LOG_PROJECT           | `AIS-Station-Project` | -                     | contain the project metadata info for DD tag or NR log information                                               |
| LOG_HOSTNAME          | `AIS-Station-Host`    | -                     |                                                                                                                  |

#### Network Input Service Environment Variables

| Name                | Default Value         | Options               | Description                                                        |
|---------------------|-----------------------|-----------------------|--------------------------------------------------------------------|
| NETWORK_INPUT_HOST  | `0.0.0.0`             | -                     | The address to host the UDP server                                 |
| NETWORK_INPUT_PORT  | 6501                  | -                     | The port for to listen the UDP server                              |
| NETWORK_OUTPUT_HOST | `230.230.230.230`     | -                     |                                                                    |
| NETWORK_OUTPUT_PORT | `55501`               | -                     |                                                                    |
| LOG_LEVEL           | `info`                | `debug`               |                                                                    |
| LOG_DESTINATION     | `stdout`              | `DataDog`, `NewRelic` |                                                                    |
| LOG_URL             | `""`                  | -                     | DataDog or NewRelic URL                                            |
| LOG_API_KEY         | `""`                  | -                     | DataDog or NewRelic API key                                        |
| LOG_PROJECT         | `AIS-Station-Project` | -                     | contain the project metadata info for DD tag or NR log information |
| LOG_HOSTNAME        | `AIS-Station-Host`    | -                     |                                                                    |

#### Broadcast Service Environment Variables

| Name                    | Default Value                 | Options         | Description                                                                                                      |
|-------------------------|-------------------------------|-----------------|------------------------------------------------------------------------------------------------------------------|
| BROADCAST_INPUT_TYPE    | `MULTICAST`                   | `UDP_SERVER`    |                                                                                                                  |
| BROADCAST_INPUT_ADDRESS | `230.230.230.230`             | -               |                                                                                                                  |
| BROADCAST_INPUT_PORT    | `55501`                       | -               |                                                                                                                  |
| BROADCAST_OUTPUT_HOST   | `listener0.marinetraffic.com` | -               | That's the default URL that the application should send data                                                     |
| BROADCAST_OUTPUT_PORT   | `5320`                        | -               | That's the default Port that the application should send data                                                    |
| BROADCAST_SEND_MODE     | `tcp`                         | `udp`           |                                                                                                                  |
| IS_DATA_SENDING_ENABLED | `true`                        | `true`, `false` |                                                                                                                  |
| DOWNSAMPLING_RATE       | `10`                          | -               | downsampling messages to reduce bandwith throttling. measured in seconds eg. broadcast messages every 10 seconds |
| STATION_ID              | `0`                           | -               | add the Station ID received from MarineTraffic's email                                                           |
| LOG_LEVEL               | `info`                        | `debug`         |                                                                                                                  |
| TOKEN                   | `null`                        | -               | add the authentication Token received from MarineTraffic's email                                                 |

#### RTL-SDR Service Environment Variables

| Name                | Default Value      | Options | Description                    |
|---------------------|--------------------|---------|--------------------------------|
| VERBOSE             | `false`            | `true`  | print all received messages    |
| RTL_SDR_OUTPUT_HOST | `230.230.230.230	` |         | sending data to specified host |
| RTL_SDR_OUTPUT_PORT | `55501`            |         | sending data to specified port |

### 6. Start the Service

Once the device is online and receiving AIS data, it will automatically start broadcasting to MarineTraffic.

## Roadmap & Contributions

This project is in **alpha** and subject to changes. Contributions and suggestions are welcome!

