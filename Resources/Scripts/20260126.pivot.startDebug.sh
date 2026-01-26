#!/bin/bash

echo "🛑 Stopping all existing processes..."
lsof -ti:3001,5173 2>/dev/null | xargs kill -9 2>/dev/null
pkill -9 -f "vite|tsx watch" 2>/dev/null
sleep 2

echo ""
echo "✅ All processes stopped"
echo ""
echo "🚀 Starting backend..."
cd backend
npm run dev &
BACKEND_PID=$!

echo "⏳ Waiting for backend to start..."
sleep 3

echo ""
echo "🚀 Starting frontend..."
cd ../frontend
npm run dev &
FRONTEND_PID=$!

echo ""
echo "✅ Servers started!"
echo ""
echo "📍 Backend PID: $BACKEND_PID"
echo "📍 Frontend PID: $FRONTEND_PID"
echo ""
echo "🌐 Frontend: http://localhost:5173"
echo "🌐 Backend: http://localhost:3001"
echo ""
echo "Press Ctrl+C to stop both servers"
echo ""

# Wait for both processes
wait


