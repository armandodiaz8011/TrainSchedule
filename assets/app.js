$(document).ready(function() {

    var config = {
        apiKey: "AIzaSyB8wQO6cX7K-ZgcnJVEjlYkXW5EliKYtfg",
        authDomain: "trains-81ddf.firebaseapp.com",
        databaseURL: "https://trains-81ddf.firebaseio.com",
        projectId: "trains-81ddf",
        storageBucket: "trains-81ddf.appspot.com",
        messagingSenderId: "305487218395"
      };
      firebase.initializeApp(config);
      //var trainSchedule=firebase.database();
      var database = firebase.database();


    $("#add-train").on("click", function(event) {
        event.preventDefault();

        varname = $('#name-input').val().trim();
        destination = $('#destination-input').val().trim();
        firstTrainTime = $('#first-train-time-input').val().trim();
        frequency = $('#frequency-input').val().trim();
        firstTimeConverted = moment(firstTrainTime, "hh:mm").subtract(1, "years");
        currentTime = moment();
        diffTime = moment().diff(moment(firstTimeConverted), "minutes");
        tRemainder = diffTime % frequency;
        minutesTillTrain = frequency - tRemainder;
        nextTrain = moment().add(minutesTillTrain, "minutes");
        nextTrainFormatted = moment(nextTrain).format("hh:mm");

        //the next subsequent lines of code, i think, are not being read as intended. 
        var train = {
            name: name,
            destination: destination,
            firstTrainTime: firstTrainTime, 
            frequency: frequency,
            nextTrainFormatted: nextTrainFormatted,
            minutesTillTrain: minutesTillTrain

        };

        trainSchedule.ref().push(train);

        $('#name-input').val('');
        $('#destination-input').val('');
        $('#first-train-time-input').val('');
        $('#frequency-input').val('');
    

    trainSchedule.ref().on("child_added", function(childSnapshot) {


        $('.train-schedule').append("<tr class='table-row' id=" + "'" + childSnapshot.key() + "'" + ">" +
            "<td class='col-xs-3'>" + childSnapshot.val().name +
            "</td>" +
            "<td class='col-xs-2'>" + childSnapshot.val().destination +
            "</td>" +
            "<td class='col-xs-2'>" + childSnapshot.val().frequency +
            "</td>" +
            "<td class='col-xs-2'>" + childSnapshot.val().nextTrainFormatted + 
            "</td>" +
            "<td class='col-xs-2'>" + childSnapshot.val().minutesTillTrain + 
            "</td>" +
            "<td class='col-xs-1'>" + "<input type='submit' value='remove train' class='remove-train btn btn-primary btn-sm'>" + "</td>" +
            "</tr>");

    }, function(errorObject) {

    });  

    $("body").on("click", ".remove-train", function() {
        $(this).closest('tr').remove();
        getKey = $(this).parent().parent().attr('id');
        trainSchedule.child(getKey).remove();
    });
});
}); 
