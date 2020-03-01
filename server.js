var http = require('http')
var fs = require('fs')
var url = require('url')
var port = process.argv[2]

if(!port){
  console.log('请指定端口号 比如\nnode server.js 8888 这样')
  process.exit(1)
}

var server = http.createServer(function(request, response){
  var parsedUrl = url.parse(request.url, true)
  var pathWithQuery = request.url 
  var queryString = ''
  if(pathWithQuery.indexOf('?') >= 0){ queryString = pathWithQuery.substring(pathWithQuery.indexOf('?')) }
  var path = parsedUrl.pathname
  var query = parsedUrl.query
  var method = request.method

  /******** 从这里开始看，上面不要看 ************/

  console.log('有个人发请求过来啦！路径（带查询参数）为：' + pathWithQuery)
    response.statusCode = 200

    //获得请求文件的路径，如果请求的是根目录，则返回index.html
    const filePath = path === "/" ? "/index.html" : path;

    //根据请求的根目录文件后缀设置header的text类型
    //1.fileType中为filePath中索引到的最后一个"."后的字符串
    const fileType = filePath.lastIndexOf(".");
    //2.建立哈希表，文件类型对应text
    const fileHash ={
      ".html":"text/html",
      ".css" :"text/css",
      ".js"  :"text/javascript",
      ".json":"text/json",
      ".xml" :"text/xml",
      ".png" :"image/png",
      ".jpg" :"image/jpeg"
    }
    //3.如果读取失败，则默认为text/html
    response.setHeader('Content-Type', `${fileHash[fileType] || "text/html"};charset=utf-8`)

    //读取对应的文件，若文件不存在，则输出404
    let content
    try{
      content = fs.readFileSync(`./src${filePath}`);
    }catch(error){
      content = "文件不存在";
      response.write(`你访问的页面不存在`)
      response.statusCode = 404
    } 

    response.write(content)
    response.end()

  /******** 代码结束，下面不要看 ************/
})

server.listen(port)
console.log('监听 ' + port + ' 成功\n请用在空中转体720度然后用电饭煲打开 http://localhost:' + port)

