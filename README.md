## server.js 简易的静态服务器

### 启动应用
node server.js 8888

或者

node server 8888

支持在src中的文件浏览，可以直接添加"\path"

编辑 server.js 文件后，需要重新运行 node server.js 8888

### 后台启动应用
touch log node server.js 8888 >log log 2>&1 &
