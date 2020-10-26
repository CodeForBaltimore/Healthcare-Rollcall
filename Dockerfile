# Build from Node Alpine image
FROM node:12.11.0-alpine
ARG PORT=3000
ENV PORT=$PORT

# Create app directory
RUN mkdir -p /usr/src
WORKDIR /usr/src

# Install app dependencies
COPY ./package*.json ./
RUN npm install --loglevel warn

# Bundle app source
COPY . .

EXPOSE $PORT

# Run app
CMD ["npm","start"]
