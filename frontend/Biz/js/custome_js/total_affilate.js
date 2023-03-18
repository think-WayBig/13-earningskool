/// <reference path="../../../../content/bower_components/jquery/js/jquery.min.js" />

$(document).ready(function() {

    $("#btntborientation").click(function() {
        var id = "#tborientation";
        try {
            $(id).select();
            //$(id).focus(); // set focus to this element first
            //copyToClipboard(document.getElementById(id));
            document.execCommand("copy");
            alert("Link copied successfully!");
        } catch (e) {
            alert('Copy operation failed');
        }
    });
    $("#btnCopy").click(function() {
        var id = "#txtRegistrationLink";
        try {
            $(id).select();
            //$(id).focus(); // set focus to this element first
            //copyToClipboard(document.getElementById(id));
            document.execCommand("copy");
            alert("Link copied successfully!");
        } catch (e) {
            alert('Copy operation failed');
        }
    });
    $("#btnCopyAce").click(function() {
        var id = "#txtAce";
        try {
            $(id).select();
            //$(id).focus(); // set focus to this element first
            //copyToClipboard(document.getElementById(id));
            document.execCommand("copy");
            alert("Link copied successfully!");
        } catch (e) {
            alert('Copy operation failed');
        }
    });

    $("#btnCopyCourseFlix").click(function() {
        var id = "#txtCourseFlix";
        try {
            $(id).select();
            //$(id).focus(); // set focus to this element first
            //copyToClipboard(document.getElementById(id));
            document.execCommand("copy");
            alert("Link copied successfully!");
        } catch (e) {
            alert('Copy operation failed');
        }
    });
    $("#btnCopyref").click(function() {
        var id = "#txtref";
        try {
            $(id).select();
            document.execCommand("copy");
            alert("Refferal code copied successfully!");
        } catch (e) {
            alert('Copy operation failed');
        }
    });

    $("#btnCopyCfDyLink").click(function() {
        var id = "#tbcfdylink";
        try {
            $(id).select();
            document.execCommand("copy");
            alert("Link copied successfully!");
        } catch (e) {
            alert('Copy operation failed');
        }
    });

    $("#btnCopyIdDyLink").click(function() {
        var id = "#tb_indem_link";
        try {
            $(id).select();
            document.execCommand("copy");
            alert("Link copied successfully!");
        } catch (e) {
            alert('Copy operation failed');
        }
    });

    $(".copy_coupon").click(function() {
        var txt = $(this).parents('tr').find(".cls_td_coupon").text();

        try {
            navigator.clipboard.writeText(txt);
            alert("Coupon copied successfully!");
        } catch (e) {
            alert('Copy operation failed');
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
                alert(obj.Message);
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
                alert(obj.Message);
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
    const response = await fetch("http://localhost:4000/affiliate", {
      method: "POST",
      body: JSON.stringify({ email: useremail, referralCode: userReferralCode }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    
    // Display the details in total_affilate_list

    document.querySelector("#txtref").value = data.user.referralCode;

     // Display the users who have used the referral code in the dashboard

    const affiliateList = document.querySelector("#affiliateList");
    data.users.forEach((user,index) => {
        var srno = 1;
        var tr = document.createElement("tr");
        tr.style.color = "green";

        var td1 = document.createElement("td");
        var button = document.createElement("button");
        button.classList.add("view_detail", "btn", "btn-info", "btn-sm");
        button.textContent = "View History";

        var td2 = document.createElement("td");
        var span1 = document.createElement("span");
        span1.textContent = index+1;

        var td3 = document.createElement("td");
        td3.textContent = user.date;

        var td4 = document.createElement("td");
        td4.textContent = user.time;

        var td5 = document.createElement("td");
        var span2 = document.createElement("span");
        span2.classList.add("lbl_Id");
        span2.textContent = user._id;

        var td6 = document.createElement("td");
        td6.textContent = user.name;

        var td7 = document.createElement("td");
        td7.textContent = user.phone;

        var td8 = document.createElement("td");
        td8.textContent = user.email;

        var td9 = document.createElement("td");
        td9.textContent = "";

        var td10 = document.createElement("td");
        td10.textContent = "Active";

        td1.append(button);
        td2.append(span1);
        td5.append(span2);
        tr.append(td1,td2,td3,td4,td5,td6,td7,td8,td9,td10);
        affiliateList.append(tr);
    });


  } catch (error) {
    console.error(error);
  }
}

fetchUserDetails();
