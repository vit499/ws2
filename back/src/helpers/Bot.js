const axios = require("axios");
require("dotenv").config();

const token = process.env.TOKEN;
const chat_id_grp = process.env.CHAT;
// const chat_id_grp = cfg.chat;
// const token = cfg.token;
const Url = `https://api.telegram.org/bot${token}/sendMessage`;

class Bot {
  async send(text) {
    if (!token || !chat_id_grp) return;
    //console.log(`bot token=${token} chat=${chat_id_grp} mes=${text}`);
    try {
      const res = await axios.post(Url, { chat_id: chat_id_grp, text });
      // console.log(res.data);
    } catch (err) {
      console.error(err);
    }
  }
}

const bot = new Bot();

module.exports = bot;
