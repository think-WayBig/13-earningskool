$(document).ready(function() {
    var page_rows = 9;

    getSubCategory($("#hdn_first_catId").val(), 1, page_rows, 0);

    $(document.body).on('click', '.cls_category', function(e) {
        var id = $(this).attr('id');
        $(".course_commimg_soon").hide();
        $(".cls_cat").removeAttr('class')
        $("#" + id).parent().attr('class', 'active cls_cat')
        getSubCategory(id, 1, page_rows, 0);
        commonCalculation();
        $("#hdn_first_catId").val(id);
        if ($(".navbar-btn").css('display') == 'flex') {
            $(".navbar-btn").click();
        }

    });
    var pagNo = 2;
    $(document.body).on('click', '.explore__btn', function(e) {
        getSubCategory($("#hdn_first_catId").val(), pagNo, page_rows, 1);
        pagNo++;

    });

    $(".nav__close").click(function() {
        $(".navbar-btn").click();
    });





    function getSubCategory(id, pageNo, pageRows, loadType) {

        $.ajax({
            type: "POST",
            url: "CourseFlix.aspx/getSubcate",
            contentType: "application/json",
            async: false,
            data: '{"sbnPlanId":"' + id + '","pageNo":"' + pageNo + '","pageRows":"' + pageRows + '"}',
            dataType: "json",
            success: function(data) {
                //$("#amount").text(data.d);
                $(".explore__btn").show();
                if (loadType == 1) {
                    if (data.d == "") {
                        $(".explore__btn").hide();
                        $(".course_commimg_soon").show();
                    } else {
                        $(".explore__btn").show();
                        $("#subcat").append(data.d);
                    }
                } else if (loadType == 0) {
                    pagNo = 2;
                    $("#subcat").html(data.d);
                }

                $("#cat_heading").text($("#" + id).text());
                //commonCalculation();
            },
            error: function(xhr, ajaxOptions, thrownError) {

                var obj = jQuery.parseJSON(xhr.responseText);
                // alert(obj.Message);
            },
            complete: function() {

            }
        });

    }



})