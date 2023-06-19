const fs = require("fs");
require("dotenv").config();

const logFile = "logs/log.txt";
const mesFile = "logs/mes.txt";

class Mlog {
  constructor() {
    this.debug = true; // process.env.API_DEBUG === "1" ? true : false;
    this._fileEn = true;
  }

  getMes() {
    // let cnt = 0;
    // let fileExist = false;
    // try {
    //   fs.accessSync(ans, fs.constants.R_OK | fs.constants.W_OK);
    //   fileExist = true;
    //   console.log("can read/write");
    // } catch (err) {
    //   console.error("no access!");
    // }
    // if (!fileExist) {
    //   fs.writeFileSync(ans, "0");
    // }
    // try {
    //   const text = fs.readFileSync(ans, "utf8");
    //   cnt = Number.parseInt(text);
    // } catch (e) {}
    // console.log(`cntAns=${cnt}`);
    // return cnt;
  }

  saveMes(mes) {
    // 2021-05-28T23:11:42.805Z
    const t = new Date().toISOString();
    const tt = `${t.substring(2, 19)}`;
    const str = JSON.stringify(mes, null, 2);
    const m = `${tt} ${str}`;
    console.log(m);
    if (this._fileEn) {
      const m1 = `\r\n${m}`;
      fs.appendFileSync(mesFile, m1);
    }
  }

  log(...args) {
    // 2021-05-28T23:11:42.805Z
    const t = new Date().toISOString();
    const tt = `${t.substring(2, 19)}`;
    const m = `${tt} ${args}`;
    console.log(m);
    if (this._fileEn) {
      const m1 = `\r\n${m}`;
      fs.appendFileSync(logFile, m1);
    }
  }

  log2(...args) {
    const t = new Date().toISOString();
    const tt = `${t.substring(2, 19)}`;
    const m = `${tt} ${args}`;
    console.log(m);
    if (this._fileEn2) {
      const m1 = `\r\n${m}`;
      fs.appendFileSync(logFile, m1);
    }
  }
}

const mlog = new Mlog();
module.exports = mlog;
