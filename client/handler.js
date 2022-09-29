let selectedChar = null;
const box = document.getElementById('infobox');

let yourUsername = null;
let yourPassword = null;

if(sessionStorage.getItem("username") != null)
{
  yourUsername = sessionStorage.getItem("username");
}

if(sessionStorage.getItem("password") != null)
{
  yourPassword = sessionStorage.getItem("password");
}

// If user list is empty, then send username and password as null

// const formData = `username=${yourUsername}&password=${yourPassword}`;

const handleResponse = async (response) => {
      
      //Grab the content section
      const content = document.querySelector('#content');

      let globalJSON;

      //Based on the status code, display something
      switch(response.status) {
        case 200: //success
          content.innerHTML = `<b>Success</b>`;
          break;
        case 201: //created
          content.innerHTML = '<b>Created</b>';
          break;
        case 204: //updated (no response back from server)
          content.innerHTML = '<b>Updated (No Content)</b>';
          return;
        case 400: //bad request
          content.innerHTML = `<b>Bad Request</b>`;
          break;
        default: //any other status code
          content.innerHTML = `Error code not implemented by client.`;
          break;
      }

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
      const sOut = document.querySelector("#signOut");

      if(yourUsername != null)
      {
        sIn.style.display = "none";
        sOut.style.display = "flex";
      }
      else
      {
        sIn.style.display = "flex";
        sOut.style.display = "none";
      }
      
      sOut.addEventListener('submit',function(){
        sessionStorage.removeItem("username")
        sessionStorage.removeItem("password")
      });
      //Grab the form
      const nameForm = document.querySelector('#nameForm');

      const searchBox = document.querySelector('#characterField');
      
      //Create an addUser function that cancels the forms default action and
      //calls our sendPost function above.
      const addUser = (e) => {
        e.preventDefault();
        sendPost(nameForm);
        return false;
      }
      
      //Call addUser when the submit event fires on the form.
      // nameForm.addEventListener('submit', addUser);

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
    const response = await fetch(`/getCharacters?name=${character}`);

    const infobox = await response.json();

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

    const info = Object.values(infobox);

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

    document.getElementById('baseImg').src = info[0].imageURL;
    document.getElementById('icons').src = info[0].icon;
    document.getElementById('origin').innerHTML = info[0].origin;
    document.getElementById('mod').innerHTML = info[0].mod;
  }