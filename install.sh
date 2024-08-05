#!/bin/bash

# Install and start frontend
echo "Installing frontend dependencies..."
cd frontend || exit
npm install
echo "Starting frontend..."
npm run dev &
FRONTEND_PID=$!

# Install and start backend
echo "Installing backend dependencies..."
cd ../backend || exit
npm install
echo "Starting backend..."
npm start &
BACKEND_PID=$!

# Wait for both processes to finish
wait $FRONTEND_PID
wait $BACKEND_PID

