require("dotenv").config();

const { WebSocket, WebSocketServer } = require("ws");

const API_PORT = process.env.API_PORT || 3015;

const mlog = require("./helpers/Mlog");

const wss = new WebSocketServer(
  {
    port: API_PORT,
  },
  () => mlog.log(`----  WS server started on ${API_PORT} --- `)
);

wss.on("connection", function connection(ws, req) {
  const ip = req.socket.remoteAddress;
  const port = req.socket.remotePort;
  mlog.log(`client ip=${ip} p=${port}`);
  ws.on("error", (err) => {
    mlog.log(`ws err `);
  });
  ws.on("close", () => {
    mlog.log(`ws close ${ip} ${port}`);
  });
  ws.on("message", function (data) {
    //mlog.log(data);
    message = JSON.parse(data);
    mlog.log(`mes: ${message.message}`);
    switch (message.event) {
      case "message":
        broadcastMes(message, ws);
        break;
      case "connection":
        //broadcastMesConn(message, ws);
        break;
    }
  });
  const mes = {
    message: "connect",
    event: "message",
  };
  ws.send(JSON.stringify(mes));
});

const broadcastMes = (data, wsItself) => {
  wss.clients.forEach(function each(client) {
    if (client !== wsItself && client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
    if (client === wsItself && client.readyState === WebSocket.OPEN) {
      const mes = {
        message: "sent",
        event: "message",
      };
      client.send(JSON.stringify(mes));
    }
  });
};
const broadcastMesConn = (data, client) => {
  const mes = {
    message: "connect",
    event: "message",
  };
  client.send(JSON.stringify(mes));
};
