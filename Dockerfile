FROM node:20-alpine

WORKDIR /usr/src/app    

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 80

CMD [ "npm", "run", "build"]

FROM httpd

COPY . /usr/local/apache2/htdocs