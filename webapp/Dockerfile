FROM node:21.6.1

COPY . /app
WORKDIR /app

#Install the dependencies
RUN npm install

ARG REACT_APP_API_URI
ENV REACT_APP_API_URI=$REACT_APP_API_URI
ARG REACT_APP_SOCKET_URI
ENV REACT_APP_SOCKET_URI=$REACT_APP_SOCKET_URI
#Create an optimized version of the webapp
RUN npm run build
RUN npm install serve

#Execute npm run prod to run the server
CMD [ "npm", "run", "prod" ]
#CMD ["npm", "start"]