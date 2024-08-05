#!/bin/bash

    echo "Installing frontend dependencies..."
    cd frontend || exit
    npm install
    echo "Starting frontend..."
    npm run dev
