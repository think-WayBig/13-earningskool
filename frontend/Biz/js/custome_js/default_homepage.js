//<reference path="../../../content/bower_components/jquery/js/jquery.min.js" />

var count = 0;
var ddIntr = "";
var _name = $("#pp_name").val(),
    _mobile = $("#pp_mobile").val(),
    _email = "",
    _type = "HP",
    _fromWhere = "",
    _callRegarding = ""
var isLeadpopShow = $.cookie("LeadPop");

if (localStorage.getItem("hm_flag") != "1") {
    setTimeout(function() {
        $("#about_bizgurukul").show()
    }, 5000);

}
$(".close").click(function() {

    $("#about_bizgurukul").hide();

})
$(".from_where").click(function() {

    _fromWhere = $(this).attr('value');
    if (_fromWhere != "" && _callRegarding != "") {
        $("#nextBtn").show();
    }


})

//if (isLeadpopShow == null) {

//    //setTimeout(function () {
//    //    $("#capUserLead").modal();
//    //}, 5000);

//}

$(".chatboat2").click(function() {
    $("#dv_tbleaduser_detail").show();
    $("#dv_tbleadotp").hide();
    $("#btn_checkLead").text("Next");
    $("#otplabel_error").hide();
    $("#capUserLead").modal();
    $(".req_thankyou").hide();
    $("#tbusercap_mobile").val("");
    $("#dd_intrest").val("-1");

})
$(".call_reg").click(function() {

    _callRegarding = $(this).attr('value');
    if (_fromWhere != "" && _callRegarding != "") {
        $("#nextBtn").show();
    }


})
$("#nextBtn").click(function() {

    count++

    _mobile = $("#pp_mobile").val();
    _otp = $("#pp_otp").val();
    if (_mobile == "" || _mobile.length < 10) {
        // alert("Invalid Mobile no.!");
        count = 0;
        return false;

    }
    if (count == 1) {
        $(".tab").hide();
        genrateOTP(_mobile);
        showTab(count);
    } else if (count == 2) {

        if (validateOTP(_otp)) {
            $(".tab").hide();
            showTab(count);
        } else {
            // alert("Invalid OTP!")
            count = 1;
            return false;
        }

    } else if (count < 4 && count != 2) {
        _name = $("#pp_name").val();
        if (_name == "") {
            // alert("Name is required!")
            count = 2;
            return false;
        }
        $(".tab").hide();
        showTab(count);
    } else if (count >= 4) {
        if (_fromWhere != "" && _callRegarding != "") {
            $(".tab").hide();

            _type = "HP";
            insertLeadPopData(_name, _mobile, _email, _type, _fromWhere, _callRegarding);

            setTimeout(function() {
                $("#about_bizgurukul").hide()
            }, 4000);
            localStorage.setItem("hm_flag", "1")
            showTab(4);

        } else {
            // alert("Please select from the provided option!")
            return false;
        }


    }


});

function genrateOTP(mobileNo) {

    $.ajax({
        type: "POST",
        url: "/Default.aspx/genrateOTP",
        contentType: "application/json",
        data: '{"mobileNo":"' + mobileNo + '"}',
        dataType: "json",
        success: function(data) {
            // /*  alert("ok");*/
        },
        error: function(xhr, ajaxOptions, thrownError) {

            var obj = jQuery.parseJSON(xhr.responseText);
            // alert(obj.Message);
        },

        complete: function() {

        }


    });

}

function validateOTP(otp) {
    var val = false;
    $.ajax({
        type: "POST",
        url: "/Default.aspx/ValidateOTP",
        contentType: "application/json",
        data: '{"userOTP":"' + otp + '"}',
        dataType: "json",
        async: false,
        success: function(data) {
            if (data.d == "1") {
                val = true;
            }
        },
        error: function(xhr, ajaxOptions, thrownError) {

            var obj = jQuery.parseJSON(xhr.responseText);
            // alert(obj.Message);
        },

        complete: function() {}


    });
    return val;

}
$("#btn_submit").click(function() {
    var name = $("#tb_name").val();
    var mobile = $("#tb_mobile").val();
    var email = $("#tb_email").val();
    if (mobile.length < 10 || mobile.length > 10) {
        // alert("Invalid Mobile No.!")
        return false;
    }
    var btnText = $(this).text();
    if (btnText == "Get OTP") {
        genrateOTP(mobile);
        $("#user_detail").hide();
        $("#otp_verification").show();
        $("#btn_submit").text("Submit");

    } else {
        var otp = $("#tbotp").val();
        if (validateOTP(otp)) {
            insertLeadPopData(name, mobile, email, 'SS', 'NA', 'NA');
            $("#div_btn").hide();
            $("#otp_verification").hide();
            $("#div_thanku").show();

        }

    }


})

$("#btn_checkLead").click(function() {
    ddIntr = $("#dd_intrest option:selected").val();
    if (ddIntr == "-1") {
        $("#lblmsg").show();
        return false;
    } else {
        $("#lblmsg").hide();
    }
    var name = "na";
    var mobile = $("#tbusercap_mobile").val();
    var email = $("#tbusercap_Email").val();
    if (mobile.length < 10 || mobile.length > 10) {
        $("#lblmsgmobile").show();
        return false;
    }
    var btnText = $(this).text();

    if (btnText == "OK") {
        $("#capUserLead").modal('hide');

    }

    if (btnText != "OK") {
        if (ddIntr == "0") {
            $("#dv_tbleaduser_detail").hide();
            $(".req_thankyou").show();
            $("#btn_checkLead").text("OK");
        }
        insertLeadPopData(name, mobile, email, 'RUL', $("#dd_intrest option:selected").text(), 'Reg-UnReg Lead');

    }





    /* if (btnText == "Verify") {*/
    /*  genrateOTP(mobile);*/
    /*  $("#dv_tbleaduser_detail").hide();*/
    /* $("#dv_tbleadotp").show();*/
    /*  $("#btn_checkLead").text("Submit");*/

    //}
    //else {
    //    var otp = $("#tbleadotp").val();
    //    if (validateOTP(otp)) {
    /*        insertLeadPopData(name, mobile, email, 'RUL', 'NA', 'Reg-UnReg Lead');*/
    /*    $("#capUserLead").modal('hide');*/

    //}
    //else {
    //    $("#otplabel_error").show();
    //}

    //}
})

function insertLeadPopData(name, mobile, email, type, fromWhere, callRegarding, userOTP) {

    $.ajax({
        type: "POST",
        url: "/Default.aspx/insertLeadPopData",
        contentType: "application/json",
        data: '{"name":"' + name + '","mobile":"' + mobile + '","email":"' + email + '","type":"' + type + '","fromWhere":"' + fromWhere + '","callRegarding":"' + callRegarding + '","userOTP":"' + userOTP + '"}',
        dataType: "json",
        success: function(data) {

            if (type == "RUL" && ddIntr != "0") {
                window.location = ddIntr;

            }

        },
        error: function(xhr, ajaxOptions, thrownError) {

            var obj = jQuery.parseJSON(xhr.responseText);
            // alert(obj.Message);
        },

        complete: function() {}


    });
}


