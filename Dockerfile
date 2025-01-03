FROM node:alpine

WORKDIR /app

COPY package.json /app/package.json

RUN apk add --no-cache openssl3

RUN npm install

COPY . /app

RUN npm install -g nodemon

RUN npx prisma generate

EXPOSE 3000

CMD ["nodemon", "--watch", ".", "--exec", "npm run dev"]


# docker exec -it database_port_louis mysql -u docker -p
# GRANT ALL PRIVILEGES ON *.* TO 'docker'@'%' WITH GRANT OPTION;
# FLUSH PRIVILEGES;
