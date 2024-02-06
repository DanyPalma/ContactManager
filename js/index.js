// index.js

const urlBase = "/api";
const extension = "php";

function deleteContact(button) {
  var contactDiv = button.closest(".invisible");

  // Find the closest sibling div with the class "invisible"
  console.log(contactDiv);
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
  window.location.href = "./newlanding.html";
}

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

    window.location.href = "index.html";
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

          // Create h1 element for name
          let nameElement = document.createElement("h1");
          nameElement.textContent =
            cardData.FirstName + " " + cardData.LastName;

          // Create div element for contact information
          let contactInfoElement = document.createElement("div");

          // Create p elements for phone and email
          let phoneElement = document.createElement("p");
          phoneElement.textContent = "Phone: " + cardData.Phone;

          let emailElement = document.createElement("p");
          emailElement.textContent = "Email: " + cardData.Email;

          let contactID = document.createElement("h2");
          contactID.className = "invisible";
          contactID.textContent = cardData.ID;

          contactInfoElement.append(contactID);

          // Append phone and email elements to contact information div
          contactInfoElement.appendChild(phoneElement);
          contactInfoElement.appendChild(emailElement);

          // Append name and contact information to the card
          card.appendChild(nameElement);
          card.appendChild(contactInfoElement);

          // Append the card to the card container
          cardContainer.appendChild(card);

          card.innerHTML += `
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
        `;
        }
      }
    };

    xhr.send(payload);
  } catch (err) {
    alert("Error: " + err.message);
  }
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
  window.location.href = "./index.html";
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

        window.location.href = "newlanding.html";
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
  window.location.href = "index.html";
}
