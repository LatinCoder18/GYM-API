const si = require('systeminformation');

/**
 * Get System Info and output it to the console
 * @cpu manufacturer, brand
 * @system model, manufacturer,
 * @mem total,free,used / 1024 / 1024
 * @osInfo platform, arch, hostname
 */

const systeminfo = async () => {
    const system = await si.system()
    const cpu = await si.cpu()
    const mem = await si.mem()
    const osInfo = await si.osInfo()
    console.log(`Running on ${osInfo.platform.green}`);
    console.log(`Ram Info - TOTAL: ${String(((mem.total/1024)/1024)).green} MB USED: ${String(((mem.used/1024)/1024)).green} MB FREE: ${String(((mem.free/1024)/1024)).green} MB`);
    console.log(`CPU Info Brand: ${cpu.brand.green} Cores: ${String(cpu.cores).green}`);
}

module.exports = { systeminfo }