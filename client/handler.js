/***Old Code***/

// let selectedChar = null;
// const box = document.getElementById('infobox');

// let yourUsername = null;
// // import wiki from '../wikijs';

// if(sessionStorage.getItem("username") != null)
// {
//   yourUsername = sessionStorage.getItem("username");
// }

//     //Uses fetch to send a postRequest. Marksed as async because we use await
//     //within it.

//     //Init function is called when window.onload runs (set below).
//     const init = () => {
//       // Bruce Wayne

//       const sIn = document.querySelector("#signIn");
//       const welcome = document.querySelector("#profile");
//       const sOut = document.querySelector("#signOut");

//       if(yourUsername != null)
//       {
//         sIn.style.display = "none";
//         welcome.style.display = "flex";
//         document.querySelector("#welcome").innerHTML = `Welcome: ${yourUsername}`;
//       }
//       else
//       {
//         sIn.style.display = "flex";
//         welcome.style.display = "none";
//       }
      
//       sOut.addEventListener('submit',function(){
//         sessionStorage.removeItem("username")
//         sessionStorage.removeItem("password")
//       });
//       //Grab the form

//       const searchBox = document.querySelector('#characterField');

//       searchBox.addEventListener('input', async () => {
//       // if searchBox.value includes a space, it will automatically put in a '%20' in between
//         const response = await fetch(`/getCharacters?name=${searchBox.value}`);
//         // This is where the Unexpected end of JSON input error happens
//         // console.log(response);
//         const box = document.getElementById('infobox');
//         // console.log(box.style);

//         if(response.status == 204)
//         {
//           if(box.style.display == "none" || box.style.display == "") content.innerHTML = `<h4>Use the search box to look up a character</h4>`;
//           else content.innerHTML = ``;
//           // content.innerHTML = `<h4>Use the search box to look up a character</h4>`;
//           return;
//         }
//           const obj = await response.json();
//           // console.log(obj);
//           // This is so I can get the info from the parsed JSON
          
//           if(response.status == 200)
//           {
//             // globalJSON = obj;
  
//             const val = Object.values(obj).sort(function(a, b) {
//               return compareStrings(a.name, b.name);
//             });
    
//             content.innerHTML = '';
//             // Object.values(obj).forEach(char => {
//             val.forEach(char => {
//               // console.log(char);
//                 let altName = '';
//                 altName = char.name.replace(/ /g, "%20");
//                 const getCharacter = () => {
//                   // console.log(altName);
//                   characterInfo(altName);
//                 };
                
//                 const characterDiv = document.createElement('div');
//                 const characterButton = document.createElement('button');

//                 characterButton.innerHTML = `<img src="${char.imageURL}" alt="${char.name}" height="150px" style="object-fit: contain;" id="${char.name}Img"></img><p style="margin: 1px;">${char.name}</p>`;
//                 // characterButton.onclick = function(){characterInfo(altName);};
                
//                 characterButton.style = "background: rgba(0,0,0,0); border: none; cursor: pointer;";
//                 characterDiv.appendChild(characterButton);
//                 content.appendChild(characterDiv);
//                 characterButton.addEventListener('click', getCharacter);
//             });
//           }
//           else if(response.status == 404)
//           {
//               content.innerHTML = `<h4>Error: ${obj.message}</h4>`;
//           }
//       });
//         let add = () => favorite(document.getElementById('/addFavorite'),document.getElementById('/removeFavorite'))
//         let remove = () => favorite(document.getElementById('/removeFavorite'),document.getElementById('/addFavorite'))
//         document.getElementById('/addFavorite').addEventListener('click',add);
//         document.getElementById('/removeFavorite').addEventListener('click',remove);

//         if(yourUsername == null) document.getElementById('buttons').style.display = "none";
//         else document.getElementById('buttons').style.display = "block";

//         // wiki().page('Batman')	.then(page => page.info('alterEgo')).then(console.log); 
//     };

//     //When the window loads, run init.
//     window.onload = init;

//   function compareStrings(a, b) {
//     // Assuming you want case-insensitive comparison
//     a = a.toLowerCase();
//     b = b.toLowerCase();
  
//     return (a < b) ? -1 : (a > b) ? 1 : 0;
//   };

//   function capitalizeFirstLetter(string) {
//     return string.charAt(0).toUpperCase() + string.slice(1);
//   };

//   const characterInfo = async (character) => {
//     const response = await fetch(`/getCharacter?name=${character}`);
//     const infobox = await response.json();
//     console.log(infobox);

//     const box = document.getElementById('infobox');
//     if(character != selectedChar){
//       selectedChar = character;
//       box.style.display = "flex";
//     }
//     else
//     {
//       selectedChar = null;
//       box.style.display = "none";
//     }



    
//     // const info = Object.values(infobox);

//     // console.log(info);

//     if(character.includes('%20'))
//     {
//         let split = character.split('%20');
//         let blank = ''
//         split.forEach(vari =>{
//             // blank
//             if(split.indexOf(vari) == split.length-1)
//             {
//                 blank += capitalizeFirstLetter(vari);
//             }
//             else
//             {
//                 blank += capitalizeFirstLetter(vari) + " ";
//             }
//         });
//         document.getElementById('name').innerHTML = blank;
//     }
//     else
//     {
//         document.getElementById('name').innerHTML = capitalizeFirstLetter(character);
//     }

//     document.getElementById('baseImg').src = infobox.imageURL;
//     document.getElementById('icons').src = infobox.icon;
//     document.getElementById('origin').innerHTML = infobox.origin;
//     document.getElementById('mod').innerHTML = infobox.mod;
//     if(infobox.quote != null) document.getElementById('quote').innerHTML = `Quote: <span id="line">${infobox.quote}</span>`;
//     else document.getElementById('quote').innerHTML = ``;

//     if(yourUsername!=null)
//     {
//       const getFav = await fetch(`/getFavorite?username=${yourUsername}&newFavorite=${selectedChar}`);
//       if(getFav.status == 404)
//       {
//         document.getElementById('/removeFavorite').style.display = "none";
//         document.getElementById('/addFavorite').style.display = "block";
//       }
//       else if(getFav.status == 200)
//       {
//         document.getElementById('/removeFavorite').style.display = "block";
//         document.getElementById('/addFavorite').style.display = "none";
//       }
//     }
//   }

//   const favorite = async (character, on) => {
//     const characterAction = character.getAttribute('id');
//     const characterMethod = character.getAttribute('class');

//     const data = `username=${yourUsername}&newFavorite=${selectedChar}`;

//     let response = await fetch(characterAction, {
//       method: characterMethod,
//       headers: {
//         'Content-Type': 'application/x-www-form-urlencoded',
//         'Accept': 'application/json',
//       },
//       body: data,
//     });
//       on.style.display = "block";
//       character.style.display = "none";

//     // console.log(Object.values(obj));

//     // let obj = await response.json();
//   }

/* New Code */
let selectedChar = null;
const box = document.getElementById('infobox');

let yourUsername = null;
// import wiki from '../wikijs';

if(sessionStorage.getItem("username") != null)
{
  yourUsername = sessionStorage.getItem("username");
}

    //Uses fetch to send a postRequest. Marksed as async because we use await
    //within it.

    //Init function is called when window.onload runs (set below).
    const init = () => {
      // Bruce Wayne

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
        const response = await fetch(`/findCharacter?search=${searchBox.value}`);
          // const response = await fetch(`/getCharacters?name=${searchBox.value}`);
          // This is where the Unexpected end of JSON input error happens
          // console.log(response);
          const box = document.getElementById('infobox');
          // console.log(box.style);
  
          if(response.status == 204)
          {
            if(box.style.display == "none" || box.style.display == "") content.innerHTML = `<h4>Use the search box to look up a character</h4>`;
            else content.innerHTML = ``;
            // content.innerHTML = `<h4>Use the search box to look up a character</h4>`;
            return;
          }
            const obj = await response.json();
            // console.log(obj);
            // This is so I can get the info from the parsed JSON
            
            if(response.status == 200)
            {
              // globalJSON = obj;
    
              const val = Object.values(obj).sort(function(a, b) {
                return compareStrings(a.name, b.name);
              });
      
              content.innerHTML = '';
  
              console.log(val);
              // Object.values(obj).forEach(char => {
              val.forEach(char => {
                // console.log(char);
                  const getCharacter = () => {
                    // console.log(altName);
                    characterInfo(char.page);
                  };
                  
                  const characterDiv = document.createElement('div');
                  const characterButton = document.createElement('button');
  
                  characterButton.innerHTML = `<img src="${char.image}" alt="${char.page}" height="150px" style="object-fit: contain;" id="${char.page}Img"></img><p style="margin: 1px;">${char.page}</p>`;
              //     // characterButton.onclick = function(){characterInfo(altName);};
                  
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

        // wiki().page('Batman')	.then(page => page.info('alterEgo')).then(console.log); 
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
    const response = await fetch(`/searchCharacter?search=${character}`);
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



    
    // // const info = Object.values(infobox);

    // // console.log(info);

    // if(character.includes('%20'))
    // {
    //     let split = character.split('%20');
    //     let blank = ''
    //     split.forEach(vari =>{
    //         // blank
    //         if(split.indexOf(vari) == split.length-1)
    //         {
    //             blank += capitalizeFirstLetter(vari);
    //         }
    //         else
    //         {
    //             blank += capitalizeFirstLetter(vari) + " ";
    //         }
    //     });
    //     document.getElementById('name').innerHTML = blank;
    // }
    // else
    // {
    //     document.getElementById('name').innerHTML = capitalizeFirstLetter(character);
    // }

    document.getElementById('colorBox').style.backgroundColor = infobox.color;
    console.log(document.getElementById('colorBox').style.backgroundColor == "rgb(0, 0, 0)");
    if(document.getElementById('colorBox').style.backgroundColor == "rgb(0, 0, 0)") document.getElementById('name').style.color = "white";
    else document.getElementById('name').style.color = "black";
    document.getElementById('name').innerHTML = infobox.name;
    document.getElementById('baseImg').src = infobox.image;
    // document.getElementById('icons').src = infobox.icon;
    document.getElementById('origin').innerHTML = infobox.origin;
    document.getElementById('mod').innerHTML = infobox.mod;
    // if(infobox.quote != null) document.getElementById('quote').innerHTML = `Quote: <span id="line">${infobox.quote}</span>`;
    // else document.getElementById('quote').innerHTML = ``;

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