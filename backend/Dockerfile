# Build from Node Alpine image
FROM node:12.11.0-alpine

# Create app directory
RUN mkdir -p /usr/src/backend
WORKDIR /usr/src/backend

# Bundle app source
COPY . .

# Install app dependencies
RUN npm install

# Expose port (will not be respected by Heroku, must be defined in app)
EXPOSE 3000

# Run app
CMD ["npm", "start"]