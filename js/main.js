//  signup
var signUp = document.querySelector("#signup");
var signupName = document.querySelector("#signupName");
var signupEmail = document.querySelector("#signupEmail");
var signuppass = document.querySelector("#signupPass");
// login
var login = document.querySelector("#login");
var loginEmail = document.querySelector("#loginEmail");
var loginpass = document.querySelector("#loginpass");

// alret
var loginAlartNotLog = document.querySelector("#loginAlartNotLog");
var loginAlartrequired = document.querySelector("#loginAlartrequired");
var signupAlartrequired = document.querySelector("#signupAlartrequired");
var signupAlartexists = document.querySelector("#signupAlartexists");
var Success = document.querySelector("#Success");
var loginSuccess = document.querySelector("#loginSuccess");
var home = document.querySelector("#Home");


var loginList = [];

if (localStorage.getItem("users")) {
    loginList = JSON.parse(localStorage.getItem("users"));
} else {
    loginList = [];
}

//   localStorage
function saveToLocalStorage() {
    localStorage.setItem("users", JSON.stringify(loginList));
}

// create email 
function createEmail() {
    var signUser = {
        name: signupName.value.trim(),
        email: signupEmail.value.trim(),
        password: signuppass.value.trim()
    };

    if (signUser.name === "" || signUser.email === "" || signUser.password === "") {
        signupAlartrequired.classList.replace("d-none", "d-block");
        Success.classList.replace("d-block", "d-none");
        return;
    }


    var userExists = loginList.some(user => user.email === signUser.email);
    if (userExists) {
        signupAlartexists.classList.replace("d-none", "d-block");
        Success.classList.replace("d-block", "d-none");
        signupAlartrequired.classList.replace("d-block", "d-none");
        return;
    }


    loginList.push(signUser);
    saveToLocalStorage();
    Success.classList.replace("d-none", "d-block");
    signupAlartrequired.classList.replace("d-block", "d-none");
    signupAlartexists.classList.replace("d-block", "d-none");
    window.location.href = "index.html"
}

// login email
function loginEmailToUsers() {
    loginAlartrequired.classList.replace("d-block", "d-none");
    loginAlartNotLog.classList.replace("d-block", "d-none");

    var emailValue = loginEmail.value.trim();
    var passwordValue = loginpass.value.trim();

    if (emailValue === "" || passwordValue === "") {
        loginAlartrequired.classList.replace("d-none", "d-block");
        return;
    }

    var users = JSON.parse(localStorage.getItem("users")) || [];
    var checkedUser = null;

    for (var i = 0; i < users.length; i++) {
        if (users[i].email === emailValue && users[i].password === passwordValue) {
            checkedUser = users[i];
            break;
        }
    }

    if (checkedUser) {
        loginSuccess.classList.replace("d-none","d-block")
        localStorage.setItem("userslogin", JSON.stringify(checkedUser));
        setTimeout(function () {
            window.location.href = "home.html";
        }, 500);
    } else {
        loginAlartNotLog.classList.replace("d-none", "d-block");
        loginAlartrequired.classList.replace("d-block", "d-none");
     
    }
}
var currentUser = JSON.parse(localStorage.getItem("userslogin"));
if(home){

    if (textWelcome && currentUser) {
        textWelcome.innerText = "Welcome Mr " + currentUser.name;
    } else if (!currentUser) {
        
        window.location.href = "index.html";
    }
    
    var logoutBtn = document.querySelector("#logout");
    
    if (logoutBtn) {
        logoutBtn.addEventListener("click", function () {
            localStorage.removeItem("userslogin");
            window.location.href = "index.html";
        });
    }

}
if (signUp) {
    signUp.addEventListener("click", createEmail);
}
if (login) {
    login.addEventListener("click", loginEmailToUsers);
}
