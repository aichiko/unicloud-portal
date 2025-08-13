@echo off
echo 🚀 开始部署 Unicloud Portal...

REM 检查 Docker 是否运行
docker info >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Docker 未运行，请先启动 Docker
    pause
    exit /b 1
)

REM 停止并删除现有容器
echo 🛑 停止现有容器...
docker-compose down

REM 构建镜像
echo 🔨 构建 Docker 镜像...
docker-compose build --no-cache

REM 启动服务
echo 🎯 启动服务...
docker-compose up -d

REM 等待服务启动
echo ⏳ 等待服务启动...
timeout /t 10 /nobreak >nul

REM 检查服务状态
echo 🔍 检查服务状态...
docker-compose ps

REM 检查应用是否正常运行
echo 🌐 检查应用状态...
curl -f http://localhost:3000 >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ 应用部署成功！访问地址: http://localhost:3000
) else (
    echo ⚠️  应用可能还在启动中，请稍后访问: http://localhost:3000
)

echo.
echo 📋 使用以下命令查看日志:
echo    docker-compose logs -f unicloud-portal
echo.
echo 📋 使用以下命令停止服务:
echo    docker-compose down
echo.
pause
