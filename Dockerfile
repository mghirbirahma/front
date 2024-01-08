FROM node:16-alpine
WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 5173

CMD [ "npm" , "run" ,"start"]

FROM node:16-alpine
WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "npm" , "run" ,"start"]
