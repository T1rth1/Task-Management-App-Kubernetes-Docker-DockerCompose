FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

# Copies all files and folders from the current build context (local project directory) into the container's working directory (/app)
# copy from the build context (the folder you run docker build from)
COPY . . 

EXPOSE 5000

CMD ["node","index.js"]