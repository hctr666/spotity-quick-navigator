const env = require('./env');

test('returns the environment variable that matches a given key', () => {
  expect(env('SPOTIFY_CLIENT_ID')).toBe(process.env.SPOTIFY_CLIENT_ID);
});

test('returns the fallback value when given key doesn\'t find matches', () => {
  const fallback = '<some-fallback-value>';
  expect(env('FAKE_ENV_KEY', fallback)).toBe(fallback);
});

test('returns the undefined value when given key doesn\'t find matches and a fallback is not provided', () => {
  expect(env('FAKE_ENV_KEY')).toBe(undefined);
  expect(console.warn).toHaveBeenCalled();
});
