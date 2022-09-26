import characters from '../characters.json' assert {type: 'json'};
// import characters from '../characters.json';
// import json with open('../characters.json') as data_file:

// with open('..characters.json', 'r') as fcc_file:

const nameField = document.getElementById('nameField');
const content = document.getElementById('content');

let ar = [];

// Names that will associate with the base game, boyfriend, bf, girlfriend, gf, dad, daddy dearest, spooky, spooky kids, skid and pump, pico, mom, mommy mearest, monster, lemon demon, senpai, spirit, tankman

// An updated_version will have another search bar titled "Mods". This will allow the user to search up the mod they're looking for a certain character
// For the final version, I might just have to stick with the main game since with the mods, things gets kinda complicated.
// var url = 'https://fridaynightfunkin.fandom.com/wiki/'
// Helpful Node: https://github.com/dijs/wiki, InfoBox parser: https://github.com/dijs/infobox-parser, MediaLink API for Funkipedia: https://fridaynightfunking.fandom.com/api.php, MediaLink API for Friday Night Funkipedia: https://fridaynightfunkin.fandom.com/api.php 

let empty = "";
const init = () =>{
    // console.log("yo");
    // const funky = JSON.parse(characters);
    // content.innerHTML = "";
    // console.log(Object.values(characters));

    const val = Object.values(characters).sort(function(a, b) {
        return compareStrings(a.name, b.name);
    });

    console.log(val);

    if(nameField.value == "")
    {
        empty = "";
        Object.keys(characters).sort().forEach(char => {
            empty += char + "  ";
        });
    }
    else
    {
        empty = "";
        let names = [];
        const search = nameField.value.split("");
        // console.log(nameField.value.length);
        Object.keys(characters).sort().forEach(char => {
            let exist = true;
            const letters = char.split("");
            for(let i = 0; i < nameField.value.length; i++)
            {
                if(exist)
                {
                    if(letters[i] != search[i])
                    {
                        exist = false;
                        break;
                    }
                }
            }

            if(exist) names.push(char);
        });

        if(names.length != 0)
        {
            names.forEach(char =>{
                empty += char + " ";
            });
        }
    }
    content.innerHTML = empty;
};

window.onload = init;
nameField.onchange = init;

function compareStrings(a, b) {
    // Assuming you want case-insensitive comparison
    a = a.toLowerCase();
    b = b.toLowerCase();
  
    return (a < b) ? -1 : (a > b) ? 1 : 0;
}