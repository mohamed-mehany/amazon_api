FROM node:7.8.0

ENV API_DIR /usr/src/app

# Create app directory
RUN mkdir -p $API_DIR
WORKDIR $API_DIR

# Install app dependencies
COPY package.json $API_DIR
RUN npm install


# Bundle app source
COPY . $API_DIR

# Expose application port
EXPOSE 3444
CMD [ "npm", "start" ]
