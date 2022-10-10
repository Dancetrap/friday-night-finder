const fs = require('fs');
// const fabric = require('fabric').fabric;

const favorite = fs.readFileSync(`${__dirname}/../client/favorite.png`);
const unfavorite = fs.readFileSync(`${__dirname}/../client/unfavorite.png`);
const txt = fs.readFileSync(`${__dirname}/../client/phantom.ttf`);

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

const getFont = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'font/ttf' });
  response.write(txt);
  response.end();
};

module.exports = {
  getChecked,
  getUnchecked,
  getFont,
};
