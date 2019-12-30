// 导入websocket模块
const WebSocket = require('ws');

// 引用Server类
const WebSocketServer = WebSocket.Server;

// 实例化
const myWs = new WebSocketServer({
  port: 9000
});

// 遍历分发
function boardCost (obj) {
  myWs.clients.forEach((conn) => {
    conn.send(JSON.stringify(obj));
  })
}

myWs.on('connection', ws => {
  ws.on('message', message => {
    // 接受消息群发
    try {
      const msg = JSON.parse(message);
      console.log(msg);
      boardCost(msg);
    // eslint-disable-next-line no-empty
    } catch (e) { }
  })

  // setInterval(() => {
  //   ws.send('hello connection success!!!' + i);
  //   i++;
  // }, 1000);
});