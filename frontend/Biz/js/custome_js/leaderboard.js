async function fetchUserDetails() {
  try {
       
    const getAllUsers = await fetch('https://api-earningskool.vercel.app/users');
    const users = await getAllUsers.json();
    var weeklyEarnings = users.sort((a, b) => b.weekly_earnings - a.weekly_earnings);
    var monthlyEarnings = users.sort((a, b) => b.monthly_earnings - a.monthly_earnings);
    var yearlyEarnings = users.sort((a, b) => b.yearly_earnings - a.yearly_earnings);
    var totalIncome = users.sort((a, b) => b.total_income - a.total_income);
    weeklyEarnings.forEach((users)=>{
      if(users.weekly_earnings>0){
        leaderboard_dynamic_component(users.dp, users.name, users.weekly_earnings, 'this_week_earnings');
      }
    });
    monthlyEarnings.forEach((users)=>{
      if(users.monthly_earnings>0){
        leaderboard_dynamic_component(users.dp, users.name, users.monthly_earnings, 'this_month_earnings');
      }
    });
    yearlyEarnings.forEach((users)=>{
      if(users.yearly_earnings>0){
        leaderboard_dynamic_component(users.dp, users.name, users.yearly_earnings, 'yearlyEarnings');
      }
    });
    totalIncome.forEach((users)=>{
      if(users.total_income > 0){
        leaderboard_dynamic_component(users.dp, users.name, users.total_income, 'totalIncome');
      }
    });

    function leaderboard_dynamic_component(user_dp, user_name , user_weekly_earnings, container_id){
      const tr = document.createElement('tr');

      const td_1 = document.createElement('td');
      const td_2 = document.createElement('td');
      td_2.setAttribute('valign', 'middle');
      const td_3 = document.createElement('td');
      td_3.style.width = '20%';
      
      const image = document.createElement('img');
      image.className = 'img-radius';
      image.style.width = '34px';
      image.style.height = '34px'; 
      image.style.borderRadius = '20px'; 
      image.src = user_dp;

      const userNameSpan = document.createElement('span');
      userNameSpan.classList.add('lbl_Name');
      userNameSpan.style.textAlign='center';
      userNameSpan.textContent = user_name;

      const userEarningsSpan = document.createElement('span');
      userEarningsSpan.classList.add('lbl_Email');
      userEarningsSpan.textContent = `₹${user_weekly_earnings}`;

      td_1.append(image);
      td_2.append(userNameSpan);
      td_3.append(userEarningsSpan);
      tr.append(td_1,td_2,td_3 );
      document.getElementById(container_id).append(tr);
    }
    
  } catch (error) {
    console.error(error);
  }
}

fetchUserDetails();
