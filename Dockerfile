FROM node:alpine

COPY lib/ /app/lib
COPY package.json /app/
COPY config.js /app/
WORKDIR /app
RUN npm install --production
EXPOSE 3000
CMD ["npm", "start"]
