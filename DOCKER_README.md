# Docker 部署指南

本项目支持使用 Docker 和 Docker Compose 进行容器化部署。

## 📋 前提条件

- 安装 Docker (>= 20.0)
- 安装 Docker Compose (>= 2.0)
- 确保 9001 端口未被占用

## 🚀 快速部署

### 一键部署

```bash
# 1. 构建并启动（简单模式）

docker-compose -f docker-compose.simple.yml up --build -d

# 2. 或使用完整配置
docker-compose up --build -d

# 3. 访问应用
# http://localhost:9001
```

### 方法一：使用部署脚本

**Linux/macOS:**
```bash
chmod +x deploy.sh
./deploy.sh
```

**Windows:**
```cmd
deploy.bat
```

### 方法二：手动部署

1. **构建镜像**
```bash
docker-compose build
```

2. **启动服务**
```bash
docker-compose up -d
```

3. **查看状态**
```bash
docker-compose ps
```

4. **访问应用**
打开浏览器访问: http://localhost:3000

## 📁 文件说明

- `Dockerfile` - Docker 镜像构建文件
- `docker-compose.yml` - 完整的 Docker Compose 配置（包含 Nginx）
- `docker-compose.simple.yml` - 简化版配置（仅 Next.js）
- `nginx.conf` - Nginx 反向代理配置
- `.dockerignore` - Docker 构建忽略文件
- `deploy.sh` / `deploy.bat` - 自动部署脚本

## 🔧 配置选项

### 环境变量

在 `docker-compose.yml` 中可以配置以下环境变量：

- `NODE_ENV` - 运行环境 (production)
- `PORT` - 应用端口 (3000)
- `JWT_SECRET` - JWT 密钥（生产环境请修改）

### 端口配置

默认端口映射：
- Next.js 应用: `33999:3000`
- Nginx (如果启用): `9001:80`, `443:443`

如需修改端口，编辑 `docker-compose.yml`:
```yaml
ports:
  - "8080:3000"  # 将应用映射到 8080 端口
```

## 📊 日志管理

### 查看实时日志
```bash
docker-compose logs -f unicloud-portal
```

### 查看 Nginx 日志（如果启用）
```bash
docker-compose logs -f nginx
```

## 🛠️ 常用命令

### 停止服务
```bash
docker-compose down
```

### 重启服务
```bash
docker-compose restart
```

### 重新构建并启动
```bash
docker-compose up --build -d
```

### 清理未使用的镜像
```bash
docker system prune -f
```

### 进入容器
```bash
docker exec -it unicloud-portal sh
```

## 🔒 生产环境部署

### 1. 安全配置

修改 `docker-compose.yml` 中的 JWT 密钥：
```yaml
environment:
  - JWT_SECRET=your_production_secret_key_here
```

### 2. 使用 HTTPS

启用 Nginx 服务并配置 SSL 证书：
```yaml
services:
  nginx:
    volumes:
      - ./ssl:/etc/nginx/ssl:ro
```

### 3. 资源限制

添加资源限制：
```yaml
services:
  unicloud-portal:
    deploy:
      resources:
        limits:
          memory: 512M
          cpus: '0.5'
```

## 🐛 故障排除

### 容器无法启动
1. 检查端口是否被占用：`netstat -tlnp | grep 3000`
2. 查看容器日志：`docker-compose logs unicloud-portal`
3. 检查 Docker 资源使用：`docker stats`

### 应用无法访问
1. 确认容器正在运行：`docker-compose ps`
2. 检查防火墙设置
3. 确认端口映射正确

### 构建失败
1. 清理 Docker 缓存：`docker system prune -a`
2. 检查网络连接（npm 镜像）
3. 确认 Node.js 版本兼容性

## 📈 性能优化

### 1. 多阶段构建
Dockerfile 已使用多阶段构建来减少镜像大小。

### 2. 缓存优化
- 使用 `.dockerignore` 减少构建上下文
- 分层复制依赖文件以利用 Docker 缓存

### 3. 资源监控
```bash
# 监控容器资源使用
docker stats unicloud-portal
```

## 🔄 更新部署

更新应用时：
```bash
git pull
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

## 🆘 支持

如遇问题，请检查：
1. Docker 版本是否满足要求
2. 系统资源是否充足
3. 网络连接是否正常
4. 日志中的错误信息
