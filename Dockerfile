FROM mhart/alpine-node:6
RUN apk update
WORKDIR /tmp
RUN apk add git
RUN npm install -g bower polymer-cli http-server
ADD package.json /tmp
RUN apk add autoconf gcc automake make g++ python-dev libffi-dev nasm curl wget
RUN npm install
RUN mkdir /code/
RUN cp -a /tmp/node_modules /code/node_modules
ADD bower.json /tmp
RUN echo '{"directory" : "/code/bower_components"}' > .bowerrc
RUN bower --allow-root install
ADD . /code/
WORKDIR /code
RUN npm install -g gulp-cli
RUN gulp
CMD ["http-server", "/code/build/bundled"]
