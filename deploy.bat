@echo off
setlocal

set "REMOTE=felipepipe@192.168.0.107"
set "REMOTE_DIR=/var/www/felipebertoldi"

ssh "%REMOTE%" "mkdir -p '%REMOTE_DIR%/data' && rm -rf '%REMOTE_DIR%'/* && mkdir -p '%REMOTE_DIR%/data'"
if errorlevel 1 exit /b %errorlevel%

scp -r index.html styles.css script.js particles.js markdown-parser.js data/ "%REMOTE%:%REMOTE_DIR%"
if errorlevel 1 exit /b %errorlevel%

ssh "%REMOTE%" "if grep -qi 'todo' '%REMOTE_DIR%/script.js'; then echo ERROR: remote script.js still contains todo; exit 1; fi"
if errorlevel 1 exit /b %errorlevel%

echo Deploy completed. If the browser still shows old commands, press Ctrl+F5.

endlocal
