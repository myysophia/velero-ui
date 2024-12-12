const jsonServer = require('json-server')
const server = jsonServer.create()
const db = require('./db.js')()
const router = jsonServer.router(db)
const routes = require('./routes.json')

// 自定义路由
Object.keys(routes).forEach(key => {
  server.get(key, (req, res) => {
    const newPath = routes[key]
    const segments = newPath.split('/')
    let data = db
    segments.forEach(segment => {
      if (segment) {
        data = data[segment]
      }
    })
    res.json(data)
  })
})

server.use(jsonServer.defaults())
server.use(router)

server.listen(8081, () => {
  console.log('JSON Server is running on port 8081')
}) 