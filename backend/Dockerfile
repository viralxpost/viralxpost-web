# Use a multi-stage build to optimize the image size
FROM node:18-alpine as builder

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install all dependencies including devDependencies for building
RUN npm ci

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Use a smaller base image for the final production image
FROM node:18-alpine

WORKDIR /app

# Copy package.json and package-lock.json again
COPY package*.json ./

# Set NODE_ENV to production
ENV NODE_ENV=production

# Install only production dependencies
RUN npm ci --only=production

# Copy the built application from the builder stage
COPY --from=builder /app/dist ./dist

# Change ownership and permissions
RUN chown -R node:node /app && chmod -R 755 /app

# Install pm2 globally
RUN npm install pm2 -g

# Copy the PM2 ecosystem file
COPY ecosystem.config.js .

# Use node user to run the application
USER node

# Expose the necessary port
EXPOSE 5513

# Start the application using pm2
CMD ["pm2-runtime", "start", "ecosystem.config.js"]
