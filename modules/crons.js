const CronJob = require('cron').CronJob;
const moment = require('moment');
const Client = require('../models/client');
const axios = require('axios');

const main = async () => {
  const job = new CronJob('0 0 0 * * *', async function () {
    const today = moment().format('YYYY-MM-DD');
    const clients = await Client.find({ $and: [{ status: true },{ daysback: false }, { servicedays: { $gt: 0 } }] });
    for (const client of clients) {
      client.servicedays = client.servicedays - 1;
      await client.save();
    }
    console.log(today + `: ${clients.length} clients updated`);
  }, null, true, 'America/Los_Angeles');
  job.start();   
  //await axios.get(`https://maker.ifttt.com/trigger/adonys2/with/key/bF_VjsJqkLr0HDutWtIF46?value1=5358542967&value2=The%20Social%20Network&value3=58415`);
}

module.exports = { main };