FROM node:23-alpine3.20
WORKDIR /app
ADD . /app
RUN yarn build 
EXPOSE 3000
CMD yarn start
