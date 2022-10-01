let yourUsername = null;
if(sessionStorage.getItem("username") != null)
{
  yourUsername = sessionStorage.getItem("username");
}

const getFavorites = async () =>{
    if(yourUsername!=null)
    {
        const getFavs = await fetch(`/getFavorites?username=${yourUsername}`);
        const objs = await getFavs.json();
        console.log(objs);
    }
}

const init = () => {
    const sOut = document.querySelector("#signOut");
    sOut.addEventListener('submit',function(){
        sessionStorage.removeItem("username")
        sessionStorage.removeItem("password")
    });

    
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

window.onload = init;
window.onload = getFavorites;