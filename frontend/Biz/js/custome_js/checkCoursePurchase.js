var checkCoursePurchase = document.querySelector('#checkCoursePurchase');
var user_email = localStorage.getItem('User');

async function checkCoursePurchase(){       
    var getUserDetails =  await fetch(`https://api-earningskool.vercel.app/getUser/${user_email}`);
    var userData = await getUserDetails.json();
    console.log(userData.message.myCourses.length);
}
checkCoursePurchase();

