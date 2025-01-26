FROM node:16

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

RUN yarn build

EXPOSE 8000

CMD ["node", "build/index.js"]
# CMD ["node", "index.js"]
