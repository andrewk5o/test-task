FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json* tsconfig.json tsconfig.build.json ./
RUN npm install --no-audit --no-fund

COPY src ./src

ENV NODE_ENV=development

EXPOSE 3000 9229

CMD ["npm", "run", "start:dev"]

