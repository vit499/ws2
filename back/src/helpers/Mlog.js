const fs = require("fs");
require("dotenv").config();

const logFile = "logs/log.txt";

class Mlog {
  constructor() {
    this.debug = true; // process.env.API_DEBUG === "1" ? true : false;
    this._fileEn = true;
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

  // log2(...args) {
  //   const t = new Date().toISOString();
  //   const tt = `${t.substring(2, 19)}`;
  //   const m = `${tt} ${args}`;
  //   console.log(m);
  //   if (this._fileEn2) {
  //     const m1 = `\r\n${m}`;
  //     fs.appendFileSync(logFile, m1);
  //   }
  // }
}

const mlog = new Mlog();
module.exports = mlog;
