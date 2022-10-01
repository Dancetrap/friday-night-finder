let selectedChar = null;
const box = document.getElementById('infobox');

let yourUsername = null;
let yourPassword = null;

if(sessionStorage.getItem("username") != null)
{
  yourUsername = sessionStorage.getItem("username");
}

// if(sessionStorage.getItem("password") != null)
// {
//   yourPassword = sessionStorage.getItem("password");
// }

// If user list is empty, then send username and password as null

// const formData = `username=${yourUsername}&password=${yourPassword}`;

const handleResponse = async (response) => {
      
      //Grab the content section
      const content = document.querySelector('#content');

      //Parse the response to json. This works because we know the server always
      //sends back json. Await because .json() is an async function.
      let obj = await response.json();
      
      //If we have a message, display it.
      if(obj.message){
        content.innerHTML += `<p>${obj.message}</p>`;
      }
    };

    //Uses fetch to send a postRequest. Marksed as async because we use await
    //within it.
    const sendPost = async (nameForm) => {
      //Grab all the info from the form
      const nameAction = nameForm.getAttribute('action');
      const nameMethod = nameForm.getAttribute('method');
      
      const nameField = nameForm.querySelector('#nameField');
      const ageField = nameForm.querySelector('#ageField');

      //Build a data string in the FORM-URLENCODED format.
      const formData = `name=${nameField.value}&age=${ageField.value}`;

      //Make a fetch request and await a response. Set the method to
      //the one provided by the form (POST). Set the headers. Content-Type
      //is the type of data we are sending. Accept is the data we would like
      //in response. Then add our FORM-URLENCODED string as the body of the request.
      let response = await fetch(nameAction, {
        method: nameMethod,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json',
        },
        body: formData,
      });

      //Once we have a response, handle it.
      handleResponse(response);
    };

    //Init function is called when window.onload runs (set below).
    const init = () => {
      const sIn = document.querySelector("#signIn");
      const welcome = document.querySelector("#profile");
      const sOut = document.querySelector("#signOut");

      if(yourUsername != null)
      {
        sIn.style.display = "none";
        welcome.style.display = "flex";
        document.querySelector("#welcome").innerHTML = `Welcome: ${yourUsername}`;
      }
      else
      {
        sIn.style.display = "flex";
        welcome.style.display = "none";
      }
      
      sOut.addEventListener('submit',function(){
        sessionStorage.removeItem("username")
        sessionStorage.removeItem("password")
      });
      //Grab the form

      const searchBox = document.querySelector('#characterField');

      searchBox.addEventListener('input', async () => {
      // if searchBox.value includes a space, it will automatically put in a '%20' in between
        const response = await fetch(`/getCharacters?name=${searchBox.value}`);
        // This is where the Unexpected end of JSON input error happens
        // console.log(response);
        const box = document.getElementById('infobox');
        // console.log(box.style);

        if(response.status == 204)
        {
          if(box.style.display == "none") content.innerHTML = `<h4>Use the search box to look up a character</h4>`;
          else content.innerHTML = ``;
          // content.innerHTML = `<h4>Use the search box to look up a character</h4>`;
          return
        }
          const obj = await response.json();
          // console.log(obj);
          // This is so I can get the info from the parsed JSON
          
          if(response.status == 200)
          {
            globalJSON = obj;
  
            const val = Object.values(obj).sort(function(a, b) {
              return compareStrings(a.name, b.name);
            });
    
            content.innerHTML = '';
            // Object.values(obj).forEach(char => {
            val.forEach(char => {
              // console.log(char);
                let altName = '';
                altName = char.name.replace(/ /g, "%20");
                const getCharacter = () => {
                  // console.log(altName);
                  characterInfo(altName);
                };
                
                const characterDiv = document.createElement('div');
                const characterButton = document.createElement('button');

                characterButton.innerHTML = `<img src="${char.imageURL}" alt="${char.name}" height="150px" style="object-fit: contain;" id="${char.name}Img"></img><p style="margin: 1px;">${char.name}</p>`;
                // characterButton.onclick = function(){characterInfo(altName);};
                
                characterButton.style = "background: rgba(0,0,0,0); border: none; cursor: pointer;";
                characterDiv.appendChild(characterButton);
                content.appendChild(characterDiv);
                characterButton.addEventListener('click', getCharacter);
            });
          }
          else if(response.status == 404)
          {
              content.innerHTML = `<h4>Error: ${obj.message}</h4>`;
          }
      });
        let add = () => favorite(document.getElementById('/addFavorite'),document.getElementById('/removeFavorite'))
        let remove = () => favorite(document.getElementById('/removeFavorite'),document.getElementById('/addFavorite'))
        document.getElementById('/addFavorite').addEventListener('click',add);
        document.getElementById('/removeFavorite').addEventListener('click',remove);

        if(yourUsername == null) document.getElementById('buttons').style.display = "none";
        else document.getElementById('buttons').style.display = "block";
    };

    //When the window loads, run init.
    window.onload = init;

  function compareStrings(a, b) {
    // Assuming you want case-insensitive comparison
    a = a.toLowerCase();
    b = b.toLowerCase();
  
    return (a < b) ? -1 : (a > b) ? 1 : 0;
  };

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const characterInfo = async (character) => {
    const response = await fetch(`/getCharacter?name=${character}`);
    const infobox = await response.json();
    console.log(infobox);

    const box = document.getElementById('infobox');
    if(character != selectedChar){
      selectedChar = character;
      box.style.display = "flex";
    }
    else
    {
      selectedChar = null;
      box.style.display = "none";
    }



    
    // const info = Object.values(infobox);

    // console.log(info);

    if(character.includes('%20'))
    {
        let split = character.split('%20');
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

    document.getElementById('baseImg').src = infobox.imageURL;
    document.getElementById('icons').src = infobox.icon;
    document.getElementById('origin').innerHTML = infobox.origin;
    document.getElementById('mod').innerHTML = infobox.mod;
    if(infobox.quote != null) document.getElementById('quote').innerHTML = `Quote: <span id="line">${infobox.quote}</span>`;
    else document.getElementById('quote').innerHTML = ``;

    if(yourUsername!=null)
    {
      const getFav = await fetch(`/getFavorite?username=${yourUsername}&newFavorite=${selectedChar}`);
      if(getFav.status == 404)
      {
        document.getElementById('/removeFavorite').style.display = "none";
        document.getElementById('/addFavorite').style.display = "block";
      }
      else if(getFav.status == 200)
      {
        document.getElementById('/removeFavorite').style.display = "block";
        document.getElementById('/addFavorite').style.display = "none";
      }
    }
  }

  const favorite = async (character, on) => {
    const characterAction = character.getAttribute('id');
    const characterMethod = character.getAttribute('class');

    const data = `username=${yourUsername}&newFavorite=${selectedChar}`;

    let response = await fetch(characterAction, {
      method: characterMethod,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json',
      },
      body: data,
    });
      on.style.display = "block";
      character.style.display = "none";

    // console.log(Object.values(obj));

    // let obj = await response.json();
  }