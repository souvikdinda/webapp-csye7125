FROM node:18-alpine

# Setting up environment variables for the database connection:
ARG DB_DBNAME
ARG DB_USERNAME
ARG DB_PASSWORD
ARG DB_HOST
ARG DB_SCHEMA

WORKDIR /webapp
COPY package*.json ./
RUN npm install
RUN echo "PORT=8080" >> .env
RUN echo "DB_DBNAME=$DB_DBNAME" >> .env
RUN echo "DB_USERNAME=$DB_USERNAME" >> .env
RUN echo "DB_PASSWORD=$DB_PASSWORD" >> .env
RUN echo "DB_HOST=$DB_HOST" >> .env
RUN echo "DB_SCHEMA=$DB_SCHEMA" >> .env
RUN echo "DB_PORT=5432" >> .env

COPY . .
EXPOSE 8080
CMD [ "npm", "start" ]
