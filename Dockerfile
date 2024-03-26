# Building the Docker image from the base image Node:18-apline
FROM node:18-alpine
# creating the working directory of the Docker image
WORKDIR /usr/src/app
# copy package.json and package-lock.json to the image working directory
COPY package*.json ./
# Install app dependencies
RUN npm install
# COPY the Nest application into the image
COPY . .
#  build the application
RUN npm run build