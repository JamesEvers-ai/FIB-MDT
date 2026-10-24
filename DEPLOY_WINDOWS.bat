@echo off
setlocal
cd /d "%~dp0"
echo ==========================================
echo FIB MDT - Cloudflare Pages Deployment
echo ==========================================
echo.
if not exist "functions\api\[[path]].js" (
  echo FEHLER: Pages Function nicht gefunden.
  echo Bitte dieses Skript im vollstaendigen Projektordner ausfuehren.
  pause
  exit /b 1
)
if not exist "public\index.html" (
  echo FEHLER: public\index.html nicht gefunden.
  pause
  exit /b 1
)
where npm >nul 2>nul
if errorlevel 1 (
  echo FEHLER: Node.js/npm wurde nicht gefunden. Installiere Node.js LTS.
  pause
  exit /b 1
)
echo Installiere Projektabhaengigkeiten...
call npm install
if errorlevel 1 (
  echo FEHLER bei npm install.
  pause
  exit /b 1
)
echo.
echo Starte Deployment zum Cloudflare Pages Projekt fib-mdt...
call npm run deploy
if errorlevel 1 (
  echo.
  echo Deployment fehlgeschlagen. Lies die Fehlermeldung oben.
  pause
  exit /b 1
)
echo.
echo Deployment-Befehl beendet. Pruefe danach:
echo https://fib-mdt.pages.dev/api/health
pause
