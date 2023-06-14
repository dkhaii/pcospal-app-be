const responseClient = (status, message, data) => ({
  status,
  message,
  data,
});

const responseCustom = [];
const gptResponse = {};

module.exports = {
  responseClient,
  gptResponse,
  responseCustom,
};
