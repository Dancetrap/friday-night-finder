import characters from '../characters.json' assert {type: 'json'};
// import characters from '../characters.json';
// import json with open('../characters.json') as data_file:

// with open('..characters.json', 'r') as fcc_file:

const nameField = document.getElementById('characterField');
const content = document.getElementById('content');
const image = document.getElementById('image');
const infobox = document.getElementById('infobox');

let ar = [];
let clickables = [];

let selectedChar = null;

// Names that will associate with the base game, boyfriend, bf, girlfriend, gf, dad, daddy dearest, spooky, spooky kids, skid and pump, pico, mom, mommy mearest, monster, lemon demon, senpai, spirit, tankman

// An updated_version will have another search bar titled "Mods". This will allow the user to search up the mod they're looking for a certain character
// For the final version, I might just have to stick with the main game since with the mods, things gets kinda complicated.
// var url = 'https://fridaynightfunkin.fandom.com/wiki/'
// Helpful Node: https://github.com/dijs/wiki, InfoBox parser: https://github.com/dijs/infobox-parser, MediaLink API for Funkipedia: https://fridaynightfunking.fandom.com/api.php, MediaLink API for Friday Night Funkipedia: https://fridaynightfunkin.fandom.com/api.php 

let empty = "";

const handleResponse = async (response) => {
};


infobox.style.display = "none";

const init = () =>{


    const val = Object.values(characters).sort(function(a, b) {
        return compareStrings(a.name, b.name);
    });

    // console.log(val);

    if(nameField.value == "")
    {
        clickables = [];
        empty = "";
        val.sort().forEach(char => {
            let altName = '';
            if(char.alt != null) altName = char.alt;
            else altName = char.name;
            let section = `<div id="${char.name}" style="margin: 5px;">
            <button id="${char.name}Button" class="character" origin="${char.origin}" mod="${char.mod}" icon="${char.icon}" style="background: rgba(0,0,0,0); border: none; cursor: pointer;">
            <img src="${char.imageURL}" alt="${char.name}" height="150px" style="object-fit: contain;" id="${char.name}Img"></img>
            </button>
            <p style="margin: 1px;">${altName}</p>
            </div>`;
            empty += section;
            clickables.push(section);
        });
    }
    else
    {
        clickables = [];
        empty = "";
        let names = [];
        const search = nameField.value.split("");
        val.sort().forEach(char => {
            let exist = true;
            const letters = char.name.split("");
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

            if(exist){
                names.push(char);
            } 
        });
        if(names.length != 0)
        {
            names.forEach(char =>{
                let altName = '';
                if(char.alt != null) altName = char.alt;
                else altName = char.name;
                let section = `<div id="${char.name}" style="margin: 5px;">
                <button id="${char.name}Button" class="character" origin="${char.origin}" mod="${char.mod}" icon="${char.icon}" style="background: rgba(0,0,0,0); border: none; cursor: pointer;">
                <img src="${char.imageURL}" alt="${char.name}" height="150px" style="object-fit: contain;" id="${char.name}Img"></img>
                </button>
                <p style="margin: 1px;">${altName}</p>
                </div>`;
                empty += section;
                clickables.push(section);
            });
        }
    }
    content.innerHTML = empty;

    // console.log(document.querySelector(`#agoti`));
    // val.forEach(char => {
    //     console.log(document.querySelector(`#${char.name}Button`));
    //     // console.log(document.querySelector('#'+char.name+'Button'));
    //     // console.log(document.querySelector('#ourple guyButton'));
    //     // console.log(char.name);
    // });
    // clickables.forEach(char=>{
    //     console.log(char);
    // })

    if(clickables.length == 0)
    {
        // call on handleFunction that none has been found
    }

    let clicks = document.querySelectorAll(".character");
    // console.log(clicks);

    clicks.forEach(click=>{
        // console.log(click);
        const clickMe = () => charSelect(click);
        click.addEventListener('click',clickMe)
    });
};

window.onload = init;
nameField.onchange = init;

function compareStrings(a, b) {
    // Assuming you want case-insensitive comparison
    a = a.toLowerCase();
    b = b.toLowerCase();
  
    return (a < b) ? -1 : (a > b) ? 1 : 0;
};

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

// So much of this will be changed so it could work in the server
const charSelect = (char) => {

    if(char != selectedChar){
        selectedChar = char;
        infobox.style.display = "flex";
    }
    else
    {
        selectedChar = null;
        infobox.style.display = "none";
    }
    // console.log(char);
    let character = char.id.split('Button')[0];

    if(character.includes('-'))
    {
        let split = character.split('-');
        let blank = ''
        split.forEach(vari =>{
            // blank
            if(split.indexOf(vari) == split.length-1)
            {
                blank += capitalizeFirstLetter(vari);
            }
            else
            {
                blank += capitalizeFirstLetter(vari) + " ";
            }
        });
        document.getElementById('name').innerHTML = blank;
    }
    else
    {
        document.getElementById('name').innerHTML = capitalizeFirstLetter(character);
    }

    document.getElementById('baseImg').src = document.getElementById(`${character}Img`).src;
};