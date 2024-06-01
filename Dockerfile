# Use official Node.js LTS image as base
FROM node:alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# # Build the Next.js application
# RUN npm run build

# # Use lightweight Node.js image for production
# FROM node:lts-alpine

# # Set working directory
# WORKDIR /app

# # Copy the built application from the previous stage
# COPY --from=builder /app/.next ./.next

# # Expose port 3000
# EXPOSE 3000

# Command to run the Next.js application
CMD ["npm", "run","dev"]
