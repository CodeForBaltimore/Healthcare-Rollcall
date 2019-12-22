# Build from Node Alpine image
FROM node:12.11.0-alpine

# Create app directory
RUN mkdir -p /usr/src/frontend
WORKDIR /usr/src/frontend

# Install app dependencies
COPY ./frontend/package*.json ./
RUN npm install

# Bundle app source
COPY . .

# Expose port (will not be respected by Heroku, must be defined in app)
EXPOSE 8080

# Run app
CMD ["npm", "run", "serve"]