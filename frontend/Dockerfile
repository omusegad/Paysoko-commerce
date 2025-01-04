
FROM node:alpine

# Set working directory
WORKDIR /usr/src/app

# Copy and install dependencies
COPY package*.json ./
RUN npm install

# Copy application files
COPY . .

# Build the React app
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
