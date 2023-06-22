const fs = require("fs");
const mlog = require("./Mlog");
require("dotenv").config();

const mesFile = "logs/mes.txt";

class Mes {
  constructor() {
    this._fileEn = true;
  }

  getLastMes() {
    let lastMes = "";
    let fileExist = false;
    try {
      fs.accessSync(mesFile, fs.constants.R_OK | fs.constants.W_OK);
      fileExist = true;
      //mlog.log("can read/write");
    } catch (err) {
      mlog.log("no access!");
    }
    if (!fileExist) {
      fs.writeFileSync(mesFile, "");
      return "";
    }
    try {
      lastMes = fs.readFileSync(mesFile, "utf8");
    } catch (e) {}
    mlog.log(`lastMes=${lastMes}`);
    return lastMes;
  }

  saveMes(str) {
    // 2021-05-28T23:11:42.805Z
    const t = new Date().toISOString();
    const tt = `${t.substring(2, 19)}`;
    const m = `${tt} ${str}`;
    //console.log(m);
    if (this._fileEn) {
      //const m1 = `${m}`;
      fs.writeFileSync(mesFile, m);
    }
  }

  checkMes(payload) {
    const { event, message } = payload;
    if (event !== "message") return null;
    //console.log(`mes to save: ${message}`);
    if (message.length < 4) return null;
    const oneone = message.substring(0, 4);
    if (oneone !== "1111") return null;
    const str = message.substring(4);
    this.saveMes(str);
    return str;
  }
}

const wsMes = new Mes();
module.exports = wsMes;
