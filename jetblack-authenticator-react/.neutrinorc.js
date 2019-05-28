const standard = require('@neutrinojs/standardjs');
const reactComponents = require('@neutrinojs/react-components');

module.exports = {
  options: {
    root: __dirname,
  },
  use: [
    standard(),
    reactComponents(),
  ],
};
