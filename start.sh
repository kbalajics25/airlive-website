#!/bin/bash

# Air Live Website Startup Script
# This script sets up and runs the Air Live Bar website

echo "🎵 Air Live Bar - Website Startup 🎵"
echo "===================================="
echo ""

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed. Please install Python 3.8 or higher."
    exit 1
fi

echo "✓ Python 3 detected"

# Check if pip is installed
if ! command -v pip3 &> /dev/null; then
    echo "❌ pip3 is not installed. Please install pip."
    exit 1
fi

echo "✓ pip3 detected"

# Install dependencies
echo ""
echo "📦 Installing dependencies..."
pip3 install -r requirements.txt

if [ $? -eq 0 ]; then
    echo "✓ Dependencies installed successfully"
else
    echo "❌ Failed to install dependencies"
    exit 1
fi

# Create contacts.json if it doesn't exist
if [ ! -f contacts.json ]; then
    echo "[]" > contacts.json
    echo "✓ Created contacts.json"
fi

echo ""
echo "🚀 Starting Air Live Bar website..."
echo ""
echo "📍 The website will be available at: http://localhost:5000"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

# Run the Flask application
python3 app.py