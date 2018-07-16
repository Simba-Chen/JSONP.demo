let fs = require('fs')
let http = require('http')
let url = require('url')

let server = http.createServer(function (request,response){
    var parsedUrl = url.parse(request.url, true) //将我的请求url，解析成一个对象
    let path = parsedUrl.pathname
    let query = parsedUrl.query
    if(path === '/pay'){
        let box = fs.readFileSync('./db','utf8')
        box -= 1
        fs.writeFileSync('./db',box)
        let callback = query.callback
        response.setHeader('Content-Type','application/javascript')
        response.write(`
            ${callback}.call(undefined,'success')
        `)
        response.end()
    }
})
server.listen(8081)
console.log('请打开浏览器，端口号8081')