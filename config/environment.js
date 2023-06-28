const fs = require('fs');
const path = require('path');
const yaml = require('yaml');

const parseAppYaml = () => {
  const filePath = path.resolve('./app.yaml');
  const appYaml = fs.readFileSync(filePath, 'utf8');
  const appYamlData = yaml.parse(appYaml);

  const {
    DB_HOST,
    DB_USER,
    DB_PASSWORD,
    DB_DATABASE,
    DB_DIALECT,
    DB_SOCKET,
    APP_ENV,
    JWT_SECRET_KEY,
    OPENAI_API_KEY,
  } = appYamlData.env_variables;

  return {
    DB_HOST,
    DB_USER,
    DB_PASSWORD,
    DB_DATABASE,
    DB_DIALECT,
    DB_SOCKET,
    APP_ENV,
    JWT_SECRET_KEY,
    OPENAI_API_KEY,
  };
};

module.exports = parseAppYaml;
