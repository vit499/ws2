require("dotenv").config();

const { WebSocket, WebSocketServer } = require("ws");

const API_PORT = process.env.API_PORT || 3015;

const mlog = require("./helpers/Mlog");
const wsMes = require("./helpers/Mes");
const bot = require("./helpers/Bot");

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
    payload = JSON.parse(data);
    mlog.log(`mes: ${payload.message}`);
    switch (payload.event) {
      case "message":
        const s = checkMes(payload, ws);
        break;
      case "connection":
        //broadcastMesConn(payload, ws);
        break;
    }
  });
  sendWhenConn(ws);
});

const sendWhenConn = (client) => {
  const mes = {
    message: "connect",
    event: "message",
  };
  const lastMes = wsMes.getLastMes();
  if (lastMes !== "") {
    mes.message = lastMes;
  }
  client.send(JSON.stringify(mes));
};
const broadcastMes = (payload, wsItself) => {
  wss.clients.forEach(function each(client) {
    if (client !== wsItself && client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(payload));
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

const checkMes = (payload, client) => {
  let a1 = false;
  const mes = payload.message;
  if (mes.length >= 4) {
    const a1111 = mes.substring(0, 4);
    if (a1111 === "1111") {
      a1 = true;
    }
  }
  if (a1) {
    const str = mes.substring(4);
    wsMes.saveMes(str);
    payload.message = str;
  } else {
    wsMes.saveMes("");
  }
  broadcastMes(payload, client);
  bot.send(mes);
};
