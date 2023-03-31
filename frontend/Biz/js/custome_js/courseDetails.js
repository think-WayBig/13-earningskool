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
          document.querySelector('#lectures').textContent = `${courseDetails.courses} Lectures`;
          document.querySelector('#totalHours').textContent = courseDetails.totalHours;
          document.querySelector('#price').textContent = `₹${courseDetails.price}`;
          document.querySelector('#totalTime').textContent = `${courseDetails.courses} lessons ${courseDetails.totalHours}`;
          document.querySelector('#detailedDescription').textContent = courseDetails.detailed_description;
          document.querySelector('#courseContent1').textContent = courseDetails.courseContent[0].heading;
          document.querySelector('#courseContent2').textContent = courseDetails.courseContent[1].heading;
          document.querySelector('#timespan1').textContent = courseDetails.courseContent[1].time;
          document.querySelector('#timespan2').textContent = courseDetails.courseContent[1].time;
          document.querySelector('#learning1').textContent = courseDetails.learnings[0].txt;
          document.querySelector('#learning2').textContent = courseDetails.learnings[1].txt;
          document.querySelector('#learning3').textContent = courseDetails.learnings[2].txt;
          document.querySelector('#learning4').textContent = courseDetails.learnings[3].txt;
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
            function listItem(heading, time){
                var list = document.createElement("li");
                var divv = document.createElement("div");
                divv.classList.add('video-sapn');
                var divv2 = document.createElement("div");
                divv2.classList.add('time-span');
                divv2.textContent = time;
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
            function expandListItem(heading, time){
                var list = document.createElement("li");
                var divv = document.createElement("div");
                divv.classList.add('video-sapn');
                var divv2 = document.createElement("div");
                divv2.classList.add('time-span');
                divv2.textContent = time;
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
                listItem(content.heading, content.time)

            });
            expandli.forEach((content)=> {
                expandListItem(content.heading, content.time)
                
            });
        }
        else {
            console.log('The array is empty or undefined.'); // or handle the error in another way
          }
        
          
          var morelearningsList = document.querySelector("#morelearnings");

          var morelearnings = courseDetails.learnings;

          if(Array.isArray(morelearnings)&& morelearnings.length>0){
            const learnings = morelearnings.slice(4);

            learnings.forEach((learnings)=>{
              var list = document.createElement('li');
              var i = document.createElement('i');
              i.className = 'fa fa-check'
              i.setAttribute('aria-hidden', 'true');
              var span = document.createElement('span');
              span.textContent = learnings.txt;

              list.append(i, span);
              morelearningsList.append(list);
            })
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