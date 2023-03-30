var useremail = localStorage.getItem("User");
var userReferralCode = localStorage.getItem("rcode");

async function fetchUserDetails() {
  try {
    const response = await fetch("https://api-earningskool.vercel.app/user_leads", {
      method: "POST",
      body: JSON.stringify({ email: useremail, referralCode: userReferralCode }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    
    // Display the details in total_affilate_list

    

     // Display the users who have used the referral code in the dashboard

    const affiliateList = document.querySelector("#affiliateList");
    data.users.forEach(async (user,index) => {
       
        var tr = document.createElement("tr");
        tr.style.color = "green";

        var td2 = document.createElement("td");
        var span1 = document.createElement("span");
        span1.textContent = index+1;

        var td3 = document.createElement("td");
        td3.textContent = user.date;

        var td4 = document.createElement("td");
        td4.textContent = user.time;

        var td5 = document.createElement("td");
        var span2 = document.createElement("span");
        span2.classList.add("lbl_Id");
        span2.textContent = user._id;

        var td6 = document.createElement("td");
        td6.textContent = user.name;

        var td7 = document.createElement("td");
        td7.textContent = user.phone;

        var td8 = document.createElement("td");
        td8.textContent = user.email;

        var td9 = document.createElement("td");
        
        user.myCourses.map(async(courses)=>{
            const fetchCourse = await fetch(`https://api-earningskool.vercel.app/courseDetail/${courses.course_id}`);
            const data = await fetchCourse.json();
            td9.textContent = data.title;
        })
        
        var td10 = document.createElement("td");
        td10.textContent = "Active";

        td2.append(span1);
        td5.append(span2);
        tr.append(td2,td3,td4,td5,td6,td7,td8,td9,td10);
        affiliateList.append(tr);
    });

  } catch (error) {
    console.error(error);
  }
}

fetchUserDetails();
