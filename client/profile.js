/* Old Code */

// let selectedChar = null;
// let yourUsername = null;
// if(sessionStorage.getItem("username") != null)
// {
//   yourUsername = sessionStorage.getItem("username");
// }

// const content = document.querySelector('#content');

// const getFavorites = async () =>{
//     if(yourUsername!=null)
//     {
//         const content = document.querySelector('#content');
//         content.innerHTML = ``;
//         const getFavs = await fetch(`/getFavorites?username=${yourUsername}`);

//         if(getFavs.status == 204)
//         {
//           content.innerHTML = `<h4>You have no favorites</h4>`;
//           return
//         }

//         const objs = await getFavs.json();
//         console.log(objs);
//         console.log(Object.values(objs));

//         Object.values(objs)[0].forEach(fav =>{
//             // let i = Object.values(objs).indexOf(fav)
//             // console.log(fav[0]);
//             let altName = '';
//             altName = fav.name.replace(/ /g, "%20");
//             const getCharacter = () => {
//               // console.log(altName);
//               characterInfo(altName);
//             };
            
//             const characterDiv = document.createElement('div');
//             const characterButton = document.createElement('button');

//             characterButton.innerHTML = `<img src="${fav.imageURL}" alt="${fav.name}" height="150px" style="object-fit: contain;" id="${fav.name}Img"></img><p style="margin: 1px;">${fav.name}</p>`;
//             // characterButton.onclick = function(){characterInfo(altName);};
            
//             characterButton.style = "background: rgba(0,0,0,0); border: none; cursor: pointer;";
//             characterDiv.appendChild(characterButton);
//             content.appendChild(characterDiv);
//             characterButton.addEventListener('click', getCharacter);
//         });
//     }
// }

// const init = () => {

//     if(yourUsername != null)
//     {
//       document.querySelector("#myProfile").innerHTML = `${yourUsername}'s Favorites`;
//     }

//     const sOut = document.querySelector("#signOut");
//     sOut.addEventListener('submit',function(){
//         sessionStorage.removeItem("username")
//         sessionStorage.removeItem("password")
//     });

//     getFavorites();
// }

// function compareStrings(a, b) {
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
//     }
//   }

// window.onload = init;
// // window.onload = getFavorites;

/* New Code */

let selectedChar = null;
let yourUsername = null;
if(sessionStorage.getItem("username") != null)
{
  yourUsername = sessionStorage.getItem("username");
}

const content = document.querySelector('#content');

const getFavorites = async () =>{
    if(yourUsername!=null)
    {
        const content = document.querySelector('#content');
        content.innerHTML = ``;
        const getFavs = await fetch(`/getWikiFavorites?username=${yourUsername}`);
        console.log(fetch(`/getWikiFavorites?username=${yourUsername}`));
        // const getFavs = await fetch(`/getFavorites?username=${yourUsername}`);
        if(getFavs.status == 204)
        {
          content.innerHTML = `<h4>You have no favorites</h4>`;
          return;
        }

        const objs = await getFavs.json();
        // console.log(objs);
        console.log(Object.values(objs));

        // const promises = list.map((fav)=>{
        //   // const response = await fetch(`/searchCharacter?search=${character}`);
        // });

        Object.values(objs)[0].forEach(fav =>{
          // const info = await fetch(`/getWikiFavorites?username=${yourUsername}`);
          // const response = await fetch(`/searchCharacter?search=${character}`);
            // let i = Object.values(objs).indexOf(fav)
            // console.log(fav[0]);
            // let altName = '';
            // altName = fav.name.replace(/ /g, "%20");
            const getCharacter = () => {
              // console.log(altName);
              characterInfo(fav.page);
            };
            // console.log(fav);
            const characterDiv = document.createElement('div');
            const characterButton = document.createElement('button');

            characterButton.innerHTML = `<img src="${fav.image}" alt="${fav.page}" height="150px" style="object-fit: contain;" id="${fav.page}Img"></img><p style="margin: 1px; font-family: 'Phantom'; ">${fav.page}</p>`;
        //     // characterButton.onclick = function(){characterInfo(altName);};
            
            characterButton.style = "background: rgba(0,0,0,0); border: none; cursor: pointer;";
            characterDiv.appendChild(characterButton);
            content.appendChild(characterDiv);
            characterButton.addEventListener('click', getCharacter);
        });


    }
}

const init = () => {

    if(yourUsername != null)
    {
      document.querySelector("#myProfile").innerHTML = `${yourUsername}'s Favorites`;
    }

    const sOut = document.querySelector("#signOut");
    sOut.addEventListener('submit',function(){
        sessionStorage.removeItem("username")
        sessionStorage.removeItem("password")
    });

    getFavorites();
}

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
    // console.log(infobox);

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
    // console.log(document.getElementById('colorBox').style.backgroundColor == "rgb(0, 0, 0)");
    if(document.getElementById('colorBox').style.backgroundColor == "rgb(0, 0, 0)") document.getElementById('name').style.color = "white";
    else document.getElementById('name').style.color = "black";
    document.getElementById('name').innerHTML = infobox.name;
    document.getElementById('baseImg').src = infobox.image;
    // document.getElementById('icons').src = infobox.icon;
    document.getElementById('origin').innerHTML = infobox.origin;
    document.getElementById('mod').innerHTML = infobox.mod;
    // if(infobox.quote != null) document.getElementById('quote').innerHTML = `Quote: <span id="line">${infobox.quote}</span>`;
    // else document.getElementById('quote').innerHTML = ``;

    // if(yourUsername!=null)
    // {
    //   const getFav = await fetch(`/getFavorite?username=${yourUsername}&newFavorite=${selectedChar}`);
    //   if(getFav.status == 404)
    //   {
    //     document.getElementById('/removeFavorite').style.display = "none";
    //     document.getElementById('/addFavorite').style.display = "block";
    //   }
    //   else if(getFav.status == 200)
    //   {
    //     document.getElementById('/removeFavorite').style.display = "block";
    //     document.getElementById('/addFavorite').style.display = "none";
    //   }
    // }
  }
window.onload = init;
// window.onload = getFavorites;