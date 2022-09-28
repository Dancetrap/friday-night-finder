/* This demo is a follow up to basic-http-class-example. It
is recommended that you be familiar with that demo before
utilizing this one */

// Import the http library, as well as our responses.js file.
const http = require('http'); // http module
const url = require('url'); // url module
const query = require('querystring'); // query module
const htmlHandler = require('./htmlResponse.js');
const jsonHandler = require('./jsonResponse.js');

// Either use a port given to us by heroku, or port 3000
const port = process.env.PORT || process.env.NODE_PORT || 3000;

const parseBody = (request, response, handler) => {
  // The request will come in in pieces. We will store those pieces in this
  // body array.
  const body = [];

  request.on('error', (err) => {
    console.dir(err);
    response.statusCode = 400;
    response.end();
  });

  request.on('data', (chunk) => {
    body.push(chunk);
  });

  request.on('end', () => {
    const bodyString = Buffer.concat(body).toString();
    const bodyParams = query.parse(bodyString);

    handler(request, response, bodyParams);
  });
};

const handlePost = (request, response, parsedUrl) => {
  // If they decide to favorite the character
  if (parsedUrl.pathname === '/addUser') {
    parseBody(request, response, jsonHandler.addUser);
  }
};

const handleGet = (request, response, parsedUrl) => {
  const params = query.parse(parsedUrl.query);
  // route to correct method based on url
  if (parsedUrl.pathname === '/style.css') {
    htmlHandler.getCSS(request, response);
  } else if (parsedUrl.pathname === '/finder.js') {
    htmlHandler.getJava(request, response);
  } else if (parsedUrl.pathname === '/handler.js') {
    htmlHandler.getJavaHandler(request, response);
  } else if (parsedUrl.pathname === '/characters.json') {
    htmlHandler.getJSONPrototype(request, response);
  } else if (parsedUrl.pathname === '/getUser') {
    jsonHandler.getCharacters(request, response, params)
  } else if (parsedUrl.pathname === '/getCharacters') {
    jsonHandler.getUser(request, response, params)
  } else if (parsedUrl.pathname === '/login.html'){
    htmlHandler.getLogin(request, response);
  } else {
    htmlHandler.getIndex(request, response);
  }
};

// This function is called per request. The request and response
// objects are generated for us by the http library.
const onRequest = (request, response) => {
  console.log(request.url);

  // if (request.url === '/style.css') {
  //   htmlHandler.getCSS(request, response);
  // } else if (request.url === '/finder.js') {
  //   htmlHandler.getJava(request, response);
  // } else if (request.url === '/characters.json') {
  //   htmlHandler.getJSONPrototype(request, response);
  // } else {
  //   htmlHandler.getIndex(request, response);
  // }
  const parsedUrl = url.parse(request.url);
  if (request.method === 'post') {
    console.log(request);
    handlePost(request, response, parsedUrl);
  }
  else
  {
    handleGet(request, response, parsedUrl);
  }
  
};

// With the above onRequest and port, we can make a server.
http.createServer(onRequest).listen(port, () => {
  console.log(`Listening on port: ${port}`);
});