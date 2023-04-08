//<reference path="../../../content/bower_components/jquery/js/jquery.min.js" />

// $(document).ready(function() {
//     let videoId = $("#hdn_videoId").val();
//     CheckRatingPer();
//     $("#tab_comment").click(function() {
//         reset();
//         getComment(videoId);
//         $("#div_comment").show();
//         $("#tab_comment").addClass('active');

//     })


//     $("#tab_faq").click(function() {
//         reset();
//         $("#div_faq").show();
//         $("#tab_faq").addClass('active');
//     })


//     $("#tab_links").click(function() {
//         reset();
//         $("#div_links").show();
//         $("#tab_links").addClass('active');
//     })


//     function reset() {

//         $("#div_comment").hide();
//         $("#div_faq").hide();
//         $("#div_links").hide();

//         $("#tab_comment").removeAttr('class');
//         $("#tab_faq").removeAttr('class');
//         $("#tab_links").removeAttr('class');

//     }

//     getComment(videoId)

//     function getComment(id) {

//         $.ajax({
//             type: "POST",
//             data: '{"videoID":"' + id + '","subType":"B"}',
//             url: "../BizPro/BizProContentDet.aspx/getComment",
//             contentType: "application/json",
//             dataType: "json",
//             beforeSend: function() {

//                 $("#dv_loader").show();
//                 $("#cmt_all").hide();
//             },
//             success: function(msg) {

//                 var obj = jQuery.parseJSON(msg.d);

//                 $(".user__cmtWrap").html(obj.htmldata);
//                 $("#total_cmt").html(obj.total_cmt + "<span>comment(s)</span>");
//                 $("#dv_loader").hide();
//                 $("#cmt_all").show();
//             },
//             error: function(xhr, ajaxOptions, thrownError) {

//                 var obj = jQuery.parseJSON(xhr.responseText);
//                 alert(obj.Message);
//             },
//             complete: function() {

//             }
//         });

//     }

//     $(document.body).on('click', '.view_reply', function(e) {

//         var cmtId = $(this).attr('data-id');
//         getSubComment(cmtId);
//         $(".user_allrply_area-" + cmtId + "").toggle();


//     });

//     function getSubComment(cmtid) {

//         $.ajax({
//             type: "POST",
//             data: '{"cmtID":"' + cmtid + '","subType":"B"}',
//             url: "../BizPro/BizProContentDet.aspx/getSubComment",
//             contentType: "application/json",
//             dataType: "json",
//             success: function(msg) {

//                 /*var obj = jQuery.parseJSON(msg.d);*/

//                 $(".user_allrply_area-" + cmtid + "").html(msg.d);
//             },
//             error: function(xhr, ajaxOptions, thrownError) {

//                 var obj = jQuery.parseJSON(xhr.responseText);
//                 alert(obj.Message);
//             },
//             complete: function() {

//             }
//         });

//     }
//     $("#postreply").click(function() {
//         var comment = $("#commenttextarea").val();
//         if (comment != "") {
//             insertComment(comment, videoId);
//         }
//     });

//     function insertComment(comment, videoid) {

//         $.ajax({
//             type: "POST",
//             data: '{"comment":"' + comment + '","videoID":"' + videoid + '","subType":"B"}',
//             url: "../BizPro/BizProContentDet.aspx/insertComment",
//             contentType: "application/json",
//             dataType: "json",
//             success: function(msg) {
//                 $("#commenttextarea").val("");
//                 $("#textcount").text("0");
//                 Swal.fire({
//                     position: 'center',
//                     icon: 'success',
//                     toast: true,
//                     title: 'Your comment has been submitted!',
//                     showConfirmButton: false,
//                     timer: 3000
//                 })
//             },
//             error: function(xhr, ajaxOptions, thrownError) {

//                 var obj = jQuery.parseJSON(xhr.responseText);
//                 alert(obj.Message);
//             },
//             complete: function() {

//             }
//         });
//     }

//     $(document.body).on('click', '.btn__reply', function(e) {

//         var cmtId = $(this).attr('data-id');
//         var comment = $("#txtsub_cmt-" + cmtId + "").val();
//         if (jQuery.trim(comment).length > 0) {
//             insertSubComment(comment, cmtId);
//             $("#txtsub_cmt-" + cmtId + "").val("");
//         }

//     });

//     function insertSubComment(comment, cmtid) {

//         $.ajax({
//             type: "POST",
//             data: '{"comment":"' + comment + '","cmtID":"' + cmtid + '"}',
//             url: "../BizPro/BizProContentDet.aspx/insertSubComment",
//             contentType: "application/json",
//             dataType: "json",
//             success: function(msg) {
//                 $("#commenttextarea").val("");
//                 $(".subcmtword_count").text("0");
//                 Swal.fire({
//                     position: 'center',
//                     icon: 'success',
//                     toast: true,
//                     title: 'Your reply has been submitted!',
//                     showConfirmButton: false,
//                     timer: 2000
//                 })
//             },
//             error: function(xhr, ajaxOptions, thrownError) {

//                 var obj = jQuery.parseJSON(xhr.responseText);
//                 alert(obj.Message);
//             },
//             complete: function() {

//             }
//         });
//     }


//     $(document.body).on('click', '.sub_reply', function(e) {

//         var cmtId = $(this).attr('data-id');
//         $(".user_rply_area-" + cmtId + "").toggle();

//     });
//     getFaq(videoId);

//     function getFaq(id) {

//         $.ajax({
//             type: "POST",
//             data: '{"videoID":"' + id + '","subType":"B"}',
//             url: "../BizPro/BizProContentDet.aspx/getFaq",
//             contentType: "application/json",
//             dataType: "json",
//             success: function(msg) {

//                 /*var obj = jQuery.parseJSON(msg.d);*/

//                 $(".faq-list").html(msg.d);

//             },
//             error: function(xhr, ajaxOptions, thrownError) {

//                 var obj = jQuery.parseJSON(xhr.responseText);
//                 alert(obj.Message);
//             },
//             complete: function() {

//             }
//         });

//     }


//     $(".rating label").click(function() {
//         var rating = parseInt($(this).attr('title').substring(0, 1));
//         $('#hdnrating').val(rating);
//         insertRating(rating);
//     });
//     $("#btnrating").click(function() {
//         getRating();
//     });

//     $(".rating label").mouseover(function() {
//         var rating = parseInt($(this).attr('title').substring(0, 1));
//         setRating(rating);
//     });
//     $(".rating label").mouseout(function() {
//         var rating = parseInt($('#hdnrating').val());
//         setRating(rating);
//     });
// });

// function setRating(rating) {
//     rating = parseInt(rating);
//     $('.rating label').each(function() {
//         var id = parseInt($(this).attr('title').substring(0, 1));
//         if (id <= rating) {
//             $(this).html('&#10029;').css('color', '#FFD600');
//         } else {
//             $(this).html('☆').css('color', '#333');;
//         }
//     });
// }

// function insertRating(rating) {
//     $.ajax({
//         type: "POST",
//         url: "my_topics.aspx/insertRating",
//         contentType: "application/json",
//         data: '{"rating":"' + rating + '"}',
//         dataType: "json",
//         success: function() {
//             setRating(rating);
//             //alert("Thanks For Your Giving Valuable Rating For This Course.");
//             //$('#exampleModalCenter').modal('hide');
//             $('.course_rat').hide();
//             $('.course_rat_thank').show();
//             var sinterval = setInterval(function() {
//                 $('#exampleModalCenter').modal('hide');
//                 clearInterval(sinterval);
//             }, 5000);

//         },
//         error: function(xhr, ajaxOptions, thrownError) {
//             var obj = jQuery.parseJSON(xhr.responseText);
//             alert(obj.Message);
//         },
//         complete: function() {}
//     });
// }

// function CheckRatingPer() {
//     var count = $("#hdnVdopercount").val();
//     $.ajax({
//         type: "POST",
//         url: "my_topics.aspx/getCheckRating",
//         contentType: "application/json",
//         data: '{"percount":"' + count + '"}',
//         dataType: "json",
//         success: function(data) {
//             var obj = data.d;
//             if (obj == "1") {
//                 $("#btnrating").show();
//             } else {
//                 $("#btnrating").hide();
//             }
//         },
//         error: function(xhr, ajaxOptions, thrownError) {
//             var obj = jQuery.parseJSON(xhr.responseText);
//             alert(obj.Message);
//         },
//         complete: function() {}
//     });
// }

// function getRating() {
//     var count = parseInt($("#hdnpercount").val());
//     var id = $("#hdnid").val();
//     $.ajax({
//         type: "POST",
//         url: "my_topics.aspx/GetRating",
//         contentType: "application/json",
//         data: '{}',
//         dataType: "json",
//         success: function(data) {
//             var obj = data.d;
//             if (obj != "") {
//                 $('#hdnrating').val(obj);
//                 setRating(obj);
//                 $('.course_rat').show();
//                 $('.course_rat_thank').hide();
//                 $('#exampleModalCenter').modal('show');
//             } else {
//                 $('#hdnrating').val(0);
//                 setRating(0);
//                 $('.course_rat').show();
//                 $('.course_rat_thank').hide();
//                 $('#exampleModalCenter').modal('show');
//             }
//         },
//         error: function(xhr, ajaxOptions, thrownError) {
//             var obj = jQuery.parseJSON(xhr.responseText);
//             alert(obj.Message);
//         },
//         complete: function() {}
//     });
// }

// $(document).ready(function() {
//     $(".total__comment").click(function() {
//         $(".user__cmtWrap").slideToggle("slow");
//     });
// });


async function getCourseDetails(id) {
  const response = await fetch(`https://api-earningskool.vercel.app/modules/${id}`);
  const data = await response.json();
  return data;
}

async function showCourseDetails() {
  const urlParams = new URLSearchParams(window.location.search);
  const course = urlParams.get('id');

  try {
    const courseDetails = await getCourseDetails(course);

    // Update the HTML with the course details
    document.querySelector('#ContentPlaceHolder1_NestedContentPlaceHolder_lblCourseTitle').textContent = courseDetails.title;
    var iframesrc = document.querySelector('#ContentPlaceHolder1_NestedContentPlaceHolder_videoFrame');
    iframesrc.setAttribute(`src`, `${courseDetails.content[0].video}`);
    document.querySelector('#ContentPlaceHolder1_NestedContentPlaceHolder_lblTitle').textContent = courseDetails.title;

    let firstVid = courseDetails.content[0].video;

    iframesrc.src = "https://www.youtube-nocookie.com/embed/" + firstVid.slice(firstVid.search('be/') + 3) + '?title=0&byline=0&portrait=0&modestbranding=1&rel=0';

    const topicListView = document.querySelector("#topicListView");
    function listItem(heading, srNo, videosrc) {
      var divv = document.createElement("div");
      divv.classList.add('video__item');

      var h3 = document.createElement("h3");
      h3.classList.add('sr__number');

      var span = document.createElement("span");
      span.textContent = `${srNo}.`;

      var img = document.createElement("img");
      img.src = './Biz/img/play-button.png';

      var divv2 = document.createElement("div");
      divv2.classList.add('detail__video');


      var atag = document.createElement("a");
      atag.classList.add("paraGraphtext", "item__name");

      atag.textContent = heading;
      atag.onclick = function () {
        iframesrc.setAttribute('src', `${videosrc}?title=0&byline=0&portrait=0&modestbranding=1&rel=0`);
      }

      h3.appendChild(span);
      divv2.append(atag);
      divv.append(h3, img, divv2);
      topicListView.append(divv);
    }

    courseDetails.content.forEach((content, index) => {
      let videoSrc = content.video;
      listItem(content.txt, index + 1, "https://www.youtube-nocookie.com/embed/" + videoSrc.slice(videoSrc.search('be/') + 3))
    });


  } catch (error) {
    console.error('Error retrieving course details:', error);
  }
}

showCourseDetails();
