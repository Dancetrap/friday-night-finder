    //Handles our FETCH response. This function is async because it
    //contains an await.
    // const handleResponse = async (response) => {
      
    //     //Grab the content section
    //     const content = document.querySelector('#content');
  
    //     //Based on the status code, display something
    //     switch(response.status) {
    //       case 200: //success
    //         content.innerHTML = `<b>Success</b>`;
    //         break;
    //       case 201: //created
    //         content.innerHTML = '<b>Created</b>';
    //         break;
    //       case 204: //updated (no response back from server)
    //         content.innerHTML = '<b>Updated (No Content)</b>';
    //         return;
    //       case 400: //bad request
    //         content.innerHTML = `<b>Bad Request</b>`;
    //         break;
    //       default: //any other status code
    //         content.innerHTML = `Error code not implemented by client.`;
    //         break;
    //     }
  
    //     //Parse the response to json. This works because we know the server always
    //     //sends back json. Await because .json() is an async function.
    //     let obj = await response.json();
        
    //     //If we have a message, display it.
    //     if(obj.message){
    //       content.innerHTML += `<p>${obj.message}</p>`;
    //     }
    //   };
  
    //   //Uses fetch to send a postRequest. Marksed as async because we use await
    //   //within it.
    //   const sendPost = async (nameForm) => {
    //     //Grab all the info from the form
    //     const nameAction = nameForm.getAttribute('action');
    //     const nameMethod = nameForm.getAttribute('method');
        
    //     const nameField = nameForm.querySelector('#nameField');
    //     const ageField = nameForm.querySelector('#ageField');
  
    //     //Build a data string in the FORM-URLENCODED format.
    //     const formData = `name=${nameField.value}&age=${ageField.value}`;
  
    //     //Make a fetch request and await a response. Set the method to
    //     //the one provided by the form (POST). Set the headers. Content-Type
    //     //is the type of data we are sending. Accept is the data we would like
    //     //in response. Then add our FORM-URLENCODED string as the body of the request.
    //     let response = await fetch(nameAction, {
    //       method: nameMethod,
    //       headers: {
    //         'Content-Type': 'application/x-www-form-urlencoded',
    //         'Accept': 'application/json',
    //       },
    //       body: formData,
    //     });
  
    //     //Once we have a response, handle it.
    //     handleResponse(response);
    //   };
  
    //   //Init function is called when window.onload runs (set below).
    //   const init = () => {
    //     //Grab the form
    //     const nameForm = document.querySelector('#nameForm');
  
    //     const searchBox = document.querySelector('#characterField');
        
    //     //Create an addUser function that cancels the forms default action and
    //     //calls our sendPost function above.
    //     const addUser = (e) => {
    //       e.preventDefault();
    //       sendPost(nameForm);
    //       return false;
    //     }
        
    //     //Call addUser when the submit event fires on the form.
    //     nameForm.addEventListener('submit', addUser);
  
    //     searchBox.addEventListener('input', async () => {
    //     // if searchBox.value includes a space, split and replace with '%20'
    //       const response = await fetch(`/getCharacters?name=${searchBox.value}`);
    //       const obj = await response.json();
    //       console.log(obj);
    //     });
    //   };
  
    //   //When the window loads, run init.
    //   window.onload = init;

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
        const obj = await response.json();

        // This is so I can get the info from the parsed JSON
        globalJSON = obj;

        const val = Object.values(obj).sort(function(a, b) {
          return compareStrings(a.name, b.name);
        });

        content.innerHTML = '';
        // Object.values(obj).forEach(char => {
        val.forEach(char => {
          console.log(char);
            let altName = '';
            if(char.alt != null) altName = char.alt;
            else altName = char.name;
            content.innerHTML += `<div id="${char.name}" style="margin: 5px;">
            <button id="${char.name}Button" class="character" origin="${char.origin}" mod="${char.mod}" icon="${char.icon}" style="background: rgba(0,0,0,0); border: none; cursor: pointer;">
            <img src="${char.imageURL}" alt="${char.name}" height="150px" style="object-fit: contain;" id="${char.name}Img"></img>
            </button>
            <p style="margin: 1px;">${altName}</p>
            </div>`;
        });
        // for(let k of obj)
        // {
        //   console.log(obj[k]);
        // }
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