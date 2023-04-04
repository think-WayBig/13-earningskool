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
    if (data.user.total_income) {
      document.querySelector("#ContentPlaceHolder1_NestedContentPlaceHolder_lbltotalearning").textContent = data.user.total_income;
      document.querySelector("#total_income").textContent = `₹${data.user.total_income}`;
    }
    if(data.user.today_earnings){
      document.querySelector("#ContentPlaceHolder1_NestedContentPlaceHolder_lbltoday").textContent = data.user.today_earnings;
    }
    if(data.user.weekly_earnings){
      document.querySelector("#ContentPlaceHolder1_NestedContentPlaceHolder_lblweek").textContent = data.user.weekly_earnings;
    }
    if(data.user.monthly_earnings){
      document.querySelector("#ContentPlaceHolder1_NestedContentPlaceHolder_lblmonth").textContent = data.user.monthly_earnings;
    }

    // Display the users who have used the referral code in the dashboard
    const resp = await fetch("https://api-earningskool.vercel.app/user_leads", {
      method: "POST",
      body: JSON.stringify({ referralCode: userReferralCode }),
      headers: {
        "Content-Type": "application/json",
      }
    });
    const res = await resp.json();
    // console.log(res);

    const usersList = document.querySelector("#usersList");
    var userTemp = 0;
    const stateCounts = {};
    res.users.slice(0,4).forEach((user) => {
      if (user.state in stateCounts) {
        stateCounts[user.state]++;
      } else {
        stateCounts[user.state] = 1;
      }
      var mainDiv = document.createElement("div");
      mainDiv.classList.add("single_user_pil", "d-flex", "align-items-center", "justify-content-between");

      var FirstChildDiv = document.createElement("div");
      FirstChildDiv.classList.add("user_pils_thumb", "d-flex", "align-items-center");

      var innerDiv = document.createElement("div");
      innerDiv.classList.add("thumb_34", "mr_15", "mt-0");

      var img = document.createElement("img");
      img.classList.add("img-fluid", "radius_50");
      img.setAttribute('src', user.dp);

      var span = document.createElement("span");
      span.classList.add("f_s_14", "f_w_400", "text_color_11");
      span.textContent = user.name;

      var SecondChildDiv = document.createElement("div");
      SecondChildDiv.classList.add("user_info");
      // SecondChildDiv.textContent= "+₹2,000";


      var span2 = document.createElement('span');
      span2.classList.add("timing");
      var earnings = data.user.earnings[userTemp++];
      SecondChildDiv.textContent = `+₹${earnings.commission_amount}`;
      span2.textContent = `${earnings.date}`;

      var br = document.createElement("br");

      FirstChildDiv.append(innerDiv, span);
      innerDiv.append(img);
      SecondChildDiv.append(br, span2);
      mainDiv.append(FirstChildDiv, SecondChildDiv);
      usersList.append(mainDiv);
    });

    Object.keys(stateCounts).forEach((state) => {
      var state_wise_sales = document.getElementById('state_wise_sales');
      const rowDiv = document.createElement("div");
      rowDiv.classList.add("row");
    
      const colDiv = document.createElement("div");
      colDiv.classList.add("col-lg-12", "col-sm-12", "col-xs-12");
      rowDiv.appendChild(colDiv);
    
      const progressDiv = document.createElement("div");
      progressDiv.classList.add("single_progressbar");
      colDiv.appendChild(progressDiv);
    
      const titleElem = document.createElement("h6");
      titleElem.classList.add("f_s_14", "f_w_400");
      titleElem.textContent = state;
      progressDiv.appendChild(titleElem);
    
      const barDiv = document.createElement("div");
      barDiv.id = `bar-${state}`;
      barDiv.classList.add("barfiller");
      progressDiv.appendChild(barDiv);
    
      const tipWrapDiv = document.createElement("div");
      tipWrapDiv.classList.add("tipWrap");
      tipWrapDiv.style.display = "inline";
      barDiv.appendChild(tipWrapDiv);
    
      const tipElem = document.createElement("span");
      tipElem.classList.add("tip");
      tipElem.style.left = '93%';
      tipElem.style.transition = "left 2.2s ease-in-out 0s";
      tipElem.style.fontSize = "large";
      tipElem.style.fontWeight = "400";
      tipElem.textContent = stateCounts[state];
      tipWrapDiv.appendChild(tipElem);
    
      const fillElem = document.createElement("span");
      fillElem.classList.add("fill");
      fillElem.dataset.percentage = stateCounts[state];
      fillElem.style.background = "rgb(253, 60, 151)";
      fillElem.style.width = `${stateCounts[state]/100 * 20}%`;
      fillElem.style.transition = "width 2.2s ease-in-out 0s";
      barDiv.appendChild(fillElem);
    
      state_wise_sales.append(rowDiv);
    });
    
    const getAllUsers = await fetch('https://api-earningskool.vercel.app/users');
    const users = await getAllUsers.json();
    var weeklyEarnings = users.sort((a, b) => b.weekly_earnings - a.weekly_earnings);
    var monthlyEarnings = users.sort((a, b) => b.monthly_earnings - a.monthly_earnings);
    var yearlyEarnings = users.sort((a, b) => b.yearly_earnings - a.yearly_earnings);
    var totalIncome = users.sort((a, b) => b.total_income - a.total_income);
    weeklyEarnings.slice(0,5).forEach((users)=>{
      if(users.weekly_earnings>0){
        leaderboard_dynamic_component(users.dp, users.name, users.weekly_earnings, 'this_week_earnings');
      }
    });
    monthlyEarnings.slice(0,5).forEach((users)=>{
      if(users.monthly_earnings>0){
        leaderboard_dynamic_component(users.dp, users.name, users.monthly_earnings, 'this_month_earnings');
      }
    });
    yearlyEarnings.slice(0,5).forEach((users)=>{
      if(users.yearly_earnings>0){
        leaderboard_dynamic_component(users.dp, users.name, users.yearly_earnings, 'yearly_earnings');
      }
    });
    totalIncome.slice(0,5).forEach((users)=>{
      if(users.total_income > 0){
        leaderboard_dynamic_component(users.dp, users.name, users.total_income, 'totalIncome');
      }
    });

    function leaderboard_dynamic_component(user_dp, user_name , user_weekly_earnings, container_id){
      const userDiv = document.createElement('div');
      userDiv.classList.add('single_user_pil', 'd-flex', 'align-items-center', 'justify-content-between');

      // Create the user thumbnail div element
      const userThumbDiv = document.createElement('div');
      userThumbDiv.classList.add('user_pils_thumb', 'd-flex', 'align-items-center');
      userThumbDiv.style.gap='10px';
      
      // Create the image element for the user
      const image = document.createElement('img');
      image.className = 'img-radius';
      image.style.width = '34px';
      image.style.height = '34px'; 
      image.style.borderRadius = '20px'; 
      image.src = user_dp;

      // Create the user name span element
      const userNameSpan = document.createElement('span');
      userNameSpan.classList.add('f_s_14', 'f_w_400', 'text_color_11');
      userNameSpan.textContent = user_name;
      
      // Append the user name span to the user thumbnail div
      userThumbDiv.append(image, userNameSpan);

      // Create the user earnings div element
      const userEarningsDiv = document.createElement('div');
      userEarningsDiv.classList.add('user_info');
      userEarningsDiv.textContent = `₹${user_weekly_earnings}`;

      // Append the user thumbnail div and user earnings div to the outer div element
      userDiv.append(userThumbDiv,userEarningsDiv );
      document.getElementById(container_id).append(userDiv);
    }
    
  } catch (error) {
    console.error(error);
  }
}

fetchUserDetails();
