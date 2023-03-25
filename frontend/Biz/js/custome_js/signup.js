var toast = document.getElementById("snackbar");
async function getReferralCode() {
  const urlParams = new URLSearchParams(window.location.search);
  const refercode = urlParams.get('referral');
  if (!refercode) {
    return null;
  }
  const response = await fetch(`https://api-earningskool.vercel.app/${refercode}`);
  const data = await response.json();
  console.log(data.referralCode)
  console.log(data)
  if (data.message == "Invalid referral code") {
    toast.innerHTML = "Invalid referral code";
    activeToast();
  }
  return data.referralCode;
}
async function setReferralCode() {

  const rCode = await getReferralCode();

  // localStorage.setItem("UserRefferalCode",rCode);
  console.log(rCode)
  if (rCode) {
    var referredByCode = document.getElementById("referredByCode");
    referredByCode.value = rCode;
    referredByCode.setAttribute('readOnly', 'true');
  }
}

setReferralCode();

async function registration() {

  var name = document.getElementById("txtfullname").value;
  var phone = document.getElementById("txtMobileNumber").value;
  var email = document.getElementById("txtLoginId").value;
  var pass = document.getElementById("txtPassword").value;
  var confirmemail = document.getElementById("ContentPlaceHolder1_txtconfirmemail").value;
  var stateselect = document.getElementById("dd_state");
  var stateoptionnumber = (stateselect.value) - 1;
  var state = stateselect.options[stateoptionnumber].text;
  var referredByCode = document.getElementById("referredByCode").value;
  var chktandc = document.getElementById("chktandc");
  var chkrefund = document.getElementById("chkrefund");

  const referralCode = name.slice(0, 3) + phone.slice(-4);

  if (name == "") {
    document.getElementById("txtfullname").focus();
    toast.innerHTML = "Name is required";
    activeToast();
    return;
  } else if (email == "") {
    document.getElementById("txtLoginId").focus();
    toast.innerHTML = "Email is required";
    activeToast();
    return;
  } else if (confirmemail == "") {
    document.getElementById("ContentPlaceHolder1_txtconfirmemail").focus();
    toast.innerHTML = "Confirm Email is required";
    activeToast();
    return;
  } else if (confirmemail != email) {
    document.getElementById("ContentPlaceHolder1_txtconfirmemail").focus();
    toast.innerHTML = "Email do not match";
    activeToast();
    return;
  } else if (phone == "") {
    document.getElementById("txtMobileNumber").focus();
    toast.innerHTML = "Mobile Number is required";
    activeToast();
    return;
  } else if (pass == "") {
    document.getElementById("txtPassword").focus();
    toast.innerHTML = "Password is required";
    activeToast();
    return;
  } else if (state == "Select State") {
    document.getElementById("dd_state").focus();
    toast.innerHTML = "State is required";
    activeToast();
    return;
  } else if (!chktandc.checked) {
    chktandc.focus();
    toast.innerHTML = "Please agree to the terms and conditions if you want to proceed";
    activeToast();
    return;
  } else if (!chkrefund.checked) {
    chkrefund.focus();
    toast.innerHTML = "Please agree to the refund policy if you want to proceed";
    activeToast();
    return;
  }

  const response = await fetch("http://localhost:3000/register", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name, email, confirmemail, phone, pass, state, referredByCode, referralCode
    }),
  });

  let res = await response.json();

  if (res.message == "success") {
    toast.innerHTML = "Registration successful";
    // alert(`Your referral code is ${referralCode}`);
    setTimeout(function () { window.location.href = "./login.html"; }, 1000)

    activeToast();
  }
  if (res.message == "Email already exists.") {
    toast.innerHTML = "Email already exists.";
    activeToast();
  }
  if (res.message == "Phone number already exists.") {
    toast.innerHTML = "Phone number already exists.";
    activeToast();
  }
  if (res.message == "invalid") {
    toast.innerHTML = "Registration failed";
    activeToast();
  }
  console.log(res);
}
function activeToast() {
  toast.className = "show";
  setTimeout(function () {
    toast.className = toast.className.replace("show", "");
  }, 3000);
}