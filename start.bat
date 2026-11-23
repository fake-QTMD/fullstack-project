@echo off
rem 姓名：吴钊燊 | 学号：24001010208 | 时间：2026-11-23 | 大模型：DeepSeek
chcp 65001 >nul
cd /d %~dp0

set "NODE_EXE="
where node >nul 2>nul
if not errorlevel 1 set "NODE_EXE=node"

if not defined NODE_EXE if exist "C:\Program Files\Huawei\DevEco Studio\tools\node\node.exe" set "NODE_EXE=C:\Program Files\Huawei\DevEco Studio\tools\node\node.exe"
if not defined NODE_EXE if exist "C:\Program Files\nodejs\node.exe" set "NODE_EXE=C:\Program Files\nodejs\node.exe"

if not defined NODE_EXE (
    echo 未找到 Node.js，请先安装 Node.js 或修改 start.bat 中的 NODE_EXE 路径。
    pause
    exit /b 1
)

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
