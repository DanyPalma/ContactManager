document.addEventListener("DOMContentLoaded", function() {
    
    let sub = document.getElementById("registerButton").disabled = true;
  
});



document.getElementById("signPassword").addEventListener("input", function() {
    let password = this.value;

    
    if(validateLength(password)) {
        document.getElementById("minLengthReq").className = "met";
    } else {
        document.getElementById("minLengthReq").className = "not-met";
    }
    
    if(validateUppercase(password)) {
        document.getElementById("uppercaseReq").className = "met";
    }else {
        document.getElementById("uppercaseReq").className = "not-met";
    }

    if(validateSpecial(password)) {
        document.getElementById("specialCharReq").className = "met";
    } else {
        document.getElementById("specialCharReq").className = "not-met";
    }

    if(validateDigit(password)) {
        document.getElementById("digitReq").className = "met";
    } else {
        document.getElementById("digitReq").className = "not-met";
    }
  
    if (!validatePassword(password)) {
        document.getElementById("registerButton").disabled = true;

    } else {
        document.getElementById("registerButton").disabled = false;
    }
  });
  
  function validatePassword(password) {
    // Minimum 8 characters
    if(validateLength(password) && validateUppercase(password) && validateSpecial(password) && validateDigit(password)) return true;

    return false;
  }

  function validateLength(password) {

    password = password.trim();

    return password.length >= 8;


  }

  function validateUppercase(password) {
    if (!/[A-Z]/.test(password)) return false;

    return true;
  }

  function validateDigit(password){
    if (!/\d/.test(password)) return false;

    return true;
  }

  function validateSpecial(password) {
    if (!/[!@#$%^&*]/.test(password)) return false;

    return true;
}