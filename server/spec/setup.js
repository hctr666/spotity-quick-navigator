require('dotenv').config({
  path: '.env.sample'
});

global.console = {
  ...console,
  warn: jest.fn()
}
