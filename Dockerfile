FROM node:latest as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:alpine
WORKDIR /app
COPY --from=build /app/build ./build
RUN npm install express
COPY server.js .
EXPOSE 3000
CMD ["node", "server.js"]
