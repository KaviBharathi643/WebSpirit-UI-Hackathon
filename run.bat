@echo off
title Animated Mascot Login & Tutor Dashboard
color 0B

echo =======================================================
echo   Animated Mascot Login & Tutor Dashboard
echo =======================================================
echo.
echo [1/2] Navigating to project directory...
cd /d "%~dp0"

echo [2/2] Launching Vite development server and opening browser...
echo.
echo Local URL: http://localhost:5173/
echo.
echo Press Ctrl+C in this window anytime to stop the server.
echo =======================================================
echo.

:: Launch the browser and Vite dev server
start http://localhost:5173/
call npm.cmd run dev

pause
