function commonCalculation() {
    $(".add_to_cart").text("Add To Cart");

    var total = 0;
    var arrConCatId = new Array();
    $('#tbl_cart tr').each(function () {
        var currentRow = $(this).closest("tr");
        var id = currentRow.find(".cls_remove").attr('data');
        $("#btn_" + id + "").text("Added To Cart")
        if ($("#btn_" + id + "").text() == "Added To Cart") {
            $("#btn_buynow").hide();
            $(".become_contact_center").hide();
            $("#btn_" + id + "").hide();

        }

        arrConCatId.push(id);
        total = total + Number(currentRow.find(".cls_amt").text());
        if (total < 1) {
            total = 0;
        }


    });

    /* if (arrConCatId.length>0) {*/


    $.ajax({
        type: "POST",
        url: "/biz/subscription/CourseFlix.aspx/addItemsToCart",
        contentType: "application/json",
        data: JSON.stringify({
            arrConCatId: arrConCatId
        }),
        dataType: "json",
        success: function (data) {

        },
        error: function (xhr, ajaxOptions, thrownError) {

            var obj = jQuery.parseJSON(xhr.responseText);
        },

        complete: function () { }


    });
    /* }*/
    if ($('#tbl_cart tr').length > 0) {
        $("#btn_cart").show();
        $(".spn_batch").show();
        $("#btn_cart").html("  " + "<span class='spn_batch'>  " + $('#tbl_cart tr').length + "</span><img src='./Biz/img/bag.png'/>");

    } else {
        $(".spn_batch").hide();
    }
    $("#cart_total").text("₹" + total);


}
$(document).ready(function () {

    getCart();

    function getCart() {
        $.ajax({
            type: "POST",
            url: "./Biz/Subscription/CourseFlix.aspx/getCart",
            contentType: "application/json",

            data: '{}',
            dataType: "json",

            success: function (data) {
                if (data.d != "") {
                    $("#tbl_cart").html(data.d)
                    commonCalculation();
                }


            },

            error: function (xhr, ajaxOptions, thrownError) {

                var obj = jQuery.parseJSON(xhr.responseText);
            },
            complete: function () {



            }
        });

    }

    $(".btn_submit_cart").click(function () {
        var arrConCatId = new Array();
        $('#tbl_cart tr').each(function () {
            var currentRow = $(this).closest("tr");
            var id = currentRow.find(".cls_remove").attr('data');
            arrConCatId.push(id);



        });
        var isRef = 0;
        /*  var refId = $("#hdn_ref_id").val()*/
        var refId = "cbcDJ7DVHoQ=";
        $.ajax({
            type: "POST",
            url: "/Biz/Subscription/CourseFlix.aspx/submit",
            contentType: "application/json",
            data: JSON.stringify({
                arrConCatId: arrConCatId,
                isRef: isRef
            }),
            dataType: "json",
            success: function (data) {
                if (data.d == "0") {
                    window.location = "/biz/subscription/BuyPlan?ref_id=" + refId + "";
                } else if (data.d == "1") {
                    window.location = "./Biz/PaymentGateway?ref_id=" + refId + "";
                }

            },
            error: function (xhr, ajaxOptions, thrownError) {

                var obj = jQuery.parseJSON(xhr.responseText);
            },
            complete: function () {

            }
        });

    })
    $(document.body).on('click', '.cls_remove', function (e) {
        var currentRow = $(this).closest("tr");
        var id = $(this).attr('data');
        currentRow.closest('tr').remove();
        commonCalculation();
    });

    $("#btn_cart").click(function () {
        getCart();
        $("#DetModal").modal({
            backdrop: 'static',
            keyboard: false
        });

    })


    $(document.body).on('click', '.add_to_cart', function (e) {

        var id = $(this).attr('data');
        var amount = $(this).attr('cost');
        var title = $(this).attr('title');
        var img = $(this).parent().parent().find('img').attr('src');
        var btnText = $(this).text();


        if (btnText == "Add To Cart") {

            $("#tbl_cart").append("<tr class='cls_sbnid' id=cls_cart_" + id + " data=" + id + "><td class=cls_img><img  src=" + img + "></td><td>" + title + "</td><td class='cls_amt'>" + amount + "</td><td>1</td><td class='cls_remove'  data=" + id + "><a href = 'javascript:void(0)'><i class='fa fa-window-close' aria-hidden='true'></i></a></td></tr>")
        } else {

            var currentRow = $("#cls_cart_" + id + "").closest("tr");
            currentRow.closest('tr').remove();

        }
        commonCalculation();

    });
})