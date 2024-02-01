// index.js

const urlBase = '/api';
const extension = 'php';


function doRegister(event) {

    event.preventDefault();

    let firstName = document.getElementById("signFirst").value;
    let lastName = document.getElementById("signLast").value;
    let username = document.getElementById("signUsername").value;
    let password = document.getElementById("signPassword").value;

    let tmp = {firstName:firstName,lastName:lastName,login:username,password:password};

    let payload = JSON.stringify(tmp);

    let url = urlBase + '/register.' + extension;

    let xhr = new XMLHttpRequest();

    xhr.open("POST", url, true);

    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

    try
    {

        xhr.onreadystatechange = function()
        {
            if(this.readyState == 4 & this.status == 200)
            {
                let jsonObject = JSON.parse(xhr.responseText);
                err = jsonObject.error;
                if(error != "")
                {
                    document.getElementById("signUpResult").innerHTML = "User/Password combination incorrect";
                    return;
                }

                window.location.href = "index.html"



            }
        };
        xhr.send(payload);

    }
    catch(err)
    {
        document.getElementById("signUpResult").innerHTML = err.message;
    } 


}

function login(event) {

    event.preventDefault();

    let login = document.getElementById("logUsername").value;
    let password = document.getElementById("logPassword").value;

    let tmp = {login:login,password:password};

    let payload = JSON.stringify(tmp);

    let url = urlBase + '/login.' + extension;

    let xhr = new XMLHttpRequest();

    xhr.open("POST", url, true);

    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

    try
    {
        xhr.onreadystatechange = function()
        {
            if(this.readyState == 4 & this.status == 200)
            {
                let jsonObject = JSON.parse(xhr.responseText);
                userId = jsonObject.id;
                if(userId < 1)
                {
                    document.getElementById("loginResult").innerHTML = "User/Password combination incorrect";
                    return;
                }

                firstName = jsonObject.firstName;
                lastName = jsonObject.lastName;

                saveCookie();

                window.location.href = "landing.html"
            }
        };
        xhr.send(payload);
    }   
    catch(err)
    {
        document.getElementById("loginResult").innerHTML = err.message;
    } 

}

function saveCookie()
{
    let minutes = 20;
    let date = new Date();
    date.setTime(date.getTime()+(minutes*60*1000));
    document.cookie
	document.cookie = "firstName=" + firstName + ",lastName=" + lastName + ",userId=" + userId + ";expires=" + date.toGMTString();
}

function readCookie()
{
    userId = -1;
    let data = document.cookie;

    let splits = data.split(",");
    for(var i = 0; i < splits.length; i++) {
        let thisOne = splits[i].trim();
        let tokens = thisOne.split("=");
        if(tokens[0] == "firstName"){
            firstName = tokens[1];
        }
        else if( tokens[0] == "lastName"){
            lastName = tokens[1];
        }
        else if( tokens[0] == "userId"){
            userId = parseInt(tokens[1].trim());
        }
    }

    if(userId < 0) {
        window.location.href="index.html";
    }
    else 
    {
        document.getElementById("userName").innerHTML = "Welcome " + firstName + " " + lastName + "!"; 

        // let tmp = {userId:"7"}

        // let payload = JSON.stringify(tmp);

        let payload = {"userId":"7"};

        let url = urlBase + '/read.' + extension;

        let xhr = new XMLHttpRequest();

        xhr.open("GET", url, true);

        xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

        try
        {

            xhr.onreadystatechange = function()
            {
                if(this.readyState == 4 && this.status == 200) 
                {

                    let jsonObject = JSON.parse(xhr.responseText);

                    console.log(jsonObject);

                }
            };
            xhr.send(payload);



        }
        catch(err)
        {
            window.alert("Could not retrieve data for user " + firstName + " " + lastName);
        }



    }

}

function doLogout(event)
{
    event.preventDefault;
    userId = 0;
	firstName = "";
	lastName = "";
	document.cookie = "firstName= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
	window.location.href = "index.html";
}