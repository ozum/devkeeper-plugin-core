module.exports = {
  "*.{jsx,tsx,vue}": ["devkeeper lint --lintstaged"],
  "*.{js,ts}": ["devkeeper lint --lintstaged", "jest --bail --coverage --findRelatedTests --config=jest.config.js"],
  "*.{json,less,css,md,gql,graphql,html,yaml}": ["devkeeper format --lintstaged"],
};
