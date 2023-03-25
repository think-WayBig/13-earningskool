var email = localStorage.getItem('User');
var listItem = document.querySelectorAll(".afterlogin");
var userlog_signup = document.querySelectorAll(".userlog");

if (email != null) {
    listItem.forEach((items) => {
        items.style.display = 'block';
    })
    userlog_signup.forEach(items => {
        items.style.display = 'none';
    })
}
else if (email === null) {
    listItem.forEach((items) => {
        items.style.display = 'none';
    })
    userlog_signup.forEach(items => {
        items.style.display = 'block';
    })
}

let response = await fetch("https://api-earningskool.vercel.app/getUser/" + localStorage.getItem("User"));
let res = await response.json();
console.log(res.message.dp);
localStorage.setItem("userDp", res.message.dp);

function logout() {
    localStorage.removeItem('User');
    localStorage.removeItem('rcode');
    localStorage.removeItem('isLoggedIn');
}

