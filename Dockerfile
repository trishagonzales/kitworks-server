FROM node:18-alpine3.16
# RUN addgroup user && adduser -S -G user user
WORKDIR /user

COPY package*.json .
RUN npm install
COPY . .

# USER user

CMD [ "npm", "run", "start:dev" ]
EXPOSE 80