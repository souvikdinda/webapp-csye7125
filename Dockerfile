FROM node:18-alpine
WORKDIR /webapp
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8080
CMD [ "npm", "start" ]