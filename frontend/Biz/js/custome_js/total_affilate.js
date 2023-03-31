$(document).ready(function() {

    $("#btntborientation").click(function() {
        var id = "#tborientation";
        try {
            $(id).select();
            //$(id).focus(); // set focus to this element first
            //copyToClipboard(document.getElementById(id));
            document.execCommand("copy");
            // alert("Link copied successfully!");
        } catch (e) {
            // alert('Copy operation failed');
        }
    });
    $("#btnCopy").click(function() {
        var id = "#txtRegistrationLink";
        try {
            $(id).select();
            //$(id).focus(); // set focus to this element first
            //copyToClipboard(document.getElementById(id));
            document.execCommand("copy");
            // alert("Link copied successfully!");
        } catch (e) {
            // alert('Copy operation failed');
        }
    });
    $("#btnCopyAce").click(function() {
        var id = "#txtAce";
        try {
            $(id).select();
            //$(id).focus(); // set focus to this element first
            //copyToClipboard(document.getElementById(id));
            document.execCommand("copy");
            // alert("Link copied successfully!");
        } catch (e) {
            // alert('Copy operation failed');
        }
    });

    $("#btnCopyCourseFlix").click(function() {
        var id = "#txtCourseFlix";
        try {
            $(id).select();
            //$(id).focus(); // set focus to this element first
            //copyToClipboard(document.getElementById(id));
            document.execCommand("copy");
            // alert("Link copied successfully!");
        } catch (e) {
            // alert('Copy operation failed');
        }
    });
    $("#btnCopyref").click(function() {
        var id = "#txtref";
        try {
            $(id).select();
            document.execCommand("copy");
            // alert("Refferal code copied successfully!");
        } catch (e) {
            // alert('Copy operation failed');
        }
    });

    $("#btnCopyCfDyLink").click(function() {
        var id = "#tbcfdylink";
        try {
            $(id).select();
            document.execCommand("copy");
            // alert("Link copied successfully!");
        } catch (e) {
            // alert('Copy operation failed');
        }
    });

    $("#btnCopyIdDyLink").click(function() {
        var id = "#tb_indem_link";
        try {
            $(id).select();
            document.execCommand("copy");
            // alert("Link copied successfully!");
        } catch (e) {
            // alert('Copy operation failed');
        }
    });

    $(".copy_coupon").click(function() {
        var txt = $(this).parents('tr').find(".cls_td_coupon").text();

        try {
            navigator.clipboard.writeText(txt);
            // alert("Coupon copied successfully!");
        } catch (e) {
            // alert('Copy operation failed');
        }
    });
    let coupon_id;
    $(".trans_coupon").click(function() {
        var coupon = $(this).parents('tr').find(".cls_td_coupon").text();
        coupon_id = $(this).attr("data");
        $("#hdn_coupon_id").val(coupon_id);
        $.ajax({
            type: "POST",
            url: "total_affiliate_list.aspx/getTransferCouponData",
            contentType: "application/json",
            data: '{"coupon_id":"' + coupon_id + '"}',
            dataType: "json",

            success: function(data) {
                /*var obj = jQuery.parseJSON(data.d);*/

                $("#coupon_modal_heading").text("(" + coupon + ")");
                $("#lbl_avail_qty").text(data.d)
                $("#hdn_qty").val(data.d)

                $("#modalcoupon").modal({
                    backdrop: 'static',
                    keyboard: false
                });


            },

            error: function(xhr, ajaxOptions, thrownError) {

                var obj = jQuery.parseJSON(xhr.responseText);
                // alert(obj.Message);
            },

            complete: function() {}


        });

    })

    $(document.body).on('click', '.view_detail', function(e) {
        $(this).text("Please wait..")
        var affilateId = $(this).attr('id');
        $.ajax({
            type: "POST",
            url: "total_affiliate_list.aspx/getUserHistory",
            contentType: "application/json",
            data: '{"affilateId":"' + affilateId + '"}',
            dataType: "json",

            success: function(data) {
                var obj = jQuery.parseJSON(data.d);

                $("#table_tbody").html(obj.listOption)
                $("#commDetModal").modal({
                    backdrop: 'static',
                    keyboard: false
                });


            },

            error: function(xhr, ajaxOptions, thrownError) {

                var obj = jQuery.parseJSON(xhr.responseText);
                // alert(obj.Message);
            },

            complete: function() {}


        });
    });

    $(".cls_close").click(function() {

        $(".view_detail").text("View History");

    })
});

var useremail = localStorage.getItem("User");
var userReferralCode = localStorage.getItem("rcode");

async function fetchUserDetails() {
  try {
    const response = await fetch("https://api-earningskool.vercel.app/affiliate", {
      method: "POST",
      body: JSON.stringify({ email: useremail, referralCode: userReferralCode }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    
    document.querySelector("#txtref").value = `https://www.earningskool.com/signup.html?referral=${data.user.referralCode}`;

  } catch (error) {
    console.error(error);
  }
}

fetchUserDetails();
