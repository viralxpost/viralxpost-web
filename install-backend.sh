  #!/bin/bash

    echo "Installing backend dependencies..."
    cd backend || exit
    npm install
    echo "Starting backend..."
    npm start
