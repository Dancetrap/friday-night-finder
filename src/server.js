/* This demo is a follow up to basic-http-class-example. It
is recommended that you be familiar with that demo before
utilizing this one */

// Import the http library, as well as our responses.js file.
const http = require('http'); // http module
const url = require('url'); // url module
const query = require('querystring'); // query module
const htmlHandler = require('./htmlResponse.js');
const jsonHandler = require('./jsonResponse.js');
const mediaHandler = require('./mediaResponse.js');

// Either use a port given to us by heroku, or port 3000
const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {
  GET: {
    '/': htmlHandler.getIndex,
    '/client.html': htmlHandler.getIndex,
    '/login.html': htmlHandler.getLogin,
    '/profile.html': htmlHandler.getProfile,
    '/style.css': htmlHandler.getCSS,
    '/handler.js': htmlHandler.getJavaHandler,
    '/login.js': htmlHandler.getJavaLogin,
    '/profile.js': htmlHandler.getJavaProfile,
    '/getUser': jsonHandler.getUser,
    '/getUsers': jsonHandler.getUsers,
    '/getCharacters': jsonHandler.getCharacters,
    '/getCharacter': jsonHandler.getCharacter,
    '/getFavorite': jsonHandler.getFavorite,
    '/getFavorites': jsonHandler.getFavorites,
    '/getCharacterList': jsonHandler.getCharacterList,
    '/characters.json': htmlHandler.getJSONPrototype,
    '/favorite.png': mediaHandler.getChecked,
    '/unfavorite.png': mediaHandler.getUnchecked,
    notFound: jsonHandler.notFound,
  },
  HEAD: {
    // '/getUsers': jsonHandler.getUsersMeta,
    notFound: jsonHandler.notFoundMeta,
  },
};

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

  // If they decide to sign up
  if (parsedUrl.pathname === '/addUser') {
    parseBody(request, response, jsonHandler.addUser);
  } else if (parsedUrl.pathname === '/addFavorite') {
    parseBody(request, response, jsonHandler.addFavorite);
  } else if (parsedUrl.pathname === '/removeFavorite') {
    parseBody(request, response, jsonHandler.removeFavorite);
  }
};

const handleGet = (request, response, parsedUrl) => {
  const params = query.parse(parsedUrl.query);

  // Do urlStruct function in this server

  // console.log(urlStruct[request.method][parsedUrl.pathname].response);
  if (urlStruct[request.method][parsedUrl.pathname]) {
    return urlStruct[request.method][parsedUrl.pathname](request, response, params);
  }

  return urlStruct[request.method].notFound(request, response, params);
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
  if (request.method === 'POST') {
    handlePost(request, response, parsedUrl);
  } else {
    handleGet(request, response, parsedUrl);
  }
};

// With the above onRequest and port, we can make a server.
http.createServer(onRequest).listen(port, () => {
  console.log(`Getting freaky on Port ${port}`);
});
