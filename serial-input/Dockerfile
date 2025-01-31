FROM node:lts-alpine3.20

RUN apk add --no-cache make gcc g++ python3 linux-headers udev nano minicom

WORKDIR /usr/src/app

COPY .babelrc .
COPY package.json .
COPY src ./src
COPY .npmrc .

RUN npm install && npm run test-run && npm prune --production && rm -f .npmrc || exit 1


ENV LOG_DESTINATION=stdout
ENV LOG_LEVEL=info

ENV SERIAL=/dev/ttyUSB0
ENV BAUD_RATE=38400
ENV IS_HEX_PARSER_ENABLED=false
ENV IS_RAW_MODE_ENABLED=false

CMD ["node", "./src/index.js"]
