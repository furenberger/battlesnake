require('dotenv').config();
const { info } = require('./src/util');
const {
  start, move, end,
} = require('./src/logic');

exports.handler = async (event) => {
  let statusCode = 200;
  let response = {};
  let body;

  const { httpMethod, path } = event;
  console.log(`httpMethod: ${httpMethod} path ${path}`);
  if (event.body) {
    body = JSON.parse(event.body);
    // console.log({ body });
  }

  switch (httpMethod) {
    case 'GET':
      if (path === '/snakenberger') {
        response = info();
      } else {
        response = 'Invalid GET';
        statusCode = 502;
      }
      break;
    case 'POST':
      if (path === '/snakenberger/start') {
        response = start(body);
      } else if (path === '/snakenberger/end') {
        response = end(body);
      } else if (path === '/snakenberger/move') {
        response = move(body);
      } else {
        response = 'Invalid POST';
        statusCode = 502;
      }
      break;
    default:
      response = 'Invalid Request';
      statusCode = 502;
  }

  return {
    statusCode,
    body: JSON.stringify(response),
  };
};
