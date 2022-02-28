const CronJob = require('cron').CronJob;
const moment = require('moment');
const Client = require('../models/client');


const main = async () => {
  const job = new CronJob('0 0 0 * * *', async function () {
    const today = moment().format('YYYY-MM-DD');
    const clients = await Client.find({ $and: [{ status: true }, { servicedays: { $gt: 0 } }] });
    for (const client of clients) {
      client.servicedays = client.servicedays - 1;
      await client.save();
    }
    console.log(new Date().toLocaleDateString() + `: ${clients.length} clients updated`);
  }, null, true, 'America/Los_Angeles');
  job.start();
}

module.exports = { main };