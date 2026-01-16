@echo off
echo 🔧 MongoDB Local Setup for Windows
echo.

echo 📋 Checking if MongoDB is installed...
where mongod >nul 2>&1
if %errorlevel% == 0 (
    echo ✅ MongoDB is already installed
    goto :start_mongo
)

echo ❌ MongoDB not found. Installing...
echo.
echo 📥 Please download and install MongoDB Community Server:
echo 🔗 https://www.mongodb.com/try/download/community
echo.
echo 📋 Installation steps:
echo 1. Download MongoDB Community Server (Windows x64)
echo 2. Run the installer (.msi file)
echo 3. Choose "Complete" installation
echo 4. Install as Windows Service (recommended)
echo 5. Install MongoDB Compass (optional GUI)
echo.
echo ⏳ After installation, restart this script
pause
exit /b

:start_mongo
echo 🚀 Starting MongoDB service...
net start MongoDB 2>nul
if %errorlevel% == 0 (
    echo ✅ MongoDB service started
) else (
    echo 🔄 Starting MongoDB manually...
    start /b mongod --dbpath "C:\data\db" 2>nul
    timeout /t 3 >nul
)

echo.
echo 🎯 MongoDB is ready!
echo 📍 Connection: mongodb://localhost:27017
echo.
echo 🚀 Now run: npm run seed
pause