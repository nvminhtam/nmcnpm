const validateInfo = {
    rules: {
        "cardNumber": {
            required: true,
            number: true,
            maxlength: 16,
            minlength: 16,
        },
        "validMonth": {
            required: true,
            number: true,
            maxlength: 2,
        },
        "validYear": {
            required: true,
            number: true,
            maxlength: 2,
        },
        "cvv": {
            required: true,
            number: true,
            maxlength: 3,
            minlength: 3,
        },
        "nameOnCard": {
            required: true,
        },
    },
    messages: {
        "cardNumber": {
            required: "Please enter this field",
            maxlength: "Card number must be at most 16 characters long",
            minlength: "Card number must be at least 16 characters long",
            number: "Please enter only number",
        },
        "validMonth": {
            required: "Please enter this field",
            number: "Please enter only number",
            maxlength: "Only 2 charaters"
        },
        "validYear": {
            required: "Please enter this field",
            number: "Please enter only number",
            maxlength: "Only 2 charaters"
        },
        "cvv": {
            required: "Please enter this field",
            number: "Please enter only number",
            maxlength: "Only 3 charaters",
            minlength: "Only 3 charaters",
        },
        "nameOnCard": {
            required: "Please enter this field",
        },
    },
    errorPlacement: (error, element) => {
        isValid = false;
        element.css('background-color', '#ffdddd');
        error.css('color', 'red');
        error.css('margin-top', '10px');
        error.insertAfter(element);
        if (element.attr('name') == "passengerDOB") {
            error.css('width', '90%');
        }
    },
    success: function(label, element) {
        $(element).css('background-color', 'var(--mint)');
        label.parent().removeClass('error');
        label.remove();
    },
};

$('#payment-btn').click(function() {
    console.log("aaa")
    $('#payment-form').validate({
        ...validateInfo,
    });
})