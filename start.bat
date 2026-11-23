@echo off
rem Author: Wu Zhaoshen 24001010208
chcp 65001 >nul
cd /d "%~dp0"

set "NODE_EXE=C:\Program Files\Huawei\DevEco Studio\tools\node\node.exe"
if exist "%NODE_EXE%" goto Cheney_run

where node >nul 2>nul
if errorlevel 1 goto Cheney_no_node
set "NODE_EXE=node"

:Cheney_run
echo ==========================================
echo  前端开发24002班学习管理平台
echo  作者：吴钊燊  24001010208
echo  访问地址：http://localhost:8325
echo ==========================================
echo.

start "" cmd /c "timeout /t 2 >nul & start http://localhost:8325"
"%NODE_EXE%" backend\server.js

echo.
echo 服务已停止，按任意键关闭窗口。
pause >nul
goto :eof

:Cheney_no_node
echo 未找到 Node.js，请安装 Node.js 或修改 start.bat 中的 NODE_EXE 路径。
pause
exit /b 1
