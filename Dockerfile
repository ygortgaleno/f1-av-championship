FROM node:lts

WORKDIR /usr/f1-va-championship

COPY package*.json ./
COPY tsconfig.json ./

RUN npm install

COPY ./src ./src

CMD [ "npm", "run", "start:dev" ]