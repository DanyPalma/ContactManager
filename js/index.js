// index.js

const urlBase = "/api";
const extension = "php";

function editContact(button) {
  // Get the card element
  let card = button.closest('.card');

  // Store original content for canceling edits
  originalContent = card.innerHTML;

  card.className = "card-edit";

  // Get current information

  let first = card.querySelector('h1').textContent.trim().split(' ')[0].trim();

  let last = card.querySelector('h1').textContent.trim().split(' ')[1].trim();

  let id = card.querySelector('p').textContent.trim().split(':')[1].trim();
  let phone = card.querySelectorAll('p')[1].textContent.trim().split(':')[1].trim();
  let email = card.querySelectorAll('p')[2].textContent.trim().split(':')[1].trim();

  // Replace the card content with input fields
  card.innerHTML = `
  <form class="add-form">
  <p>ID: ${id}</p>
  <h1>First Name</h1>
  <input id="first-add" type="text" placeholder="John" value="${first}">
  <h1>Last Name</h1>
  <input id="last-add" type="text" placeholder="Appleseed" value="${last}">
  <h1>Phone Number</h1>
  <input id="phone-add" type="tel" placeholder="123-456-7890" value="${phone}">
  <h1>Email</h1>
  <input id="email-add" type="email" placeholder="email@domain.com" value="${email}">
  <div class="form-buttons">
      <button class="hoverable" onclick="saveContact(this);">Submit</button>
      <button class="hoverable" onclick="cancelEdit(this);">Cancel</button>
  </div>
</form>
  `;
}

function cancelEdit(button) {
  // Get the card element and revert to original content
  let card = button.closest('.card-edit');
  card.className = "card";
  card.innerHTML = originalContent;
}


function saveContact(button) {
  // Get the card element
  let card = button.closest('.card-edit');

  let form = button.closest('.add-form');

  // Get updated information
  let FirstName = form.querySelector('#first-add').value;
  let LastName = form.querySelector('#last-add').value;
  let Phone = form.querySelector('#phone-add').value;
  let Email = form.querySelector('#email-add').value;
  let ID = form.querySelector('p').textContent.trim().split(':')[1].trim();

  let tmp = {
    FirstName: FirstName,
    LastName: LastName,
    Phone: Phone,
    Email: Email,
    ID: ID,
  };

  let payload = JSON.stringify(tmp);

  let url = urlBase + "/update." + extension;

  let xhr = new XMLHttpRequest();

  xhr.open("POST", url, true);

  xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

  try {
    xhr.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        let jsonObject = JSON.parse(xhr.responseText);
        err = jsonObject.error;
        if (err != "") {
          alert("Error updating contact, please try again");
          return;
        }
      }
    };

    xhr.send(payload);
  } catch (err) {
    alert("Error: " + err.message);
  }


  // Replace the card content with updated information
  card.innerHTML = `
    <div>
      <h1>${FirstName} ${LastName}</h1>
      <p>ID: ${ID}</p>
      <div class="contact-buttons">
      <button onclick="editContact(this);">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="smaller-logo">
          <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
        </svg>
      </button>

      <button onclick="deleteContact(this);">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="smaller-logo">
          <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
        </svg>
      </button >
    </div>
</div>
    </div>
    <div>
      <p>Phone: ${Phone}</p>
      <p>Email: ${Email}</p>
    </div>
  `;

  card.className = "card";


}

function deleteContact(button) {

  var isConfirmed = window.confirm("Are you sure you want to delete this contact?");

  if (!isConfirmed) {
    return;
  }
  
  var innerDiv = button.parentNode;

  var OuterDiv = innerDiv.parentNode;

  var paragraph = OuterDiv.querySelector('p');

  var paragraphText = paragraph.textContent;

  var ID = paragraphText.split(":")[1].trim();

  let tmp = {
    ID: ID,
  };

  let payload = JSON.stringify(tmp);

  let url = urlBase + "/delete." + extension;

  let xhr = new XMLHttpRequest();

  xhr.open("POST", url, true);

  xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

  try {
    xhr.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        let jsonObject = JSON.parse(xhr.responseText);
        err = jsonObject.error;
        if (err != "") {
          alert("Error deleting contact, please try again");
          return;
        }
      }
    };

    xhr.send(payload);
  } catch (err) {
    alert("Error: " + err.message);
  }

  let card = button.parentNode.parentNode.parentNode;

  card.remove();

  alert("Successfully deleted contact");

}

function addContact(event) {
  event.preventDefault();

  let FirstName = document.getElementById("first-add").value;

  let LastName = document.getElementById("last-add").value;

  let Phone = document.getElementById("phone-add").value;

  let Email = document.getElementById("email-add").value;

  userId = -1;

  let data = document.cookie;

  let splits = data.split(",");
  for (var i = 0; i < splits.length; i++) {
    let thisOne = splits[i].trim();
    let tokens = thisOne.split("=");
    if (tokens[0] == "userId") {
      userId = parseInt(tokens[1].trim());
    }
  }

  if (userId < 0) {
    alert(
      "You are not logged in or we had an Issue retrieving your information. Please log in again."
    );

    window.location.href = "index.html";
  }

  let tmp = {
    FirstName: FirstName,
    LastName: LastName,
    Phone: Phone,
    Email: Email,
    userId,
    userId,
  };

  let payload = JSON.stringify(tmp);

  let url = urlBase + "/create." + extension;

  let xhr = new XMLHttpRequest();

  xhr.open("POST", url, true);

  xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

  try {
    xhr.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        let jsonObject = JSON.parse(xhr.responseText);
        err = jsonObject.error;
        if (err != "") {
          alert("Error adding contact, please try again");
          return;
        }
      }
    };

    xhr.send(payload);
  } catch (err) {
    alert("Error: " + err.message);
  }

  alert("Successfully added contact");
  window.location.href = "./landing.html";
}

document.addEventListener("DOMContentLoaded", function() {
  // Get the input element
  var input = document.getElementById("query");

  // Add event listener for the 'input' event
  input.addEventListener("input", function(event) {
    // Call the doSearch function whenever there's an input
    doSearch(event);
  });
});



function doSearch(event) {
  event.preventDefault();

  let Name = document.getElementById("query").value;

  userId = -1;
  firstName = "";
  lastName = "";
  let data = document.cookie;

  let splits = data.split(",");
  for (var i = 0; i < splits.length; i++) {
    let thisOne = splits[i].trim();
    let tokens = thisOne.split("=");
    if (tokens[0] == "firstName") {
      firstName = tokens[1];
    } else if (tokens[0] == "lastName") {
      lastName = tokens[1];
    } else if (tokens[0] == "userId") {
      userId = parseInt(tokens[1].trim());
    }
  }

  if (userId < 0) {
    alert(
      "You are not logged in or we had an Issue retrieving your information. Please log in again."
    );

    window.location.href = "log.html";
  }

  let tmp = { Name: Name, userId: userId };

  let payload = JSON.stringify(tmp);

  let url = urlBase + "/search." + extension;

  let xhr = new XMLHttpRequest();

  xhr.open("POST", url, true);

  xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

  try {
    xhr.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        let jsonData = JSON.parse(xhr.responseText);
        let cardContainer = document.getElementById("cardContainer");

        console.log(jsonData);

        // Clear existing cards
        cardContainer.innerHTML = "";

        if (jsonData.error || jsonData.error == "No records found") {
          let nameElement = document.createElement("h1");
          nameElement.textContent = "No records found";
          cardContainer.appendChild(nameElement);
          return;
        }

        // Loop through the JSON data and create cards
        for (let i = 0; i < jsonData.length; i++) {
          let cardData = jsonData[i];

          // Create card element
          let card = document.createElement("div");
          card.className = "card";

          let mainInfoElement = document.createElement("div");

          // Create h1 element for name
          let nameElement = document.createElement("h1");
          nameElement.textContent =
            cardData.FirstName + " " + cardData.LastName;

          // create p element for ID
          let idElement = document.createElement("p");
          idElement.className = "idBox";
          idElement.textContent = "ID: " + cardData.ID;

          // Create div element for contact information
          let contactInfoElement = document.createElement("div");

          // Create p elements for phone and email
          let phoneElement = document.createElement("p");
          phoneElement.textContent = "Phone: " + cardData.Phone;

          let emailElement = document.createElement("p");
          emailElement.textContent = "Email: " + cardData.Email;

          // Append phone and email elements to contact information div
          contactInfoElement.appendChild(phoneElement);
          contactInfoElement.appendChild(emailElement);

          // Append name and contact information to the card

          mainInfoElement.appendChild(nameElement);
          mainInfoElement.appendChild(idElement);

          card.appendChild(mainInfoElement);
          card.appendChild(contactInfoElement);

          // Append the card to the card container
          cardContainer.appendChild(card);

          mainInfoElement.innerHTML += `
          <div class="contact-buttons">
            <button class="hoverable" onclick="editContact(this);">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="smaller-logo">
                <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
              </svg>
            </button>
      
            <button class="hoverable" onclick="deleteContact(this);">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="smaller-logo">
                <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
              </svg>
            </button >
          </div>
        `;
        }
      }
    };

    xhr.send(payload);
  } catch (err) {
    alert("Error: " + err.message);
  }

  var cards = document.querySelectorAll(".card");

  cards.forEach(function (card) {
    var button = card.querySelector(".log-button");
    var h2 = card.querySelector("h2");

    button.addEventListener("click", function () {
      // Log the content of the corresponding H2
      console.log(h2.textContent);
    });
  });

}

document.getElementById("signPassword").addEventListener("input", function() {
  let password = this.value;

  if (!validatePassword(password)) {
      document.getElementById("signUpResult").innerHTML =
          "Password must be at least 8 characters long and contain at least one uppercase letter, one number, and one special character (!@#$%^&*)";
      document.getElementById("registerButton").disabled = true;
  } else {
      document.getElementById("signUpResult").innerHTML = "";
      document.getElementById("registerButton").disabled = false;
  }
});

function validatePassword(password) {
  // Minimum 8 characters
  if (password.length < 8) return false;
  // Minimum one uppercase letter
  if (!/[A-Z]/.test(password)) return false;
  // Minimum one number
  if (!/\d/.test(password)) return false;
  // Minimum one special character
  if (!/[!@#$%^&*]/.test(password)) return false;

  return true;
}

function doRegister(event) {
  event.preventDefault();

  let firstName = document.getElementById("signFirst").value;
  let lastName = document.getElementById("signLast").value;
  let username = document.getElementById("signUsername").value;
  let password = document.getElementById("signPassword").value;

  let tmp = {
    firstName: firstName,
    lastName: lastName,
    login: username,
    password: password,
  };

  let payload = JSON.stringify(tmp);

  let url = urlBase + "/register." + extension;

  let xhr = new XMLHttpRequest();

  xhr.open("POST", url, true);

  xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

  try {
    xhr.onreadystatechange = function () {
      if ((this.readyState == 4) & (this.status == 200)) {
        let jsonObject = JSON.parse(xhr.responseText);
        err = jsonObject.error;
        if (err != "") {
          document.getElementById("signUpResult").innerHTML =
            "User/Password combination incorrect";
          return;
        }
      }
    };
    xhr.send(payload);
  } catch (err) {
    document.getElementById("signUpResult").innerHTML = err.message;
  }

  alert("Successfully Registered User");
  window.location.href = "./log.html";
}

function login(event) {
  event.preventDefault();

  let login = document.getElementById("logUsername").value;
  let password = document.getElementById("logPassword").value;

  let tmp = { login: login, password: password };

  let payload = JSON.stringify(tmp);

  let url = urlBase + "/login." + extension;

  let xhr = new XMLHttpRequest();

  xhr.open("POST", url, true);

  xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

  try {
    xhr.onreadystatechange = function () {
      if ((this.readyState == 4) & (this.status == 200)) {
        let jsonObject = JSON.parse(xhr.responseText);
        userId = jsonObject.id;
        if (userId < 1) {
          document.getElementById("loginResult").innerHTML =
            "User/Password combination incorrect";
          return;
        }

        firstName = jsonObject.firstName;
        lastName = jsonObject.lastName;

        saveCookie();

        window.location.href = "landing.html";
      }
    };
    xhr.send(payload);
  } catch (err) {
    document.getElementById("loginResult").innerHTML = err.message;
  }
}

function saveCookie() {
  let minutes = 20;
  let date = new Date();
  date.setTime(date.getTime() + minutes * 60 * 1000);
  document.cookie;
  document.cookie =
    "firstName=" +
    firstName +
    ",lastName=" +
    lastName +
    ",userId=" +
    userId +
    ";expires=" +
    date.toGMTString();
}

// function readCookie()
// {
//     userId = -1;
//     let data = document.cookie;

//     let splits = data.split(",");
//     for(var i = 0; i < splits.length; i++) {
//         let thisOne = splits[i].trim();
//         let tokens = thisOne.split("=");
//         if(tokens[0] == "firstName"){
//             firstName = tokens[1];
//         }
//         else if( tokens[0] == "lastName"){
//             lastName = tokens[1];
//         }
//         else if( tokens[0] == "userId"){
//             userId = parseInt(tokens[1].trim());
//         }
//     }

//     if(userId < 0) {
//         window.location.href="index.html";
//     }
//     else
//     {
//         document.getElementById("userName").innerHTML = "Welcome " + firstName + " " + lastName + "!";

//         let tmp = {userId:userId};

//         let payload = JSON.stringify(tmp);

//         let url = urlBase + '/read.' + extension;

//         let xhr = new XMLHttpRequest();

//         xhr.open("POST", url, true);

//         xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

//         try
//         {

//             xhr.onreadystatechange = function()
//             {
//                 if(this.readyState == 4 && this.status == 200)
//                 {
//                     let jsonObject = JSON.parse(xhr.responseText);
//                     console.log(jsonObject);
//                     let table = document.getElementById("contacts");
//                     jsonObject.forEach(function (contact) {
//                       let row = table.insertRow();
//                       let propertiesToDisplay = [
//                         "FirstName",
//                         "LastName",
//                         "Email",
//                         "Phone",
//                       ];
//                       propertiesToDisplay.forEach(function (property) {
//                         let cell = row.insertCell();
//                         cell.innerHTML = contact[property];
//                       });
//                     });

//                 }
//             };
//             xhr.send(payload);

//         }
//         catch(err)
//         {
//             window.alert("Could not retrieve data for user " + firstName + " " + lastName);
//         }

//     }

// }

function doLogout(event) {
  event.preventDefault;
  userId = 0;
  firstName = "";
  lastName = "";
  document.cookie = "firstName= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
  window.location.href = "log.html";
}
