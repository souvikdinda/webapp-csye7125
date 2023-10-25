FROM node:18-alpine
WORKDIR /webapp
COPY . .
RUN npm install
EXPOSE 8080
CMD [ "npm", "start" ]