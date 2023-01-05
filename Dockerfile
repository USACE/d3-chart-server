# Minimalist Dockerfile; Useful for running in docker,
# to test from other microservices within docker network
FROM node:16

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["node", "app.js"]
