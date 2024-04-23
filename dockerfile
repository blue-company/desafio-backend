# This Dockerfile sets up a Node.js environment for a backend application.
# It installs the necessary dependencies, copies the application code,
# generates keys, and exposes the application on port 3000.

FROM node:18-alpine3.18

WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install build dependencies
RUN apk --no-cache add --virtual build-deps \
    bash g++ gcc libgcc libstdc++ linux-headers make python3

# Copy the entire application code to the working directory
COPY . .

# If .env file does not exist, copy .env-example to .env
RUN if [ ! -f .env ]; then cp .env-example .env; fi

# Install required npm packages
RUN npm install --quiet node-gyp forever -g \
    && npm install \
    && npm install argon2 --quiet \
    && apk del build-deps

# Copy the generate-keys.sh and entrypoint.sh script to the working directory
COPY scripts/generate-keys.sh ./scripts/generate-keys.sh
COPY scripts/entrypoint.sh ./scripts/entrypoint.sh

# Make the scripts executable
RUN chmod +x ./scripts/generate-keys.sh
RUN chmod +x ./scripts/entrypoint.sh

# Expose port 3000 for the application
EXPOSE 3000

# Use the entrypoint script to start the application
ENTRYPOINT ["sh", "./scripts/entrypoint.sh"]
