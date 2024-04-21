# Use an official Node.js runtime as a parent image
FROM node:21.6.1

# Set the working directory in the container
WORKDIR /usr/src/roomservice

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install
#OBTENER LA RAVILE PAR QUE SOCKET PERMITA CONEX
ARG REACT_APP_API_URI
ENV REACT_APP_API_URI=$REACT_APP_API_URI
# Copy the app source code to the working directory
COPY . .

# Expose the port the app runs on
EXPOSE 8005

# Define the command to run your app
CMD ["node", "room-service.js"]
