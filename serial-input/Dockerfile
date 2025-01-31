FROM node:lts-alpine3.20

RUN apk add --no-cache make gcc g++ python3 linux-headers udev nano minicom

WORKDIR /usr/src/app

COPY .babelrc .
COPY package.json .
COPY src ./src
COPY .npmrc .

RUN npm install && npm run test-run && npm prune --production && rm -f .npmrc || exit 1

CMD ["node", "./src/index.js"]
