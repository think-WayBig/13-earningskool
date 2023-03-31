var email = localStorage.getItem('User');
var listItem = document.querySelectorAll(".afterlogin");
var userlog_signup = document.querySelectorAll(".userlog");
var checkCoursePurchase = document.querySelectorAll('.checkCoursePurchase');
var become_an_affiliate = document.querySelectorAll('.become_an_affiliate');
var affiliate_applynowlink = document.querySelectorAll('.affiliate_applynowlink');

async function checkCoursePurchased(){       
    var getUserDetails =  await fetch(`https://api-earningskool.vercel.app/getUser/${email}`);
    var userData = await getUserDetails.json();
    if(userData.message.myCourses.length == 0){
        checkCoursePurchase.forEach((e)=>{
            e.style.display = 'none';
        })
        become_an_affiliate.forEach((e)=>{
            e.style.display = 'block';
        })
        affiliate_applynowlink.forEach((e)=>{
            e.setAttribute('href','./CfCourseDetail.html?course=640343dc8feaa85a3d7f9316');
        })
    }
}
checkCoursePurchased();

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

function logout() {
    localStorage.removeItem('User');
    localStorage.removeItem('rcode');
    localStorage.removeItem('isLoggedIn');
}




