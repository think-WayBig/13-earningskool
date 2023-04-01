let user_email = localStorage.getItem('User');


async function getMyCourse(){
    const userDetail = await fetch(`https://api-earningskool.vercel.app/getUser/${user_email}`);
    const userData = await userDetail.json();
    const mycourse = userData.message.myCourses;
    mycourse.forEach(async (course)=>{
        const getCourseDetails = await fetch(`https://api-earningskool.vercel.app/courseDetail/${course.course_id}`);
        const courseData = await getCourseDetails.json();
        courseData.modules.forEach(async(module)=>{
            const getModules = await fetch(`https://api-earningskool.vercel.app/modules/${module.module_id}`);
            const modulesData = await getModules.json();
                // console.log(modulesData)
            // Create the necessary DOM elements
            const li = document.createElement('li');
            const a = document.createElement('a');
            const span1 = document.createElement('span');
            const i = document.createElement('i');
            const span2 = document.createElement('span');

            // Add attributes and classes to the elements
            a.setAttribute('href', `https://www.earningskool.com/my_topics.html?id=${modulesData._id}`);
            span1.setAttribute('class', 'pcoded-micon');
            i.setAttribute('class', 'fa fa-graduation-cap');
            i.setAttribute('aria-hidden', 'true');
            span2.setAttribute('class', 'pcoded-mtext');
            span2.textContent = modulesData.title;

            // Build the DOM tree
            span1.appendChild(i);
            a.append(span1,span2);
            li.appendChild(a);

            // Add the dynamic component to the page
            let mycourselist = document.querySelector("#ul30");
            mycourselist.appendChild(li);
           
        

        
        


        // create a parent element to hold the component
        const parentEl = document.querySelector('#ContentPlaceHolder1_NestedContentPlaceHolder_documentGrid');

        // create the component element
        const componentEl = document.createElement('div');
        componentEl.className = 'col-lg-3 col-sm-6 col-xs-12';

        // create the thumbnail element
        const thumbnailEl = document.createElement('div');
        thumbnailEl.className = 'thumbnail';

        // create the thumb element
        const thumbEl = document.createElement('div');
        thumbEl.className = 'thumb';

        // create the link element for the thumbnail
        const linkEl = document.createElement('a');
        linkEl.href = `https://www.earningskool.com/my_topics.html?id=${modulesData._id}`;
        linkEl.setAttribute('data-lightbox', '8');
        linkEl.setAttribute('data-title', 'caption 8');

        // create the image element for the thumbnail
        const imgEl = document.createElement('img');
        imgEl.src = './Biz/img/marketing-mastery.png';
        imgEl.alt = '';
        imgEl.className = 'img-fluid img-thumbnail step1';

        // append the image element to the link element
        linkEl.appendChild(imgEl);

        // append the link element to the thumb element
        thumbEl.appendChild(linkEl);

        // append the thumb element to the thumbnail element
        thumbnailEl.appendChild(thumbEl);

        // create the thumbnail name element
        const thumbnailNameEl = document.createElement('div');
        thumbnailNameEl.className = 'thumbnail__name';

        // create the plan name label element
        const planNameEl = document.createElement('label');
        planNameEl.className = 'plan_name';
        planNameEl.textContent = modulesData.title;

        // append the plan name label to the thumbnail name element
        thumbnailNameEl.appendChild(planNameEl);

        // append the thumbnail name element to the thumbnail element
        thumbnailEl.appendChild(thumbnailNameEl);

        // append the thumbnail element to the component element
        componentEl.appendChild(thumbnailEl);

        // append the component element to the parent element
        parentEl.appendChild(componentEl);

    })
})
    // console.log(userData);
}

getMyCourse();