#!/bin/bash

# Install client dependencies and build
echo "Installing client dependencies..."
cd client
npm install

echo "Building client..."
npm run build

# Install server dependencies
echo "Installing server dependencies..."
cd ../server
npm install

echo "Build completed successfully!"
