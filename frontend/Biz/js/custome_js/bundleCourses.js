var dropdown_menu = document.querySelector("#dropdown_menu");

async function getAllCourse(){
    var allcourses = await fetch('http://localhost:3000/');
    var coursesDetails = await allcourses.json();
    coursesDetails.map((course)=>{
        var list = document.createElement('li');
        var atag = document.createElement('a');
        atag.className='dropdown-toggle';
        atag.href = `CfCourseDetail.html?course=${course._id}`;
        atag.textContent = course.title;

        list.appendChild(atag);
        dropdown_menu.appendChild(list);
    })
    
}

getAllCourse();