const config = require('../../config/config');

const getConfig = (key) => {

  const subKeys = key.split('.');

  if (!subKeys.length) throw new Error('No config value found with given key');

  let value;

  for (let subKey of subKeys) {
    if (!value) {
      value = config[subKey];
    } else if (typeof value[subKey] !== 'undefined') {
      value = value[subKey]
    } else {
      return null
    }
  }

  return value;
}

module.exports = getConfig;
