$(document).ready(function() {


    $("#dd_bank").change(function() {
        if ($(this).val() == "Other") {
            $("#txtbank_name").show();
        } else {
            $("#txtbank_name").hide();
        }

    });
    $("#btn_profile_info").click(function() {


        if ($("#dd_bank").val() == "Other") {

            $("#txtbank_name").show();

        }
        if ($("#dd_doctype").val() == "0") {
            alert("Select Document Type")
            return false;
        }
        if ($("#txtcity").val() == "") {
            alert("City Required")
            return false;
        }
        if ($("#ddlstatee").val() == "Select State") {
            alert("State Required")
            return false;
        }

        if ($("#txtaadhaarno").val() == "") {
            alert("Aadhaar Number Required")
            return false;
        }

        if ($("#txtaadhaarname").val() == "") {
            alert("Aadhaar Name Required")
            return false;
        }


        if ($('#fupaadharfront')[0].files.length === 0) {
            alert("Front image of Adhar Card is required");
            $('#fupaadharfront').focus();

            return false;
        }
        var fileExtension = ['jpeg', 'jpg', 'png'];
        if ($.inArray($('#fupaadharfront').val().split('.').pop().toLowerCase(), fileExtension) == -1) {
            alert("Only formats are allowed : " + fileExtension.join(', '));
            return false;
        }
        if ($('#fupaadharfront')[0].files[0].size / 1024) {
            var filesize = $('#fupaadharfront')[0].files[0].size / 1024
            var sizeLimit = 500;

            if (filesize >= sizeLimit) {
                alert("Max file size 500KB");
                return false;
            }
        }
        if ($('#fupaadhaarback')[0].files.length === 0) {
            alert("Back image of Adhar Card is required");
            $('#fupaadhaarback').focus();

            return false;
        }

        var fileExtension1 = ['jpeg', 'jpg', 'png'];
        if ($.inArray($('#fupaadhaarback').val().split('.').pop().toLowerCase(), fileExtension1) == -1) {
            alert("Only formats are allowed : " + fileExtension1.join(', '));
            return false;
        }
        if ($('#fupaadhaarback')[0].files[0].size / 1024) {
            var filesize = $('#fupaadhaarback')[0].files[0].size / 1024
            var sizeLimit = 500;

            if (filesize >= sizeLimit) {
                alert("Max file size 500KB");
                return false;
            }
        }

        $("#spn_profileinfo").removeAttr("class");
        $("#spn_profileinfo").addClass("fa fa-check");
        $("#dvprofileinfo").hide();
        $("#dv_acctinfo").show();

    })
    $("#btn_pancardprev").click(function() {
        $("#spn_profileinfo").removeAttr("class");
        $("#spn_profileinfo").addClass("fa fa-check");
        $("#dvprofileinfo").hide();
        $("#dv_acctinfo").show();
        $("#dv_pancard").hide();

    })
    //$("#btn_pancardprev").click(function () {
    //    $("#spn_acctnfo").removeAttr("class");
    //    $("#spn_acctnfo").addClass("fa fa-check");
    //    $("#dvprofileinfo").hide();
    //    $("#dv_acctinfo").show();
    //    $("#dv_pancard").hide();

    //})
    $("#btnacctinfo").click(function() {
        if ($("#txtifsc").val().length != "11") {
            alert("IFSC code must be 11 characters long.");
            return false;
        }


        if ($("#dd_bank").val() == "Other" && $("#txtbank_name").val() == "") {
            alert("Enter your bank name!");
            return false;
        }
        if ($("#txtaccount_name").val() == "") {
            alert("Account Holder Name Required")
            return false;
        }

        if ($("#txtaccount_number").val() == "") {
            alert("Account Number Required")
            return false;
        }

        if ($("#dd_bank").val() == "0") {
            alert("Bank Name Required")
            return false;
        }

        if ($("#txtifsc").val() == "") {
            alert("IFSC Code Required")
            return false;
        }

        if ($('#fupcancelcheque')[0].files.length === 0) {
            alert("Cancel cheque is required");
            $('#fupcancelcheque').focus();
            return false;
        }

        var fileExtension1 = ['jpeg', 'jpg', 'png', 'pdf'];
        if ($.inArray($('#fupcancelcheque').val().split('.').pop().toLowerCase(), fileExtension1) == -1) {
            alert("Only formats are allowed : " + fileExtension1.join(', '));
            return false;
        }
        if ($('#fupcancelcheque')[0].files[0].size / 1024) {
            var filesize = $('#fupcancelcheque')[0].files[0].size / 1024
            var sizeLimit = 500;

            if (filesize >= sizeLimit) {
                alert("Max file size 500KB");
                return false;
            }
        }
        $("#spn_acctnfo").removeAttr("class");
        $("#spn_acctnfo").addClass("fa fa-check");
        $("#dvprofileinfo").hide();
        $("#dv_acctinfo").hide();
        $("#dv_pancard").show();

    })

    $("#chkpdfpwd").change(function() {

        if ($('#chkpdfpwd').prop('checked')) {
            $("#dv_docspsw").show();
        } else {
            $("#dv_docspsw").hide();
        }

    })
    $("#btnprev_acctinfo").click(function() {
        $("#spn_profileinfo").removeAttr("class");
        $("#spn_profileinfo").addClass("fa fa-check");
        $("#dvprofileinfo").show();
        $("#dv_acctinfo").hide();
        $("#dv_pancard").hide();

    })

    $("#btn_pancard").click(function() {
        if ($("#txtpanno").val().length != "10") {
            alert("PAN must be 10 characters long.");
            return false;
        }

        if ($('#fuppan')[0].files.length === 0) {
            alert("PAN card  is required");
            $('#fuppan').focus();
            return false;
        }

        var fileExtension1 = ['jpeg', 'jpg', 'png'];
        if ($.inArray($('#fuppan').val().split('.').pop().toLowerCase(), fileExtension1) == -1) {
            alert("Only formats are allowed : " + fileExtension1.join(', '));
            return false;
        }
        if ($('#fuppan')[0].files[0].size / 1024) {
            var filesize = $('#fuppan')[0].files[0].size / 1024
            var sizeLimit = 500;

            if (filesize >= sizeLimit) {
                alert("Max file size 500KB");
                return false;
            }
        }
        genVal();
        // $("#btn_submit").click();

    })

    function genVal() {
        $("#dv_finish").hide();
        var email = $("#txtEmail").val();
        alert("OTP Has Been Sent To Your Registered Mobile no./Email id")
        $.ajax({
            type: "POST",
            url: "kyc.aspx/genVal",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: '{"email":"' + email + '"}',
            success: function(data) {
                //var obj = jQuery.parseJSON(data.d);
                $("#dv_otp").show();

            },
            error: function(xhr, ajaxOptions, thrownError) {
                $("#dv_finish").show();
                var obj = jQuery.parseJSON(xhr.responseText);
                alert(obj.Message);
            }
        });


    }
});