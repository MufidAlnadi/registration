

// Step 1: Create a Student constructor function
function Register(Username, Email, Password, Phone) {
    this.Username = Username;
    this.Email = Email;
    this.Password = Password;
    this.Phone = Phone;
  }

const myForm = document.getElementById("ffrom");

let registerList = JSON.parse(sessionStorage.getItem("registerList")) || [];



myForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const formData = new FormData(myForm);

  function validateForm(formData) {
    const usernameRegex = /^\S*$/;
    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]{8,}$/; 

    const emailRegex =/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; 

    const phoneRegex = /^07\d{8}$/;
   const errorBox = document.getElementById("error-box");
    if (!usernameRegex.test(formData.get("Username"))) {
      errorBox.classList.remove("d-none");
      errorBox.innerHTML = "Username cannot contain spaces";
        return false;
      } 
      if (registerList.includes(formData.get("Username"))){
        errorBox.classList.remove("d-none");
        errorBox.innerHTML ="Username already exists, please choose a different one";
        return false;
      }
      
      if (!passwordRegex.test( formData.get("Password"))) {
        errorBox.classList.remove("d-none");
        errorBox.innerHTML ="Password must contain at least 8 characters, 1 number, 1 uppercase letter, and 1 special character";
        return false;
      }
      
      if (!emailRegex.test(formData.get("Email"))) {
        errorBox.classList.remove("d-none");
        errorBox.innerHTML ="Invalid email address";
        return false;
      }
      
      if (!phoneRegex.test(formData.get("Phone"))) {
        errorBox.classList.remove("d-none");
        errorBox.innerHTML ="Phone number must start with 07 and consist of 10 digits";
        return false;
      }
      return true;
    }


    // find is a method to search through the array and find an object with a Username property that matches the value.
    const existingRegister = registerList.find(existsAlready => existsAlready.Username === formData.get("Username"));
  if (existingRegister) {
    errorBox.classList.remove("d-none");
    errorBox.innerHTML ="Username already exists, please choose a different one";
    return false;
  }
    

    if (validateForm(formData)) {
      let newRegister = new Register(
        formData.get("Username"),
        formData.get("Email"),
        formData.get("Password"),
        formData.get("Phone"),
      );
   
    registerList.push(newRegister);
    //stores the array in the sesstion Storage
    sessionStorage.setItem("registerList", JSON.stringify(registerList));
    renderRegister();
   }


});

function renderRegister() {
  
    for (const register of registerList) {
        const card = document.getElementById("card");
        card.classList.remove("d-none");
    const cont = document.createElement("div");
    card.appendChild(cont)

    const ul = document.createElement("ul");
    cont.appendChild(ul);

    
    const username = document.createElement("li");
    username.innerHTML = register.Username;
    ul.appendChild(username);

    const email = document.createElement("li");
    email.innerHTML  = `Email: ${register.Email}`;
    ul.appendChild(email);

    const phone = document.createElement("li");
    phone.innerHTML  = `Phone: ${register.Phone}`;
    ul.appendChild(phone);
  
    
   
    }
    
  }
  function validateForm(formData) {
    // other validation checks
    if (!usernameRegex.test(formData.get("Username"))) {
      const errorBox = document.getElementById("error-box");
      errorBox.innerHTML = "Username cannot contain spaces";
      errorBox.style.backgroundColor = "red"; // set the background color to red
      return false;
    }
    // other validation checks
  }
  


  window.onload = renderRegister;

  