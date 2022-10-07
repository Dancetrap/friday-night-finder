const fs = require('fs');

// import wiki from 'wikijs';
const wiki = require('wikijs').default;
// const page = require('./page');

// Success! Loaded characters have been found
// Created! You've successfully favorited a character
// No Content! The favorites page has no content
// Bad Request! TBD
// Not Found! The user does not exist

// dijs.github.io/wiki/
// github.com/dijs/wiki

const json = fs.readFileSync(`${__dirname}/../characters.json`);

const characters = JSON.parse(json);
let search = [];
const users = {};
// I would like to set this list without having to have it pass through a function
let list = [];
const api = 'https://fridaynightfunkin.fandom.com/api/php';

// const setList = async () => {
//   list = await wiki({ apiUrl: api }).pagesInCategory('Category:Characters');
// };

// window.onload = setList;

// console.log(list);

// console.log(getCharacterList(request, response));
// Object with all character data

// getCharacter

// addCharacter

// addFavorite

const respondJSON = (request, response, status, object) => {
  // object for our headers
  // Content-Type for json
  const headers = {
    'Content-Type': 'application/json',
  };

  // send response with json object
  response.writeHead(status, headers);
  response.write(JSON.stringify(object));
  response.end();
};

const respondJSONMeta = (request, response, status) => {
  // object for our headers
  // Content-Type for json
  const headers = {
    'Content-Type': 'application/json',
  };

  // send response without json object, just headers
  response.writeHead(status, headers);
  response.end();
};

const getCharacterList = async (request, response) => {
  // const blank = [];
  list = await wiki({ apiUrl: api }).pagesInCategory('Category:Characters');

  // list.forEach(async (char) => {
  //   const charName = await wiki({ apiUrl: api }).page(char).then((i) => i.info('name'));
  //   const debut = await wiki({ apiUrl: api }).page(char).then((i) => i.info('debut'));
  //   const appear = await wiki({ apiUrl: api }).page(char).then((i) => i.info('appearsin'));
  //   const header = await wiki({ apiUrl: api }).page(char).then((i) => i.info('headercolor'));
  //   const idle = await wiki({ apiUrl: api }).page(char).then((i) => i.mainImage());

  //   const newJSON = {
  //     name: charName,
  //     origin: debut,
  //     mod: appear,
  //     color: header,
  //     image: idle,
  //     // icon: icons,
  //   };
  //   blank.push(newJSON);
  //   if (charName === undefined) {
  //     const index = blank.indexOf(newJSON[char]);
  //     blank.splice(index, 1);
  //   }
  //   if (list.indexOf(char) === list.length - 1) {
  //     return respondJSON(request, response, 200, blank);
  //   }
  //   return respondJSON(request, response, 200, blank);
  // });
  console.log(list);
  const responseJSON = {
    list,
  };
  return respondJSON(request, response, 200, responseJSON);
};

// So this is a function rather than a const so that there won't be a return variable
async function wikiCharacters() {
  list = await wiki({ apiUrl: api }).pagesInCategory('Category:Characters');
}
// For all characters, get and return their main image and name

const findCharacter = async (request, response, params) => {
  search = [];
  await wikiCharacters();
  // console.log(list[0]);
  const responseJSON = {
    message: 'Missing Search Term',
    id: 'missingParams',
  };

  if (!params.search) {
    return respondJSON(request, response, 204, responseJSON);
  }

  const split = params.search.split('');
  const promises = list.map((k) => {
    let exist = true;
    const lower = k.toLowerCase();
    const name = lower.split('');
    for (let i = 0; i < params.search.length; i++) {
      if (exist) {
        if (name[i] !== split[i]) {
          exist = false;
          break;
        }
      }
    }

    if (exist) {
      return wiki({ apiUrl: api }).page(k).then((char) => char.info('name')).then((charName) => {
        if (charName !== undefined && !search.includes(charName)) {
          // const real = wiki({ apiUrl: api }).page(k).then((char) => char.info());
          // const debut = wiki({ apiUrl: api }).page(k).then((char) => char.info('debut'));
          // const appear = wiki({ apiUrl: api }).page(k).then((char) => char.info('appearsin'));
          // const header = wiki({ apiUrl: api }).page(k).then((char) => char.info('headercolor'));
          // const font = wiki({ apiUrl: api}).page(k).then((char) => char.info('headerfontcolor'));
          // const idle = wiki({ apiUrl: api }).page(k).then((char) => char.mainImage());
          return wiki({ apiUrl: api }).page(k).then((char) => char.info('debut')).then((debut) => wiki({ apiUrl: api }).page(k).then((char) => char.info('appearsin')).then((appear) => wiki({ apiUrl: api }).page(k).then((char) => char.info('headercolor')).then((header) => wiki({ apiUrl: api }).page(k).then((char) => char.info('headerfontcolor')).then((font) => wiki({ apiUrl: api }).page(k).then((char) => char.mainImage()).then((idle) => {
            const splitIdle = idle.split('/revision/');

            const obj = {
              page: k,
              name: charName,
              origin: debut,
              mod: appear,
              color: header,
              fontColor: font,
              image: splitIdle[0],
            };
            search.push(obj);
            // Yeah I had to go Inspection here
          })))));

          // const splitIdle = idle.split('/revision/');

          // const obj = {
          //   page: k,
          //   name: charName,
          //   origin: debut,
          //   mod: appear,
          //   color: header,
          //   fontColor: font,
          //   image: idle,
          //   // icon: icons,
          // };
          // search.push(obj);
          // search.push(k);
        }
        return undefined;
      });
    }
    return undefined;
  });

  return Promise.all(promises).then(() => {
    const newJSON = {
      ...search,
    };

    if (JSON.stringify(newJSON) !== '{}') {
    // console.log(newJSON.name);

      return respondJSON(request, response, 200, newJSON);
    }

    // gets unexpected end of JSON input message
    if (params.search === '') {
      return respondJSONMeta(request, response, 204);
    }

    return respondJSON(request, response, 404, {
      message: 'Character Not Found',
      id: 'Not Found',
    });
  // return respondJSON(request, response, 200, { message: 'Success!' });
  });
};

const searchCharacter = async (request, response, params) => {
  // await getCharacterList(request, response);
  await wikiCharacters();
  // console.log(list);

  const responseJSON = {
    message: 'Missing Search Term',
    id: 'missingParams',
  };

  if (!params.search) {
    return respondJSON(request, response, 400, responseJSON);
  }

  wiki({ apiUrl: api }).page(params.search).catch((err) => {
    if (err.message === 'No article found') {
      responseJSON.message = 'Character Does Not Exist';
      responseJSON.id = 'missingArticle';
      return respondJSON(request, response, 404, responseJSON);
    }
    return respondJSON(request, response, 400, responseJSON);
  });

  const charName = await wiki({ apiUrl: api }).page(params.search).then((char) => char.info('name'));
  const debut = await wiki({ apiUrl: api }).page(params.search).then((char) => char.info('debut'));
  const appear = await wiki({ apiUrl: api }).page(params.search).then((char) => char.info('appearsin'));
  const header = await wiki({ apiUrl: api }).page(params.search).then((char) => char.info('headercolor'));
  const idle = await wiki({ apiUrl: api }).page(params.search).then((char) => char.mainImage());

  // all the images have this thing in their URL that says /revision/... and that really messes
  // with displaying the image. So I decided to get rid of it.
  const splitIdle = idle.split('/revision/');

  if (charName === undefined) {
    responseJSON.message = 'Character Does Not Exist';
    responseJSON.id = 'missingArticle';
    return respondJSON(request, response, 404, responseJSON);
  }

  const newJSON = {
    page: params.search,
    name: charName,
    origin: debut,
    mod: appear,
    color: header,
    image: splitIdle[0],
    // icon: icons,
  };

  // console.log(newJSON);

  return respondJSON(request, response, 200, newJSON);
};

// debugPurposes
const getUsers = (request, response) => {
  const responseJSON = {
    users,
  };

  respondJSON(request, response, 200, responseJSON);
};

const getUser = (request, response, params) => {
  const responseJSON = {
    message: 'Username and Password are required',
    id: 'missingParams',
  };
  if (!params.username || !params.password) {
    responseJSON.id = 'missingParams';
    return respondJSON(request, response, 400, responseJSON);
  }

  let responseCode = 204;

  if (users[params.username]) {
    if (params.password === users[params.username].password) {
      responseCode = 200;
    } else {
      // responseJSON.message = 'Incorrect Username or Password',
      // responseJSON.id = 'wrongPassword';
      return respondJSON(request, response, 400, {
        message: 'Incorrect Username or Password',
        id: 'wrongPassword',
      });
    }

    if (responseCode === 200) {
      responseJSON.message = 'Load Successfully';
      return respondJSON(request, response, responseCode, responseJSON);
    }
  } else {
    // responseJSON.message = 'Incorrect Username or Password',
    // responseJSON.id = 'wrongUsername',
    return respondJSON(request, response, 400, {
      message: 'Incorrect Username or Password',
      id: 'wrongUsername',
    });
  }

  return respondJSONMeta(request, response, responseCode);

  // set given username to request
};

const addUser = (request, response, params) => {
  const responseJSON = {
    message: 'Username and Password are required',
  };
  if (!params.username || !params.password) {
    responseJSON.id = 'missingParams';
    return respondJSON(request, response, 400, responseJSON);
  }

  let responseCode = 204;

  if (!users[params.username]) {
    responseCode = 201;
    users[params.username] = {};
  }

  users[params.username].username = params.username;
  users[params.username].password = params.password;
  users[params.username].favorites = [];

  // if response is created, then set our created message
  // and sent response with a message
  if (responseCode === 201) {
    responseJSON.message = 'Created Successfully';
    return respondJSON(request, response, responseCode, responseJSON);
  }

  return respondJSONMeta(request, response, responseCode);

  // add and set given username
};

const getCharacters = (request, response, params) => {
  search = [];

  if (!params.name || params.name === '') {
    return respondJSONMeta(request, response, 204);
    // return respondJSON(request, response, 200, params);
  }

  // console.log(params.name);
  // obj needs to be replaced by an array of items
  // const characterArray = JSON.parse(characters);
  const split = params.name.split('');

  // Had to change to foreach because eslint wouldn't allow it
  Object.keys(characters).forEach((k) => {
    // console.log(k);
    let exist = true;
    const name = k.split('');
    for (let i = 0; i < params.name.length; i++) {
      if (exist) {
        if (name[i] !== split[i]) {
          exist = false;
          break;
        }
      }
    }
    if (exist) {
      // console.log(characters[k]);
      search.push(characters[k]);
      // items += JSON.stringify(characters[k])
    }
  });
  // console.log(search);
  const newJSON = {
    ...search,
  };

  if (JSON.stringify(newJSON) !== '{}') {
    // console.log(newJSON.name);

    return respondJSON(request, response, 200, newJSON);
  }

  // gets unexpected end of JSON input message
  if (params.name === '') {
    return respondJSONMeta(request, response, 204);
  }

  return respondJSON(request, response, 404, {
    message: 'Character Not Found',
    id: 'Not Found',
  });
};

// This function is for getting the character info
const getCharacter = (request, response, params) => {
  if (!params.name) {
    return respondJSON(request, response, 400, {
      message: 'Missing name parameter',
      id: 'getUserMissingName',
    });
  }

  const obj = characters[params.name];

  if (obj) {
    return respondJSON(request, response, 200, obj);
  }
  return respondJSON(request, response, 404, {
    message: 'No user with that name',
  });
};

// Used for the heart icon
const getFavorite = (request, response, params) => {
  if (!params.newFavorite) {
    return respondJSON(request, response, 400, {
      message: 'Missing name parameter',
      id: 'getUserMissingName',
    });
  }
  // const obj = users[params.name].favorites;
  const obj = users[params.username].favorites.includes(params.newFavorite);

  if (obj) {
    return respondJSON(request, response, 200, obj);
  }
  return respondJSON(request, response, 404, {
    message: 'No user with that name',
  });
};

const addFavorite = (request, response, params) => {
  if (params.username != null && users[params.username]) {
    if (!params.newFavorite && characters[params.newFavorite]) {
      return respondJSON(request, response, 400, {
        message: 'No username or character',
        id: 'getUserMissingName',
      });
    }
  }

  const exist = users[params.username].favorites.includes(params.newFavorite);

  if (exist) {
    return respondJSON(request, response, 204, {
      message: 'Character Does Not Exists',
    });
  }

  // const formData = `username=${nameField.value}&newFavorite=${ageField.value}`;
  // Ask how to prevent a repeat of favoriting a character
  users[params.username].favorites.push(params.newFavorite);
  return respondJSON(request, response, 201, { message: 'Successfully Added!' });
};

const removeFavorite = (request, response, params) => {
  if (params.username != null && users[params.username]) {
    if (!params.newFavorite && characters[params.newFavorite]) {
      return respondJSON(request, response, 400, {
        message: 'No username or character',
        id: 'getUserMissingName',
      });
    }
  }

  const exist = users[params.username].favorites.includes(params.newFavorite);

  if (!exist) {
    return respondJSON(request, response, 204, {
      message: 'Character Does Not Exists',
    });
  }
  const index = users[params.username].favorites.indexOf(params.newFavorite);
  users[params.username].favorites.splice(index, 1);
  return respondJSON(request, response, 200, { message: 'Successfully Removed!' });
};

// Used for profile and checking whether or not the heart is checked our not
const getFavorites = (request, response, params) => {
  // If no username, check for error
  if (!params.username) {
    return respondJSON(request, response, 400, {
      message: 'Missing name parameter',
      id: 'getUserMissingName',
    });
  }

  const favorites = [];
  users[params.username].favorites.forEach((favorite) => {
    favorites.push(characters[favorite]);
  });

  const responseJSON = {
    favorites,
  };

  // send back as json
  if (favorites.length === 0) return respondJSON(request, response, 204, { message: 'No favorites have been added', id: 'emptyParameter' });
  return respondJSON(request, response, 200, responseJSON);
};

// For determining whether or not the heart has been checked

const notFound = (request, response) => {
  const responseJSON = {
    message: 'The page you are looking for was not found',
    id: 'notFound',
  };

  return respondJSON(request, response, 404, responseJSON);
};

module.exports = {
  getCharacters,
  getCharacter,
  getCharacterList,
  findCharacter,
  searchCharacter,
  addUser,
  getUser,
  getUsers,
  addFavorite,
  removeFavorite,
  getFavorites,
  getFavorite,
  notFound,

  externals: {
    'isomorphic-fetch': 'fetch',
  },
};
