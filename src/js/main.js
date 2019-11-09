(function($) {
    "use strict";


    /*==================================================================
    [ Validate ]*/
    var input = $('.validate-input .input100');

    $('.validate-form').on('submit', function(e) {
        var check = true;

        for (var i = 0; i < input.length; i++) {
            if (validate(input[i]) == false) {
                showValidate(input[i]);
                check = false;
                check;
                e.preventDefault();
            }
        };

        if (check !== false) {
            e.preventDefault();
            location.assign("https://script.google.com/macros/s/AKfycbzyOqMSpoJUdZkYEGokbVKzVM3PHDN-IbrcXbjF-vbcDWIB_Nk/exec");
        }

        return check;
    });


    $('.validate-form .input100').each(function() {
        $(this).focus(function() {
            hideValidate(this);
        });
    });

    function validate(input) {
        if ($(input).attr('name') == 'user') {
            if ($(input).val().trim().match(/^MICHELOB/) == null) {
                return false;
            }
        } else {
            if ($(input).attr('name') == 'pass') {
                if ($(input).val().trim().match(/^123456/) == null) {
                    return false;
                }
            }
        }
    }

    function showValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).removeClass('alert-validate');
    }



})(jQuery);