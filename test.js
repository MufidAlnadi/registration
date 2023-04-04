

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

  // Create new Student object from form data
  const formData = new FormData(myForm);

  let newRegister = new Register(
    formData.get("Username"),
    formData.get("Email"),
    formData.get("Password"),
    formData.get("Phone"),
  );
 
  
  
    registerList.push(newRegister);
    sessionStorage.setItem("registerList", JSON.stringify(registerList));
    renderRegister();
    Regex();
   
  
  

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

  function Regex(){
    const usernameRegex = /^\S*$/;
    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/; 
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
    const phoneRegex = /^07\d{8}$/;
    for (const register of registerList) {
    if (!usernameRegex.test(register.Username)) {
        alert("Username cannot contain spaces");
        
      }
      
      if (!passwordRegex.test(register.Password)) {
        alert("Password must contain at least 8 characters, 1 number, 1 uppercase letter, and 1 special character");
       
      }
      
      if (!emailRegex.test(register.Email)) {
        alert("Invalid email address");
      
      }
      
      if (!phoneRegex.test(register.Phone)) {
        alert("Phone number must start with 07 and consist of 10 digits");
      
      }
    
    }
  }
  window.onload = renderRegister;

  