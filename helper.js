const responseClient = (status, message, data) => ({
  status,
  message,
  data,
});

const responseCustom = {};

const validateNumberData = (value) => {
  if (typeof value !== 'number') {
    return false;
  }

  return true;
};

module.exports = {
  responseClient,
  responseCustom,
  validateNumberData,
};
