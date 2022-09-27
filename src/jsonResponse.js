const fs = require('fs');

// Success! Loaded characters have been found
// Created! You've successfully favorited a character
// No Content! The favorites page has no content, The character you're looking for has not been found
// Bad Request! TBD
// Not Found! The user does not exist

const json = fs.readFileSync(`${__dirname}/../characters.json`);

const characters = JSON.parse(json);
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

const getCharacters = (request, response, params) =>{
    if(!params.name){
        return respondJSON(request, response, 204, {
            message: "Type in search term"
        });
        // return respondJSON(request, response, 200, params);
    }

    const obj = characters[params.name];

    if(obj){
        return respondJSON(request, response, 200, obj);
    }
    else
    {
        return respondJSON(request, response, 404, {
            message: "Character Not Found",
            id: "Not Found",
        });
    }

    // return respondJSON(request, response,)
}

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

module.exports = {
    noContent,
    getCharacters,
};