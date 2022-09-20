FROM node

WORKDIR /app

COPY package.json .

RUN npm i
RUN npm i ts-node

COPY . .

CMD ["npm", "start"]