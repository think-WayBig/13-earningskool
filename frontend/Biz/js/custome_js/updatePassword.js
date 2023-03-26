// var useremail = localStorage.getItem("User");
var toast = document.getElementById("snackbar");

let useremail = document.querySelector("#ContentPlaceHolder1_NestedContentPlaceHolder_txtName").value;
let oldPassword = document.querySelector("#ContentPlaceHolder1_NestedContentPlaceHolder_txtCurrentPassword");
let newPassword = document.querySelector("#ContentPlaceHolder1_NestedContentPlaceHolder_txtNewPassword");
let repeatNewPassword = document.querySelector("#ContentPlaceHolder1_NestedContentPlaceHolder_txtConfirmPassword");
const togglePassword = document.querySelectorAll('#toggle-password');

document.querySelector('#toggle-password-currentOnly').addEventListener('click', function() {
    const type = oldPassword.getAttribute('type') === 'password' ? 'text' : 'password';
    oldPassword.setAttribute('type', type);
    this.classList.toggle('fa-eye-slash');
  });

togglePassword.forEach((e)=>{
e.addEventListener('click', function() {
    const newPasswordType = newPassword.getAttribute('type') === 'password' ? 'text' : 'password';
    newPassword.setAttribute('type', newPasswordType);
    const type = repeatNewPassword.getAttribute('type') === 'password' ? 'text' : 'password';
    repeatNewPassword.setAttribute('type', type);
    e.classList.toggle('fa-eye-slash');
});
})

document.querySelector("#ContentPlaceHolder1_NestedContentPlaceHolder_btnSubmit").addEventListener("click", async function(){
       
    if (oldPassword.value == "") {
        oldPassword.focus();
        toast.innerHTML = "Current Password is required.";
        activeToast();
        return;
    }else if (newPassword.value == "") {
        newPassword.focus();
        toast.innerHTML = "New Password is required.";
        activeToast();
        return;
    }else if (repeatNewPassword.value == "") {
        repeatNewPassword.focus();
        toast.innerHTML = "Repeat New Password is required.";
        activeToast();
        return;
    }
    if(repeatNewPassword.value !== newPassword.value){
        toast.innerHTML = "Passwords do not match.";
        activeToast();
        return;
    }
    
    // Make a PUT request to the /userDetails/:email endpoint
    let response = await fetch(`http://localhost:3000/changePassword/${useremail}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({email: useremail,
                              oldPassword: oldPassword.value,
                              newPassword: newPassword.value,
                              repeatNewPassword: repeatNewPassword.value}),
    });
    let data = await response.json();
    console.log(data);
    if (data.message == "Invalid old password") {
        toast.innerHTML = "Invalid old password";
        activeToast();
    }
    if (data.message == "Password updated successfully") {
        toast.innerHTML = "Password updated successfully";
        activeToast();
    }
    if (data.message == "Passwords do not match") {
        toast.innerHTML = "Passwords do not match.";
        activeToast();
    }
    
})
function activeToast() {
    toast.className = "show";
    setTimeout(function () {
      toast.className = toast.className.replace("show", "");
    }, 3000);
  }