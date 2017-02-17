$('#birthday').bootstrapBirthday({
    widget: {
        dateFormat: 'littleEndian',

        wrapper: {
            tag: 'div',
            class: 'row'
        },
        wrapperYear: {
            use: true,
            tag: 'div',
            class: 'col-sm-4'
        },
        wrapperMonth: {
            use: true,
            tag: 'div',
            class: 'col-sm-4'
        },
        wrapperDay: {
            use: true,
            tag: 'div',
            class: 'col-sm-4'
        },

        selectYear: {
            name: 'birthday[year]',
            class: 'form-control'
        },
        selectMonth: {
            name: 'birthday[month]',
            class: 'form-control'
        },
        selectDay: {
            name: 'birthday[day]',
            class: 'form-control'
        }
    }
});

$('#submit').click(function(event)
{
    if($('#name').val().length == 0) {
        $('#name').addClass('error');
        event.preventDefault();
    }
    else
    {
        $('#name').removeClass('error');
    }

    if($('[name="birthday[year]"]').val() == 0) {
        $('[name="birthday[year]"]').addClass('error');
        event.preventDefault();
    }
    else
    {
        $('[name="birthday[year]"]').removeClass('error');
    }

    if($('[name="birthday[month]"]').val() == 0) {
        $('[name="birthday[month]"]').addClass('error');
        event.preventDefault();
    }
    else
    {
        $('[name="birthday[month]"]').removeClass('error');
    }

    if($('[name="birthday[day]"]').val() == 0) {
        $('[name="birthday[day]"]').addClass('error');
        event.preventDefault();
    }
    else
    {
        $('[name="birthday[day]"]').removeClass('error');
    }});
