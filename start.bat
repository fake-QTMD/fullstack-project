@echo off
chcp 65001 >nul
cd /d %~dp0

echo ==========================================
echo  前端开发2501班学习管理平台
echo  作者：吴钊燊  24001010208
echo  访问地址：http://localhost:8325
echo ==========================================
echo.

start "" cmd /c "timeout /t 2 >nul & start http://localhost:8325"
node backend\server.js

echo.
echo 服务已停止，按任意键关闭窗口。
pause >nul
