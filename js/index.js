const urlBase = 'https://d4ny.tech/api';
const extension = 'php';

function login() {

    let login = document.getElementById("logUsername").value;
    let password = document.getElementById("logPassword").value;
    var hash = md5(password);

    let tmp = {login:login,password:hash};

    let payload = JSON.stringify(tmp);

    let url = urlBase + '/login.' + extension;

    let xhr = new XMLHttpRequest();

    xhr.open("POST", url, true);

    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

    

}