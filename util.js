const os = require('os');
const colors = require('colors');

exports.serviceInfo = () => {
  console.log(colors.rainbow('Service link:'));
  console.log(colors.green(`${os.networkInterfaces()[Object.keys(os.networkInterfaces())[0]][1].address}:3000`));
}