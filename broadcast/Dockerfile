FROM node:lts-alpine3.20

WORKDIR /usr/src/app

COPY .babelrc .
COPY package.json .
COPY src ./src

RUN npm install && npm run test-run && npm prune --production && rm -f .npmrc || exit 1

CMD ["node", "./src/index.js"]
