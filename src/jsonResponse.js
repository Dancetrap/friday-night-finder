const fs = require('fs');

// Success! Loaded characters have been found
// Created! You've successfully favorited a character
// No Content! The favorites page has no content, The character you're looking for has not been found
// Bad Request! TBD
// Not Found! The user does not exist

const json = fs.readFileSync(`${__dirname}/../characters.json`);

const characters = JSON.parse(json);
// const search = {};
let search = [];
const users = {};

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

// debugPurposes
const getUsers = (request, response) => {
    const responseJSON = {
      users,
    };
  
    respondJSON(request, response, 200, responseJSON);
  };

const getUser = (request, response, params) =>{
    const responseJSON = {
        message: 'Username and Password are required',
    };
    if (!params.username || !params.password) {
        responseJSON.id = 'missingParams';
        return respondJSON(request, response, 400, responseJSON);
    }

    let responseCode = 204;
    
    if(users[params.username])
    {
        if(params.password == users[params.username].password)
        {
            responseCode = 200;
        }
        else
        {
            responseJSON.message = 'Incorrect Username or Password',
            responseJSON.id = 'wrongPassword';
            return respondJSON(request, response, 400, responseJSON);
        }

        if (responseCode === 200) {
            responseJSON.message = 'Load Successfully';
            return respondJSON(request, response, responseCode, responseJSON);
        }
    }
    else
    {
        responseJSON.message = 'Incorrect Username or Password',
        responseJSON.id = 'wrongUsername';
        return respondJSON(request, response, 400, responseJSON);
    }

    return respondJSONMeta(request, response, responseCode);

    // set given username to request
};

const addUser = (request, response, params) =>{
    const responseJSON = {
        message: 'Username and Password are required',
    };
    if (!params.username || !params.password) {
        responseJSON.id = 'missingParams';
        return respondJSON(request, response, 400, responseJSON);
    }

    let responseCode = 204;

    if(!users[params.username]) {
        responseCode = 201;
        users[params.username] = {};
    }

    users[params.username].username = params.username;
    users[params.username].password = params.password;
    users[params.username].favorites = [];
  
    //if response is created, then set our created message
    //and sent response with a message
    if (responseCode === 201) {
      responseJSON.message = 'Created Successfully';
      return respondJSON(request, response, responseCode, responseJSON);
    }

    return respondJSONMeta(request, response, responseCode);

    // add and set given username
};

// This function is for the search bar. It returns all the characters that start with a specific letter(s) of the alphabet
const getCharacters = (request, response, params) =>{
    search = [];
    
    if(!params.name || params.name == ''){
        return respondJSONMeta(request, response, 204);
        // return respondJSON(request, response, 200, params);
    }

    // console.log(params.name);
    // obj needs to be replaced by an array of items
    // const characterArray = JSON.parse(characters);
    let items = '';
    let split = params.name.split("");

    for(const k in characters)
    {
        // console.log(k);
        let exist = true;
        let name = k.split("");
        for(let i = 0; i < params.name.length; i++)
        {
            if(exist)
            {
                if(name[i] != split[i])
                {
                    exist = false;
                    break;
                }
            }
        }
        if(exist){
            // console.log(characters[k]);
            search.push(characters[k]);
            // items += JSON.stringify(characters[k])
        }

    }
        // console.log(search);
        const newJSON = {
            ...search,
        }

    // console.log(newJSON);
    const obj = characters[params.name];
    console.log(params.name);


    if(JSON.stringify(newJSON) != '{}'){
        // console.log(newJSON.name);
        for(const k in newJSON)
        {
            // console.log(newJSON[k].name);
        }
        return respondJSON(request, response, 200, newJSON);
    }
    else
    {
        // gets unexpected end of JSON input message
        if(params.name == '')
        {
            return respondJSONMeta(request, response, 204)
        }
        else
        {
            return respondJSON(request, response, 404, {
                message: "Character Not Found",
                id: "Not Found",
            });
        }
    }
    
    
}

// This function is for getting the character info
const getCharacter = (request, response, params) =>{
    if(!params.name) {
        return respondJSON(request, response, 400, {
          message: 'Missing name parameter',
          id: 'getUserMissingName'
        });
      }
    
      const obj = characters[params.name];
    
      if(obj) {
        return respondJSON(request, response, 200, obj)
      } else {
        return respondJSON(request, response, 404, {
          message: 'No user with that name',
        });
      }    
}

const getFavorite = (request, response, params) =>{
    if(!params.newFavorite)
    {
        return respondJSON(request, response, 400, {
            message: 'Missing name parameter',
            id: 'getUserMissingName'
          });
    }
    // const obj = users[params.name].favorites;
    const obj = users[params.username].favorites.includes(params.newFavorite);
    
    if(obj) {
      return respondJSON(request, response, 200, obj)
    } else {
      return respondJSON(request, response, 404, {
        message: 'No user with that name',
      });
    }    
}

const addFavorite = (request, response, params) =>{
    if(params.username != null && users[params.username] && !params.newFavorite && characters[params.newFavorite])
    {
        return respondJSON(request, response, 400, {
            message: 'No username or character',
            id: 'getUserMissingName'
          });
    }

    const exist = users[params.username].favorites.includes(params.newFavorite);

    if(exist)
    {
        return respondJSON(request, response, 204, {
            message: 'Character Does Not Exists',
          });
    }

    // const formData = `username=${nameField.value}&newFavorite=${ageField.value}`;
    // Ask how to prevent a repeat of favoriting a character
    users[params.username].favorites.push(params.newFavorite);
    return respondJSON(request, response, 201, {message: "Successfully Added!"})
}

// addFavorite()

const removeFavorite = (request, response, params) =>{
    if(params.username != null && users[params.username] && !params.newFavorite && characters[params.newFavorite])
    {
        return respondJSON(request, response, 400, {
            message: 'No username or character',
            id: 'getUserMissingName'
          });
    }

    const exist = users[params.username].favorites.includes(params.newFavorite);

    if(exist)
    {
        return respondJSON(request, response, 204, {
            message: 'Character Does Not Exists',
          });
    }

    users[params.username].favorites.remove(params.newFavorite);
    return respondJSON(request, response, 200, {message: "Successfully Removed!"})
}

// Used for profile and checking whether or not the heart is checked our not
const getFavorites = (request, response, params) => {
    // If no username, check for error

    let favorites = [];
    users[params.username].favorites.forEach(favorite =>{
        favorites.push(characters[favorite]);
    });

    // send back as json
}

// For determining whether or not the heart has been checked

const noContent = (request, response, input) => {
    const responseJSON = {
        message: '',
      };
    
    if(input == 'characters' || input == 'mods')
    {
        responseJSON.message = 'There are no characters that match your search'
    }
    else if(input == 'favs')
    {
        responseJSON.message = 'You have no favorite characters'
    }

    return respondJSON(request, response, 204, responseJSON);
}

const notFound = (request, response) => {
    const responseJSON = {
        message: 'The page you are looking for was not found',
        id: 'notFound',
      };

      return respondJSON(request, response, 404, responseJSON);
}

module.exports = {
    noContent,
    getCharacters,
    getCharacter,
    addUser,
    getUser,
    getUsers,
    addFavorite,
    removeFavorite,
    getFavorites,
    getFavorite,
    notFound,
};