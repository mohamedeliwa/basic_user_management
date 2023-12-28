# syntax=docker/dockerfile:1

FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate
RUN npm run build

CMD [ "npm", "run", "start:dev" ]

EXPOSE 3000