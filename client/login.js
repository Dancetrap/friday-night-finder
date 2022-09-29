// let yourUsername;
// let yourPassword;

// if(localStorage.getItem("username") != null)
// {
//     yourUsername = localStorage.getItem("username");
// }

// sessionStorage.setItem("username",null)
// sessionStorage.setItem("password",null)

sessionStorage.removeItem("username")
sessionStorage.removeItem("password")


const handleResponse = async (response) => {
      
    //Grab the content section
    // const content = document.querySelector('#content');
    
    // //Based on the status code, display something
    // switch(response.status) {
    //   case 200: //success
    //     content.innerHTML = `<b>Success</b>`;
    //     break;
    //   case 201: //created
    //     content.innerHTML = '<b>Created</b>';
    //     break;
    //   case 204: //updated (no response back from server)
    //     content.innerHTML = '<b>Updated (No Content)</b>';
    //     return;
    //   case 400: //bad request
    //     content.innerHTML = `<b>Bad Request</b>`;
    //     break;
    //   default: //any other status code
    //     content.innerHTML = `Error code not implemented by client.`;
    //     break;
    // }

    //Parse the response to json. This works because we know the server always
    //sends back json. Await because .json() is an async function.

    if(response.status == 204)
    {
        return;
    }

    let obj = await response.json();

    
    //If we have a message, display it.
    // if(obj.message){
    //   content.innerHTML += `<p>${obj.message}</p>`;
    // }
  };

const sendPost = async (signUp) => {
    //Grab all the info from the form
    const nameAction = signUp.getAttribute('action');
    const nameMethod = signUp.getAttribute('method');
    
    const userField = signUp.querySelector('#user');
    const passField = signUp.querySelector('#password');

    //Build a data string in the FORM-URLENCODED format.
    const formData = `username=${userField.value}&password=${passField.value}`;

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

    if(response.status == 201)
    {   
        sessionStorage.setItem("username",userField.value)
        sessionStorage.setItem("password",passField.value)
        window.location.href="client.html";
    }
};

const sendGet = async (nameForm) => {
    //Grab all the info from the form
    const nameAction = nameForm.getAttribute('action');
    const nameMethod = nameForm.getAttribute('method');
    
    const userField = nameForm.querySelector('#user');
    const passField = nameForm.querySelector('#password');

    //Build a data string in the FORM-URLENCODED format.
    const formData = `username=${userField.value}&password=${passField.value}`;

    let response = await fetch(formData, {
        method: nameMethod,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json',
        },
    });

    // let response = await fetch(nameAction, {
    //   method: nameMethod,
    //   headers: {
    //     'Content-Type': 'application/x-www-form-urlencoded',
    //     'Accept': 'application/json',
    //   },
    // });

    //Once we have a response, handle it.
    handleResponse(response);

    if(response.status == 200)
    {   
        sessionStorage.setItem("username",userField.value)
        sessionStorage.setItem("password",passField.value)
        window.location.href="client.html";
    }
};

  //Init function is called when window.onload runs (set below).
  const init = () => {
    //Grab the form
    // const nameForm = document.querySelector('#nameForm');

    // const searchBox = document.querySelector('#searchBox');

    const signUp = document.querySelector('#signupForm');
    const login = document.querySelector('#loginForm');
    
    // //Create an addUser function that cancels the forms default action and
    // //calls our sendPost function above.
    // const addUser = (e) => {
    //   e.preventDefault();
    //   sendPost(nameForm);
    //   return false;
    // }
    
    // //Call addUser when the submit event fires on the form.
    // nameForm.addEventListener('submit', addUser);

    // searchBox.addEventListener('input', async () => {
    //   const response = await fetch(`/getUser?name=${searchBox.value}`);
    //   const obj = await response.json();
    //   console.log(obj);
    // });

    const addUser = (e) => {
        e.preventDefault();
        sendPost(signUp);
        return false;
    }

    const getUser = (e) => {
        e.preventDefault();
        sendGet(login);
        return false;
    }

    signUp.addEventListener('submit',addUser);
    // login.addEventListener('submit', getUser);

  };

  //When the window loads, run init.
  window.onload = init;