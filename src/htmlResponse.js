const fs = require('fs'); // pull in the file system module

// load files into memory
// This is a synchronous operation, so you'd only
// want to do it on startup.
// This not the best way to load files unless you have few files.
const index = fs.readFileSync(`${__dirname}/../client/client.html`);
const login = fs.readFileSync(`${__dirname}/../client/login.html`);
const profile = fs.readFileSync(`${__dirname}/../client/profile.html`);
const finalIndex = fs.readFileSync(`${__dirname}/../client/clientFinal.html`);
const finalLogin = fs.readFileSync(`${__dirname}/../client/loginFinal.html`);
const finalProfile = fs.readFileSync(`${__dirname}/../client/profileFinal.html`);
const css = fs.readFileSync(`${__dirname}/../client/style.css`);
const js = fs.readFileSync(`${__dirname}/../client/wikiHandler.js`);
const jstwo = fs.readFileSync(`${__dirname}/../client/handler.js`);
const jsthree = fs.readFileSync(`${__dirname}/../client/login.js`);
const jsfour = fs.readFileSync(`${__dirname}/../client/profile.js`);
const jsfive = fs.readFileSync(`${__dirname}/../client/loginFinal.js`);
const jssix = fs.readFileSync(`${__dirname}/../client/profileFinal.js`);
const json = fs.readFileSync(`${__dirname}/../characters.json`);

// function to get the index page
const getIndex = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(index);
  response.end();
};

// function to get login page
const getLogin = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(login);
  response.end();
};

const getProfile = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(profile);
  response.end();
};

const getFinalIndex = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(finalIndex);
  response.end();
};

// function to get login page
const getFinalLogin = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(finalLogin);
  response.end();
};

const getFinalProfile = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(finalProfile);
  response.end();
};

// function to get css page
const getCSS = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/css' });
  response.write(css);
  response.end();
};

// old function that won't be used. should probably get rid of
const getJava = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/javascript' });
  response.write(js);
  response.end();
};

// gets handler function for client.html
const getJavaHandler = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/javascript' });
  response.write(jstwo);
  response.end();
};

// gets login function for login.html
const getJavaLogin = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/javascript' });
  response.write(jsthree);
  response.end();
};

// gets profile function for profile
const getJavaProfile = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/javascript' });
  response.write(jsfour);
  response.end();
};

// gets login function for login.html
const getFinalJavaLogin = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/javascript' });
  response.write(jsfive);
  response.end();
};

// gets profile function for profile
const getFinalJavaProfile = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/javascript' });
  response.write(jssix);
  response.end();
};

// get JSON file
const getJSONPrototype = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'application/json' });
  response.write(json);
  response.end();
};

// set out public exports
module.exports = {
  getIndex,
  getLogin,
  getProfile,
  getFinalIndex,
  getFinalLogin,
  getFinalProfile,
  getCSS,
  getJava,
  getJavaHandler,
  getJavaLogin,
  getJavaProfile,
  getFinalJavaLogin,
  getFinalJavaProfile,
  getJSONPrototype,
};
