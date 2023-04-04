

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
    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/; 
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
    const phoneRegex = /^07\d{8}$/;
   
    if (!usernameRegex.test(formData.get("Username"))) {
        alert("Username cannot contain spaces");
        return false;
      }
      
      if (!passwordRegex.test( formData.get("Password"))) {
        alert("Password must contain at least 8 characters, 1 number, 1 uppercase letter, and 1 special character");
        return false;
      }
      
      if (!emailRegex.test(formData.get("Email"))) {
        alert("Invalid email address");
        return false;
      }
      
      if (!phoneRegex.test(formData.get("Phone"))) {
        alert("Phone number must start with 07 and consist of 10 digits");
        return false;
      }
      return true;
    }
    const existingRegister = registerList.find(existsAlready => existsAlready.Username === formData.get("Username"));
  if (existingRegister) {
    alert("Username already exists, please choose a different one");
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


  window.onload = renderRegister;

  