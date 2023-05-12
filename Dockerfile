FROM node

WORKDIR /app

COPY package.json .

RUN npm i
RUN npm i ts-node
RUN npm run pull
RUN npm run build

COPY . .

CMD ["npm", "start"]