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