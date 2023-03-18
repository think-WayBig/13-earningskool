//$('#basicSlider').multislider({
//    continuous: true,
//    duration: 2000
//});
//$('#mixedSlider').multislider({
//    duration: 750,
//    interval: 0
//});


var sp = 0;

$(".expand-tab button").click(function() {
    if (sp == 0) {
        $(".expand-tab button i").attr("class", "fa fa-angle-down");
        sp = 1;
    } else if (sp == 1) {
        $(".expand-tab button i").attr("class", "fa fa-angle-up");
        sp = 0;
    }
});


//$(document).mouseup(function (e) {
//    var container = $(".dropdown-menu");

//    // if the target of the click isn't the container nor a descendant of the container
//    if (!container.is(e.target) && container.has(e.target).length === 0) {
//        container.hide();
//    }
//});

var sp = 0;
$("button.exp-li-btn").click(function() {
    $("span.expan-li").toggle();
    if (sp == 0) {
        $(".expand-tab button i").attr("class", "fa fa-angle-up");
        sp = 1;
    } else if (sp == 1) {
        $(".expand-tab button i").attr("class", "fa fa-angle-down");
        sp = 0;
    }
});



function myFunction() {
    var dots = document.getElementById("dots");
    var moreText = document.getElementById("more");
    var btnText = document.getElementById("myBtn");

    if (dots.style.display === "none") {
        dots.style.display = "inline";
        btnText.innerHTML = "Read More...";
        moreText.style.display = "none";
    } else {
        dots.style.display = "none";
        btnText.innerHTML = "Read Less";
        moreText.style.display = "inline";
    }
}


function AddReadMore() {
    //This limit you can set after how much characters you want to show Read More.
    var carLmt = 350;
    // Text to show when text is collapsed
    var readMoreTxt = " ... Read More";
    // Text to show when text is expanded
    var readLessTxt = " Read Less";


    //Traverse all selectors with this class and manupulate HTML part to show Read More
    $(".addReadMore").each(function() {
        if ($(this).find(".firstSec").length)
            return;

        var allstr = $(this).text();
        if (allstr.length > carLmt) {
            var firstSet = allstr.substring(0, carLmt);
            var secdHalf = allstr.substring(carLmt, allstr.length);
            var strtoadd = firstSet + "<span class='SecSec'>" + secdHalf + "</span><span class='readMore'  title='Click to Show More'>" + readMoreTxt + "</span><span class='readLess' title='Click to Show Less'>" + readLessTxt + "</span>";
            $(this).html(strtoadd);
        }

    });
    //Read More and Read Less Click Event binding
    $(document).on("click", ".readMore,.readLess", function() {
        $(this).closest(".addReadMore").toggleClass("showlesscontent showmorecontent");
    });
}
$(function() {
    //Calling function after Page Load
    AddReadMore();
});


//$(function () {
//    $('#first').carouseller({
//        //scrollSpeed: 650,
//        //autoScrollDelay: -1800,
//        //easing: 'easeOutBounce'
//    });
//});
//$(function () {
//    $('.carouseller').carouseller({
//        //options
//    });
//});


$(document).ready(function() {

    function chkLead(plan) {
        var flag = false;
        $.ajax({
            type: "POST",
            url: "/biz/bundel_courses/AdvancedInstagram.aspx/chkLead",
            contentType: "application/json",
            data: '{"plan":"' + plan + '"}',
            dataType: "json",
            async: false,
            success: function(data) {
                if (data.d) {
                    flag = true;
                }

            },

            error: function(xhr, ajaxOptions, thrownError) {

                var obj = jQuery.parseJSON(xhr.responseText);
                alert(obj.Message);
            },
            complete: function() {

            }
        });
        return flag;
    }

    function insertLead(plan, name, mobile, email) {
        var flag = false;
        $.ajax({
            type: "POST",
            url: "/biz/bundel_courses/AdvancedInstagram.aspx/insertLead",
            contentType: "application/json",
            data: '{"plan":"' + plan + '","name":"' + name + '","mobile":"' + mobile + '","email":"' + email + '"}',
            dataType: "json",
            async: false,
            success: function(data) {
                $("#tbname").val("");
                $("#tbemail").val("");
                $("#mobile").val("");
                $("#modalLead").modal('hide');
                $(".getleadPop").hide();
            },

            error: function(xhr, ajaxOptions, thrownError) {

                var obj = jQuery.parseJSON(xhr.responseText);
                alert(obj.Message);
            },
            complete: function() {

            }
        });

    }
    $(".course-section").append('<div class="modal fade" id="myModal" role="dialog">' +
        '<div class="modal-dialog">' +

        '<div class="modal-content">' +
        '<div class="modal-header">' +
        '<button type="button" class="close" data-dismiss="modal">&times;</button>' +
        '<h4 class="modal-title">Preview</h4>' +
        '</div>' +
        '<div class="modal-body">' +
        '<iframe id="videoFrame" style=" top: 0; left: 0; bottom: 0;right: 0;width: 100%;height: 100%;border: none;" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>' +
        '</div>' +
        '<div class="modal-footer">' +
        '<button type="button" class="btn btn-default cls_class"  data-dismiss="modal">Close</button>' +
        '</div></div></div></div>');

    $(".course-section").append('<div class="modal enter__detailModal fade" id="modalLead" role="dialog">' +
        '<div class="modal-dialog">' +

        '<div class="modal-content">' +
        '<div class="modal-header">' +
        '<h4 class="modal-title">Please enter your details</h4>' +
        '</div>' +
        '<div class="modal-body">' +
        '<div><label style="display: none">Name</label><input id="tbname" style="display: none" type="text"/>' +
        '<label>Email</label><input id="tbemail" type="email"/>' +
        '<label style="display: none">Mobile</label><input style="display: none"  id="mobile" type="number"/>' +
        '</div>' +
        '</div>' +
        '<div class="modal-footer">' +
        '<button type="button" class="btn btn-danger" id="btn_leadsubmit">Submit</button>' +
        '<button type="button" class="btn btn-default cls_class" data-dismiss="modal">Close</button>' +
        '</div></div></div></div>');

    function isEmail(email) {
        var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return regex.test(email);
    }

    $(".preview-span").click(function() {
        $("#videoFrame").removeAttr("src");
        var src = $(this).attr("data");
        $("#videoFrame").attr("src", src);
        $("#myModal").modal({
            backdrop: 'static',
            keyboard: false
        });

        leadPopUp();
    });

    $(".preview-span_nolead").click(function() {
        $("#videoFrame").removeAttr("src");
        var src = $(this).attr("data");
        $("#videoFrame").attr("src", src);
        $("#myModal").modal({
            backdrop: 'static',
            keyboard: false
        });
    });

    function leadPopUp() {
        var plan = $(".heading-black").text();
        var a = chkLead(plan);
        if (!chkLead(plan)) {
            $("#modalLead").modal({
                backdrop: 'static',
                keyboard: false
            });

        } else {
            $(".getleadPop").hide();

        }
    }

    $(document).on("click", ".getleadPop", function() {
        leadPopUp();

    });

    $(document).on("click", ".cls_class", function() {
        $("#myModal").modal('hide');
        $("#modalLead").modal('hide');
    });

    $(document).on("click", "#btn_leadsubmit", function() {
        var plan = $(".heading-black").text();
        var name = $("#tbname").val();
        var email = $("#tbemail").val();
        var mobile = $("#mobile").val();
        if (email == "") {
            alert("Email is mendatory!")
            return false;
        }
        if (!isEmail(email)) {
            alert("Invalid Email Id")
            return false;
        }
        //if (mobile=="" || mobile.length< 10) {
        //    alert("Invalid Mobile no.")
        //    return false;
        //}
        insertLead(plan, name, mobile, email);
    });
    $(".start-div").hide();
});