const myForm = document.getElementById("ffrom");
const formData = new FormData(myForm);

function Register(Username, Email, Password, Phone) {
  this.Username = Username;
  this.Email = Email;
  this.Password = Password;
  this.Phone = Phone;
}

let registerList = [];

myForm.addEventListener("submit", function(event) {
  event.preventDefault();
  
  const username = formData.get("Username");
  const email = formData.get("Email");
  const password = formData.get("Password");
  const phone = formData.get("Phone");
  
 
  for (const register of registerList) {
    if (register.Username === username) {
      alert("Username already exists");
      return;
    }
  }
  
  const newRegister = new Register(username, email, password, phone);
  registerList.push(newRegister);
  
  sessionStorage.setItem("registerList", JSON.stringify(registerList));
  alert("Registration successful!");
});

function Regex(){
    const usernameRegex = /^\S*$/;
  
    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/; 
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
    const phoneRegex = /^07\d{8}$/;

    if (!usernameRegex.test(username)) {
        alert("Username cannot contain spaces");
        return;
      }
      
      if (!passwordRegex.test(password)) {
        alert("Password must contain at least 8 characters, 1 number, 1 uppercase letter, and 1 special character");
        return;
      }
      
      if (!emailRegex.test(email)) {
        alert("Invalid email address");
        return;
      }
      
      if (!phoneRegex.test(phone)) {
        alert("Phone number must start with 07 and consist of 10 digits");
        return;
      }
      
}

function renderCard(register) {
    const card = document.createElement("div");
    card.classList.add("card");
    
    const username = document.createElement("h2");
    username.innerText = register.Username;
    
    const email = document.createElement("p");
    email.innerText = `Email: ${register.Email}`;
    
    const phone = document.createElement("p");
    phone.innerText = `Phone: ${register.Phone}`;
    
    card.appendChild(username);
    card.appendChild(email);
    card.appendChild(phone);
    
    return card;
  }
  const cardContainer = document.getElementById("card-container");

  for (const register of registerList) {
    const card = renderCard(register);
    cardContainer.appendChild(card);
  }
    