#!/usr/bin/env bash
# ========================================================
# Navaneeth Sankar Portfolio - Full Stack Runner Script
# Runs Django Backend (Port 8000) & Vite React (Port 5173)
# ========================================================

set -e

PORTFOLIO_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BACKEND_DIR="$PORTFOLIO_DIR/backend"
FRONTEND_DIR="$PORTFOLIO_DIR/frontend"

echo "===================================================="
echo "🚀 Starting Navaneeth Sankar Portfolio Application"
echo "===================================================="

# Activate Backend Virtualenv & Run Django
echo "-> Starting Django REST Framework on http://127.0.0.1:8000..."
source "$BACKEND_DIR/venv/bin/activate"
python "$BACKEND_DIR/manage.py" runserver 0.0.0.0:8000 &
BACKEND_PID=$!

# Trap SIGINT and SIGTERM to kill background processes cleanly
cleanup() {
  echo ""
  echo "Shutting down servers..."
  kill $BACKEND_PID 2>/dev/null || true
  exit 0
}
trap cleanup SIGINT SIGTERM

# Start Vite Frontend
echo "-> Starting React (Vite) on http://localhost:5173..."
cd "$FRONTEND_DIR"
npm run dev -- --host 0.0.0.0

wait $BACKEND_PID

