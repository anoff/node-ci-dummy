FROM node:9-alpine

WORKDIR /app

COPY . .

RUN npm install --only=production

EXPOSE 8080

ENV PORT=8080

CMD [ "npm", "start" ]
