# 中国一流高校搜索程序

预览地址: https://hacker0limbo.github.io/china-top-univ

该项目为移动端项目, 请在手机浏览器中打开

## 开发与部署流程

### 本地开发与部署

```bash
git clone https://github.com/hacker0limbo/china-top-univ.git
npm install
# 生成表格数据
node makeData.js
# 生成索引数据
node makeIndex.js
npm run start
```

```bash
# 部署, 使用 gh-pages 部署到 github page
npm run deploy
```

### 使用 Docker 开发与部署

```bash
# 开发
docker-compose -f docker-compose.dev.yml up -d --build
# 打开 localhost:3000

# 查看启动的容器
docker-compose -f docker-compose.dev.yml ps
# 监听容器内日志的输出
docker-compose -f docker-compose.dev.yml logs -f -t
# 停止并删除容器以及数据卷
docker-compose -f docker-compose.dev.yml down -v
```

```bash
# 生产部署
docker-compose -f docker-compose.prod.yml up -d --build
# 打开 localhost:3001

# 停止并删除容器以及数据卷
docker-compose -f docker-compose.prod.yml down
```
