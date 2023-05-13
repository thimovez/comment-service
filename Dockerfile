FROM node:18-alpine

WORKDIR /app

COPY package.json /app

RUN npm install -g nodemon && npm install

COPY . . 

EXPOSE 8080

CMD ["npm", "run", "dev"]`