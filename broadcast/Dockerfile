FROM node:lts-alpine3.20

WORKDIR /usr/src/app

COPY package.json .
COPY package-lock.json .
COPY tsconfig.json .
COPY jest.config.js .
COPY src ./src

RUN npm ci && npm run build && npm run test && npm prune --production && rm jest.config.js

CMD ["npm","run","start"]