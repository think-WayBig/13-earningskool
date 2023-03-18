$(document).ready(function() {
    appendSlider();
    try {


        $(".gallery").magnificPopup({
            delegate: "a",
            type: "image",
            tLoading: "Loading image #%curr%...",
            mainClass: "mfp-img-mobile",
            gallery: {
                enabled: true,
                navigateByImgClick: true,
                preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
            },
            image: {
                tError: '<a href="%url%">The image #%curr%</a> could not be loaded.'
            }
        });
    } catch (e) {

    }

    /* Gallery Slider */
    "use strict";
    $('#customers-testimonials-in').owlCarousel({
        autoplayHoverPause: true,
        loop: true,
        center: false,
        items: 4,
        margin: 30,
        autoplay: true,
        dots: true,
        nav: true,
        autoplayTimeout: 2000,
        smartSpeed: 1800,
        navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
        responsive: {
            0: {
                items: 1
            },
            768: {
                items: 3
            },
            1170: {
                items: 4
            }
        }
    });

    /* Gallery Slider */

    /*   Gallery Slider HTML Start*/
    function appendSlider() {

        $("#appndSldr").append("<section class= 'testimonials-in'> " +
            "<div id = 'customers-testimonials-in' class= 'owl-carousel owl-carousel-in'> " +
            "<div class= 'item'> " +
            "<div class= 'shadow-effect-in'> " +
            "<a href = '#'> <img class='img-responsive' src='./Biz/gallery/img/achievements/achievements1.jpg' alt=''></a>" +
            "<div class= 'item-details'> " +
            "<a href = '/biz/gallery/AchievementsGallery'> <h5>View More &nbsp;<i class='fa fa-eye' aria-hidden='true'></i></h5></a> " +
            "</div> " +
            "<h2> Achievements</h2> " +
            "</div> " +
            "</div> " +

            "<div class= 'item'> " +
            "<div class= 'shadow-effect-in'> " +
            "<a href = '#'> <img class='img-responsive' src='./Biz/gallery/img/bbm/BBM1.jpg' alt=''></a>" +
            "<div class= 'item-details'> " +
            "<a href = '/biz/gallery/BbmGallery'> <h5>View More &nbsp;<i class='fa fa-eye' aria-hidden='true'></i></h5></a> " +
            "</div> " +
            "<h2> BBM</h2> " +
            "</div> " +
            "</div> " +

            "<div class= 'item'> " +
            "<div class= 'shadow-effect-in'> " +
            "<a href = '#'> <img class='img-responsive' src='./Biz/gallery/img/culture/CULTURE1.jpg' alt=''></a>" +
            "<div class= 'item-details'> " +
            "<a href = '/biz/gallery/CultureGallery'> <h5>View More &nbsp;<i class='fa fa-eye' aria-hidden='true'></i></h5></a> " +
            "</div> " +
            "<h2> Culture</h2> " +
            "</div> " +
            "</div> " +

            "<div class= 'item'> " +
            "<div class= 'shadow-effect-in'> " +
            "<a href = '#'> <img class='img-responsive' src='./Biz/gallery/img/event/event1.jpg' alt=''></a>" +
            "<div class= 'item-details'> " +
            "<a href = '/biz/gallery/EventGallery'> <h5>View More &nbsp;<i class='fa fa-eye' aria-hidden='true'></i></h5></a> " +
            "</div> " +
            "<h2> Event</h2> " +
            "</div> " +
            "</div> " +


            "</div>" +
            "</section>");



    }
    /*   Gallery Slider HTML End*/
});