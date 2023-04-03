var useremail = localStorage.getItem("User");
var userReferralCode = localStorage.getItem("rcode");

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

    // Display the user's details in the dashboard

    document.querySelector("#name").textContent = data.user.name;
    document.querySelector("#welcomeUser").textContent = `Welcome ${data.user.name}`;
    document.querySelector("#email").textContent = data.user.email;
    if(data.user.total_income){
      document.querySelector("#ContentPlaceHolder1_NestedContentPlaceHolder_lbltotalearning").textContent = data.user.total_income;
      document.querySelector("#total_income").textContent = `₹${data.user.total_income}`;
    }

    

     // Display the users who have used the referral code in the dashboard
     const resp = await fetch("https://api-earningskool.vercel.app/user_leads", {
      method: "POST",
      body: JSON.stringify({ referralCode: userReferralCode }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const res = await resp.json();

    const usersList = document.querySelector("#usersList");
    res.users.forEach((user) => {
      console.log(user);
        var mainDiv = document.createElement("div");
        mainDiv.classList.add("single_user_pil", "d-flex" ,"align-items-center", "justify-content-between");
       
        var FirstChildDiv = document.createElement("div");
        FirstChildDiv.classList.add("user_pils_thumb", "d-flex", "align-items-center");
        
        var innerDiv = document.createElement("div");
        innerDiv.classList.add("thumb_34", "mr_15", "mt-0");
        
        var img = document.createElement("img");
        img.classList.add("img-fluid" ,"radius_50");
        img.setAttribute('src',user.dp);
        
        var span = document.createElement("span");
        span.classList.add("f_s_14", "f_w_400", "text_color_11");
        span.textContent=user.name;

        var SecondChildDiv = document.createElement("div");
        SecondChildDiv.classList.add("user_info");
        // SecondChildDiv.textContent= "+₹2,000";


        var span2 = document.createElement('span');
        span2.classList.add("timing");
        data.user.earnings.forEach((earnings)=>{
          console.log(earnings);
          SecondChildDiv.textContent= `+₹${earnings.commission_amount}`;
          span2.textContent=`${earnings.date}`;
        })

        var br = document.createElement("br");

        FirstChildDiv.append(innerDiv,span);
        innerDiv.append(img);
        SecondChildDiv.append(br,span2);
        mainDiv.append(FirstChildDiv,SecondChildDiv);
        usersList.append(mainDiv);
    });


  } catch (error) {
    console.error(error);
  }
}

fetchUserDetails();
