FROM node:lts-alpine3.20

RUN apk add --no-cache make gcc g++ python3 linux-headers udev nano minicom

WORKDIR /usr/src/app

COPY package.json .
COPY package-lock.json .
COPY tsconfig.json .
COPY jest.config.js .
COPY src ./src

EXPOSE 6501

RUN npm ci && npm run build && npm prune --production && rm jest.config.js

CMD ["npm","run","start"]
