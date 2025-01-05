FROM node:alpine

# Set working directory
WORKDIR /usr/src/app

# Install necessary dependencies for Next.js build
RUN apk add --no-cache \
    python3 \
    make \
    g++ \
    libpng-dev \
    freetype-dev \
    libjpeg-turbo-dev \
    zip \
    git

# Copy and install dependencies
COPY package*.json ./
RUN npm install

# Copy application files
COPY . .

# Suppress Node.js deprecation warnings and run build
RUN NODE_NO_WARNINGS=1 npm run build

EXPOSE 3000
CMD ["npm", "start"]
