FROM node

WORKDIR /app

COPY package.json .

RUN npm i
RUN npm i ts-node


COPY . .

RUN npm run build

CMD ["npm", "start"]