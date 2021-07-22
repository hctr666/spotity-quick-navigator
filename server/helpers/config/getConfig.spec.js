const getConfig = require('./getConfig');

test('returns the config value', () => {
  expect(getConfig('spotify.clientId')).toBe(process.env.SPOTIFY_CLIENT_ID);
});

test('returns a non existent config value', () => {
  expect(getConfig('spotify.anotherVar')).toBe(null);
});
