/* This demo is a follow up to basic-http-class-example. It
is recommended that you be familiar with that demo before
utilizing this one */

// Import the http library, as well as our responses.js file.
const http = require('http');
const htmlHandler = require('./htmlResponse.js');

// Either use a port given to us by heroku, or port 3000
const port = process.env.PORT || process.env.NODE_PORT || 3000;

// This function is called per request. The request and response
// objects are generated for us by the http library.
const onRequest = (request, response) => {
  console.log(request.url);

  /* In the previous demo, regardless of what url the user went
  to, we sent them the client.html page. Below, we make use of
  an if/else tree to route requests to various functions which
  send back different resources.
  There are certainly better ways to route requests which we will
  get to in future demos, but this gives us the basics of routing
  requests to different resources.
  You'll also note a few key things below. The first is that we
  are sending requests to /otherPage to client2.html. Because the
  server is deciding what url goes to what resource, we can actually
  use whatever names we want. Even though we are sending back
  client2.html, we can send requests to /otherPage to that resource
  instead. This allows us to mask actual resource names, as well as
  easily replace resources without breaking existing urls.
  The other key thing to notice is that we have an "else" statement
  that sends us to our main "client1" page. This is useful because
  now, regardless of what url the user goes to, their request will
  be handled. It might not be handled the way they wanted, but it
  will not sit there pending a response forever. Oftentimes instead
  of the index page, we would send them to a 404 page here.
  */
  if (request.url === '/style.css') {
    htmlHandler.getCSS(request, response);
  } else if (request.url === '/finder.js') {
    htmlHandler.getJava(request, response);
  } else if (request.url === '/characters.json') {
    htmlHandler.getJSONPrototype(request, response);
  } else {
    htmlHandler.getIndex(request, response);
  }
};

// With the above onRequest and port, we can make a server.
http.createServer(onRequest).listen(port, () => {
  console.log(`Listening on port: ${port}`);
});