FROM node:lts-alpine3.20

WORKDIR /usr/src/app

COPY .babelrc .
COPY .npmrc .
COPY package.json .
COPY src ./src

RUN npm install && npm run test-run && npm prune --production && rm -f .npmrc || exit 1

ENV LOG_DESTINATION=stdout
ENV LOG_LEVEL=info

ENV IS_DATA_SENDING_ENABLED=true
ENV DOWNSAMPLING_RATE=0
ENV BROADCAST_OUTPUT_HOST=listener0.marinetraffic.com
ENV BROADCAST_OUTPUT_PORT=5320
ENV BROADCAST_SEND_MODE=tcp
ENV STATION_ID=0


CMD ["node", "./src/index.js"]
