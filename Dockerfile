FROM node:19

WORKDIR /app

COPY package.json /app

RUN npm install -g nodemon && npm install

COPY . . 

EXPOSE 8080

CMD ["nodemon", "index.js"]`