FROM node:alpine
WORKDIR /app
COPY ["package.json", "yarn.lock", "./"]
COPY ./packages/server/ ./packages/server/
RUN yarn install --production
CMD ["yarn", "server:prod"]