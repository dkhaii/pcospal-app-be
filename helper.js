const responseClient = (status, message, data) => ({
  status,
  message,
  data,
});

const responseCustom = {};

module.exports = {
  responseClient,
  responseCustom,
};
