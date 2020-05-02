
    // Retrieve and display the current date
    $('#currentDay').text(moment().format("dddd, MMMM Do YYYY"));
    // Retrieve and display the current hour (Need to refresh the page to update it)
    $('#currentHour').text(moment().format("LT"));

    var hourBlock = ['09AM','10AM','11AM','12PM','01PM','02PM','03PM','04PM','05PM'];

    var hourValue = ['9','10','11','12','13','14','15','16','17'];

    var currentHour = moment().hour();
    // var currentHour = 8;  for testing the color code

    for (var i = 0; i < hourBlock.length; i++){
        $(`.${hourBlock[i]}`).val(retrieveStorage(`${hourBlock[i]}`));
    }

    // Color code the hour block base on the current hour.
    if (hourValue.indexOf(`${currentHour}`) == -1) {
        $('input').addClass('bg-success text-white');
    }

    else{
        // current hour = red
        $(`[data-value = ${currentHour}]`).addClass('bg-danger text-white');

        // index of the current hour in the array
        var currentHourIndex = hourValue.indexOf(`${currentHour}`);

        // future hours = green
        futureHours(currentHourIndex+1, hourValue.length);

        // past hours = gray
        pastHours(currentHourIndex);
    }

    // Click to save the hourly task to the local storage
    $('.mainDiv').on('click', (event) => {
        if (event.target.tagName === 'BUTTON') {

            myInput = event.target.parentNode.previousElementSibling;

            populateStorage(event.target.value, myInput.value);
        }
    })

    /**
     *  function--------------------------------------------------------
     */

    // save the hourly task to local storage
    function populateStorage(key, value) {
        localStorage.setItem(key , value);
    }

    // retrieve data from local storage
    function retrieveStorage (key) {
        var myValue = localStorage.getItem(key);
        return myValue;
    }

    // to color the future hour block with green
    function futureHours (start, end) {
        for(var i = start; i < end; i++ ){
            $(`[data-value = ${+hourValue[i]}]`).addClass('bg-success text-white');
        }
    }

    // to color the past hour block with gray
    function pastHours (end) {
        for(var i = 0; i < end; i++ ){
            $(`[data-value = ${+hourValue[i]}]`).addClass('bg-secondary text-white');
        }
    }
