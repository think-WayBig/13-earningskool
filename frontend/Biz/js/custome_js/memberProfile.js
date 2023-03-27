var useremail = localStorage.getItem("User");
var userReferralCode = localStorage.getItem("rcode");
var toast = document.getElementById("snackbar");

async function fetchUserDetails() {
  try {
    const response = await fetch("https://api-earningskool.vercel.app/affiliate", {
      method: "POST",
      body: JSON.stringify({ email: useremail, referralCode: userReferralCode }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    
    // Display the user's details in the personal information
    document.querySelector("#ContentPlaceHolder1_NestedContentPlaceHolder_txtName").value = data.user.name;
    document.querySelector("#ContentPlaceHolder1_NestedContentPlaceHolder_txtEmail").value = data.user.email;
    document.querySelector("#ContentPlaceHolder1_NestedContentPlaceHolder_txtMobileNumber").value = data.user.phone;
    if(data.user.gender.length !== 0 && data.user.dob.length !== 0 && data.user.city.length !== 0 && data.user.pincode.length !== 0 && data.user.address.length !== 0){
      document.querySelector("#ContentPlaceHolder1_NestedContentPlaceHolder_ddgen").value = data.user.gender;
      document.querySelector("#ContentPlaceHolder1_NestedContentPlaceHolder_txtdob").value = data.user.dob;
      document.querySelector("#ContentPlaceHolder1_NestedContentPlaceHolder_txtcity").value = data.user.city;
      document.querySelector("#ContentPlaceHolder1_NestedContentPlaceHolder_txtpincode").value = data.user.pincode;
      document.querySelector("#ContentPlaceHolder1_NestedContentPlaceHolder_txtAddress").value = data.user.address;
    }
    document.querySelector("#ContentPlaceHolder1_NestedContentPlaceHolder_ddlstatee").value = data.user.state;
   
    // Get the user's details from the form to update
    let gender = document.querySelector("#ContentPlaceHolder1_NestedContentPlaceHolder_ddgen");
    let dob = document.querySelector("#ContentPlaceHolder1_NestedContentPlaceHolder_txtdob");
    let state = document.querySelector("#ContentPlaceHolder1_NestedContentPlaceHolder_ddlstatee");
    let city = document.querySelector("#ContentPlaceHolder1_NestedContentPlaceHolder_txtcity");
    let pincode = document.querySelector("#ContentPlaceHolder1_NestedContentPlaceHolder_txtpincode");
    let address = document.querySelector("#ContentPlaceHolder1_NestedContentPlaceHolder_txtAddress");

    // Display the user who referred the current user
    document.querySelector("#ContentPlaceHolder1_NestedContentPlaceHolder_txtIntroducerName").value = data.referrer.name;
    document.querySelector("#ContentPlaceHolder1_NestedContentPlaceHolder_txtIntroducerMobile").value =  data.referrer.phone;

     
    // const updatedFields = {
    //     gender,dob,state,city,pincode,address
    //   };

    document.querySelector("#ContentPlaceHolder1_NestedContentPlaceHolder_btnsubmit").addEventListener("click", async function(){
       
        // Make a PUT request to the /userDetails/:email endpoint
        let response = await fetch(`https://api-earningskool.vercel.app/userDetails/${useremail}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({email: useremail,
                                  gender: gender.value,
                                  dob: dob.value,
                                  state: state.value,
                                  city: city.value,
                                  pincode: pincode.value,
                                  address: address.value}),
        });
        let data = await response.json();
        console.log(data);
        if (data.message == "success") {
            toast.innerHTML = "User details updated successfully.";
            activeToast();
        }
    })

  } catch (error) {
    console.error(error);
  }
}
function activeToast() {
    toast.className = "show";
    setTimeout(function () {
      toast.className = toast.className.replace("show", "");
    }, 3000);
  }

fetchUserDetails();
