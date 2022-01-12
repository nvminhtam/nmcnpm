$.validator.prototype.checkForm = function() {
    //overriden in a specific page
    this.prepareForm();
    for (var i = 0, elements = (this.currentElements = this.elements()); elements[i]; i++) {
        if (this.findByName(elements[i].name).length !== undefined && this.findByName(elements[i].name).length > 1) {
            for (var cnt = 0; cnt < this.findByName(elements[i].name).length; cnt++) {
                this.check(this.findByName(elements[i].name)[cnt]);
            }
        } else {
            this.check(elements[i]);
        }
    }
    return this.valid();
};
$.validator.addMethod("valueNotEquals", function(value, element, arg) {
    return arg !== value;
}, "Value must not equal arg.");
const error = msg => `<div class="alert alert-danger d-flex align-items-center" role="alert">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-exclamation-triangle-fill flex-shrink-0 me-2" viewBox="0 0 16 16" role="img" aria-label="Warning:">
                            <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                        </svg>
                            <div>
                                ${msg}
                            </div>
                        </div>`
    // const success = () => `<div class="alert alert-success d-flex align-items-center" role="alert">
    //                         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-check-circle-fill flex-shrink-0 me-2" viewBox="0 0 16 16" role="img" aria-label="Success:">
    //                         <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
    //                             <div>
    //                                 Update account successfully!
    //                             </div>
    //                         </div>`
jQuery(document).ready(function($) {
    $("#dobDatePicker").datepicker({
        autoclose: true,
        endDate: "0d",
        startDate: '01/01/1923',
        defaultViewDate: {
            year: 2000
        },
    }).datepicker('update', new Date());
});
const validateInfo = {
        rules: {
            "contactLastName": {
                required: true,
            },
            "contactFirstName": {
                required: true,
            },
            "contactTelephone": {
                required: true,
                number: true,
                maxlength: 10,
            },
            "contactEmail": {
                required: true,
                email: true
            },
            "passengerLastName": {
                required: true,
            },
            "passengerFirstName": {
                required: true,
            },
            "passengerDOB": {
                required: true,
                date: true,
            },
            "passengerTitle": {
                valueNotEquals: "default"
            },
        },
        messages: {
            "contactLastName": {
                required: "Please enter a last name",
            },
            "contactFirstName": {
                required: "Please enter a first name",
            },
            "contactTelephone": {
                required: "Please enter a telephone",
                maxlength: "Telephone number must be at most 10 characters long",
                number: "Please enter only number",
            },
            "contactEmail": {
                required: "Please enter an email",
            },
            "passengerLastName": {
                required: "Please enter a last name",
            },
            "passengerFirstName": {
                required: "Please enter a first name",
            },
            "passengerDOB": {
                required: "Please enter date of birth",
            },
            "passengerTitle": {
                valueNotEquals: "Please select a title!"
            },
        },
        errorPlacement: (error, element) => {
            isValid = false;
            element.css('background-color', '#ffdddd');
            error.css('color', 'red');
            error.css('margin-top', '10px');
            error.insertAfter(element);
            console.log(element.attr('name'));
            if (element.attr('name') == "passengerDOB") {
                error.css('width', '90%');
            }
        },
        success: function(label, element) {
            $(element).css('background-color', 'var(--mint)');
            label.parent().removeClass('error');
            label.remove();
        },
    }
    // validate and submit booking detail form
$('#booking-detail-form').validate({
    ...validateInfo,
    submitHandler: function(form, event) {
        event.preventDefault();
        submitBookingDetailForm();
    }
});

function submitBookingDetailForm() {
    const contactLastName = document.getElementById('contactLastName').value;
    const contactFirstName = document.getElementById('contactFirstName').value;
    const contactTelephone = document.getElementById('contactTelephone').value;
    const contactEmail = document.getElementById('contactEmail').value;
    const passengerNumber = document.getElementById('passengerNumber').value;
    var passenger = new Array();
    for (let i = 0; i < passengerNumber; i++) {
        const index = i + 1;
        const passengerTitle = document.getElementById('passengerTitle' + index).value;
        const passengerLastName = document.getElementById('passengerLastName' + index).value;
        const passengerFirstName = document.getElementById('passengerFirstName' + index).value;
        const passengerDOB = document.getElementById('passengerDOB' + index).value;
        passenger[i] = {
            passengerTitle: passengerTitle,
            passengerLastName: passengerLastName,
            passengerFirstName: passengerFirstName,
            passengerDOB: passengerDOB,
        }
    }
    const flightId = document.getElementById('flightId').value;
    const seatClassId = document.getElementById('seatClassId').value;
    const price = document.getElementById('price').value;
    var data = {
        contactLastName: contactLastName,
        contactFirstName: contactFirstName,
        contactTelephone: contactTelephone,
        contactEmail: contactEmail,
        price: price,
        flightId: flightId,
        seatClassId: seatClassId,
        passenger: passenger,
    };
    console.log(flightId);
    $.ajax({
        contentType: "application/json",
        url: '/booking/{{flightId}}',
        dataType: "json",
        type: 'POST', // http method
        data: JSON.stringify(data), // data to submit
    }).done((res) => {
        $("#errorMessage").empty();
        console.log(res);
        window.location.href = '/payment/' + res.billId;
    }).fail((res) => {
        $("#errorMessage").empty();
        const msg = res.responseJSON.message;
        $("#errorMessage").append(error(msg));
    });
}