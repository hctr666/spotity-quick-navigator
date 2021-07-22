const env = (key, fallback) => {
  if (!key || typeof key !== 'string') {
    throw new Error('Invalid key was provided');
  }

  const value = process.env[key];

  if (!value) {
    if (!fallback) console.warn('No fallback key was provided');
    return fallback;
  }

  return value;
};

module.exports = env;
