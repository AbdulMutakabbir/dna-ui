FROM node:14.15.0

# Creating the workdirectory
WORKDIR /app

# Copies package.json and package-lock.json to Docker environment
COPY package*.json ./

# Installs all node packages
RUN npm install
RUN npm audit fix

