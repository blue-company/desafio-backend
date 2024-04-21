FROM node:18-alpine3.18

WORKDIR /usr/src/app

COPY package*.json ./

RUN apk --no-cache add --virtual build-deps \
    bash g++ gcc libgcc libstdc++ linux-headers make python3 \
    && npm install --quiet node-gyp forever -g \
    && npm install \
    && npm install argon2 --quiet \
    && apk del build-deps

COPY scripts/generate-keys.sh ./generate-keys.sh

RUN chmod +x ./generate-keys.sh

RUN /bin/sh ./generate-keys.sh  

COPY . .

EXPOSE 3000

CMD [ "npm", "run", "prod" ]