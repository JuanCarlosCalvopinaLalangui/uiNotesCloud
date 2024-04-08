# Use an official Node.js runtime as the base image
FROM node:latest

# Set the working directory in the container to /usr/app
WORKDIR /usr/app

# Copy package.json into the working directory
COPY package.json .
COPY tsconfig.json .

# Install the app dependencies for react typescript
RUN npm install && npm cache clean --force

# Copy the rest of the app files into the working directory
#COPY src/. ./src/
#COPY public/index.html ./public/index.html 
COPY . .

# Make port 3000 available outside the container
# EXPOSE 3000

# Define the command to run the app when the container launches
# Remove the ENTRYPOINT line

# Run the app when the container is started
CMD ["npm", "start"]
#CMD ["npm", "start"]