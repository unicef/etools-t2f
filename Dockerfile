FROM node:12.22.7-alpine3.12
RUN apk update

RUN apk add --update bash

RUN apk add git
RUN npm config set unsafe-perm true
RUN npm install -g --unsafe-perm bower polymer-cli@1.2.0 gulp-cli

WORKDIR /tmp
ADD bower.json /tmp/
ADD package.json /tmp/

RUN npm install
RUN bower --allow-root install

RUN mkdir /code/
ADD . /code/
WORKDIR /code
RUN cp -a /tmp/node_modules /code/node_modules
RUN cp -a /tmp/bower_components /code/bower_components
RUN gulp
EXPOSE 8080
CMD ["node", "express.js"]
