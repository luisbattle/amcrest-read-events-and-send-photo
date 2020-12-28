#!/bin/bash
FROM node:10-alpine
WORKDIR /app
COPY . .
RUN ["npm", "install"]
EXPOSE 8080
ENTRYPOINT ["npm", "src/app.js"]
