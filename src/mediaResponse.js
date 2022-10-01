const fs = require('fs');

const favorite = fs.readFileSync(`${__dirname}/../client/favorite.png`);
const unfavorite = fs.readFileSync(`${__dirname}/../client/unfavorite.png`);

const getChecked = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'image/png' });
  response.write(favorite);
  response.end();
};

const getUnchecked = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'image/png' });
  response.write(unfavorite);
  response.end();
};

module.exports = {
  getChecked,
  getUnchecked,
};
