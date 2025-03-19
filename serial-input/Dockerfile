FROM node:lts-alpine3.20

RUN apk add --no-cache make gcc g++ python3 linux-headers udev nano minicom

WORKDIR /usr/src/app

COPY .babelrc .
COPY package.json .
COPY package-lock.json .
COPY tsconfig.json .
COPY src ./src

RUN npm build && npm run test-run && npm prune --production || exit 1

CMD ["node", "./src/index.js"]
