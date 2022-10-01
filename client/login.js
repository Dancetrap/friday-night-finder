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


const handleResponse = async (response, message) => {
      

    console.log(response);
    if(response.status == 204)
    {
        message.innerHTML = `Username already exist`;
        return;
    }

    let obj = await response.json();
    if(response.status == 400) message.innerHTML = `${obj.message}`;
    
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

    const message = document.querySelector('#signupMessage');
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
    handleResponse(response, message);

    if(response.status == 201)
    {   
        message.innerHTML = '';
        sessionStorage.setItem("username",userField.value)
        sessionStorage.setItem("password",passField.value)
        window.location.href="client.html";
    }
    else
    {
        userField.style.border = "1px solid #FF0000";
        passField.style.border = "1px solid #FF0000";
    }
};

const sendGet = async (nameForm) => {
    //Grab all the info from the form
    const nameAction = nameForm.getAttribute('action');
    const nameMethod = nameForm.getAttribute('method');
    
    const userField = nameForm.querySelector('#user');
    const passField = nameForm.querySelector('#password');

    const message = document.querySelector('#loginMessage');
    console.log(message);

    //Build a data string in the FORM-URLENCODED format.
    const formData = `?username=${userField.value}&password=${passField.value}`;

    // let response = await fetch(nameAction, {
    //     method: nameMethod,
    //     headers: {
    //       'Content-Type': 'application/x-www-form-urlencoded',
    //       'Accept': 'application/json',
    //     },
    //     // body: formData,
    // });
    let response = await fetch(`/getUser${formData}`);
    //Once we have a response, handle it.
    handleResponse(response, message);

    if(response.status == 200)
    {   
        message.innerHTML = '';
        sessionStorage.setItem("username",userField.value)
        sessionStorage.setItem("password",passField.value)
        window.location.href="client.html";
    }
    else
    {
        userField.style.border = "1px solid #FF0000";
        passField.style.border = "1px solid #FF0000";
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
    login.addEventListener('submit', getUser);

  };

  //When the window loads, run init.
  window.onload = init;