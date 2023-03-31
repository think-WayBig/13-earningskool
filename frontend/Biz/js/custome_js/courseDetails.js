      async function getCourseDetails(course) {
        const response = await fetch(`https://api-earningskool.vercel.app/courseDetail/${course}`);
        const data = await response.json();
        return data;
      }
      
      async function showCourseDetails() {
        const urlParams = new URLSearchParams(window.location.search);
        const course = urlParams.get('course');
      
        try {
          const courseDetails = await getCourseDetails(course);
          
      
          // Update the HTML with the course details
          document.querySelector('#title').textContent = courseDetails.title;
          document.querySelector('#shortDescription').textContent = courseDetails.short_description;
          document.querySelector('#shortDescription').textContent = courseDetails.short_description;
          document.querySelector('#detailedDescription').textContent = courseDetails.detailed_description;
          document.querySelector('#courseContent1').textContent = courseDetails.courseContent[0].heading;
          document.querySelector('#courseContent2').textContent = courseDetails.courseContent[1].heading;
          // document.querySelector('#defaultVideo').setAttribute(`src` , `https://player.vimeo.com/video/${courseDetails.courseContent[0].videoid}?title=0&byline=0&portrait=0`)
          // document.querySelector('#video1').setAttribute(`data` , `https://player.vimeo.com/video/${courseDetails.courseContent[0].videoid}?title=0&byline=0&portrait=0`)
          // document.querySelector('#video2').setAttribute(`data` , `https://player.vimeo.com/video/${courseDetails.courseContent[1].videoid}?title=0&byline=0&portrait=0`)
        //   document.querySelector('#next3CourseContents').textContent = courseDetails.courseContent[2].heading;

        const coursecontent = courseDetails.courseContent;
        if(Array.isArray(coursecontent)&& coursecontent.length>0){
            const next3CourseContent = coursecontent.slice(2,5);
            const expandli = coursecontent.slice(5);


            const next3ListItems =  document.querySelector("#next3ListItems");
            const expandList =  document.querySelector(".expan-li");
            function listItem(heading){
                var list = document.createElement("li");
                var divv = document.createElement("div");
                divv.classList.add('video-sapn');
                var divv2 = document.createElement("div");
                divv2.classList.add('time-span');
                divv2.textContent = "08:49";
                var icon = document.createElement("i");
                icon.classList.add('fa' ,'fa-play-circle');
                var atag= document.createElement("a");
                atag.style.color="#333";
                atag.setAttribute("href","#");
                atag.textContent= heading;
                list.append(divv,divv2);
                divv.append(icon,atag);
                next3ListItems.append(list);
            }
            function expandListItem(heading){
                var list = document.createElement("li");
                var divv = document.createElement("div");
                divv.classList.add('video-sapn');
                var divv2 = document.createElement("div");
                divv2.classList.add('time-span');
                divv2.textContent = "08:49";
                var icon = document.createElement("i");
                icon.classList.add('fa' ,'fa-play-circle');
                var atag= document.createElement("a");
                atag.style.color="#333";
                atag.setAttribute("href","#");
                atag.textContent= heading;
                list.append(divv,divv2);
                divv.append(icon,atag);
                expandList.append(list);
            }

            next3CourseContent.forEach((content)=> {
                listItem(content.heading)

            });
            expandli.forEach((content)=> {
                expandListItem(content.heading)
                
            });
        }
        else {
            console.log('The array is empty or undefined.'); // or handle the error in another way
          }
        
          

         
          
          
        } catch (error) {
          console.error('Error retrieving course details:', error);
        }
      }
      
      showCourseDetails();

    //   fetch('/courseDetail/640324d42c72828f7b7eecc3')
    //   .then(response => response.json())
    //   .then(courses => {
    //     const title = document.querySelector('#title');
          
      
    //       title.textContent = courses.title;
    //   })
    //   .catch(error => {
    //     console.error(error);});