FROM hypriot/rpi-node:4.5.0

# Create app directory
RUN mkdir -p /apps/weatherWeb
WORKDIR /apps/weatherWeb

# Install npm modules
COPY package.json /apps/weatherWeb/

RUN npm install -g bower-npm-resolver && \
npm install -g bower && \
npm install

# Install bower modules
COPY bower.json /apps/weatherWeb/
COPY .bowerrc /apps/weatherWeb/

# use --allow-root because of issue: https://github.com/bower/bower/issues/1752
RUN bower install --allow-root

COPY . /apps/weatherWeb

EXPOSE 3000

CMD [ "node", "server.js" ]