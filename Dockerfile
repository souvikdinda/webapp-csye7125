FROM node:18-alpine
WORKDIR /webapp
COPY package*.json ./
RUN npm install
RUN echo "PORT=8080" >> .env
COPY . .
EXPOSE 8080
CMD [ "npm", "start" ]
