#Build react app
FROM node:18 as builder
WORKDIR /amazon_app
ENV PATH /app/node_modules/.bin:$PATH
COPY  package.json ./
COPY  package-lock.json ./
RUN npm install
COPY . .
CMD [ "npm", "start" ]
