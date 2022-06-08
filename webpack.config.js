const { CONFIGURATION_MODE } = require('./webpack/common');
const { developmentConfiguration } = require('./webpack/dev.config');
const { productionConfiguration } = require('./webpack/prod.config');


module.exports = (env) => {
  switch (env.mode) {
    case CONFIGURATION_MODE.DEVELOPMENT :
      return developmentConfiguration;
    case CONFIGURATION_MODE.PRODUCTION:
      return productionConfiguration;
    default:
      return developmentConfiguration;
  }
};