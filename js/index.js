// index.js

const urlBase = "/api";
const extension = "php";

function doSearch(event) {
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
  }

  let tmp = { Name: Name, userId: userId };

  let payload = JSON.stringify(tmp);

  console.log(payload);

  let url = urlBase + "/search." + extension;

  let xhr = new XMLHttpRequest();

  xhr.open("GET", url, true);

  xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

  try {
    xhr.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        let jsonData = JSON.parse(xhr.responseText);
        let cardContainer = document.getElementById("cardContainer");

        console.log(jsonData);

        // Clear existing cards
        cardContainer.innerHTML = "";

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

          // Append phone and email elements to contact information div
          contactInfoElement.appendChild(phoneElement);
          contactInfoElement.appendChild(emailElement);

          // Append name and contact information to the card
          card.appendChild(nameElement);
          card.appendChild(contactInfoElement);

          // Append the card to the card container
          cardContainer.appendChild(card);
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

        window.location.href = "index.html";
      }
    };
    xhr.send(payload);
  } catch (err) {
    document.getElementById("signUpResult").innerHTML = err.message;
  }
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
  window.location.href = "index.html";
}
