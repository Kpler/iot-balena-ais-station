FROM node:lts-alpine3.20

WORKDIR /usr/src/app

COPY .babelrc .
COPY package.json .
COPY package-lock.json .
COPY tsconfig.json .
COPY src ./src

RUN npm install && npm run test-run && npm prune --production || exit 1

CMD ["node", "./src/index.js"]
