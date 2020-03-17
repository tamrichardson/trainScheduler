
// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDdfFdeMCk6ejTz1oY9SYQBxPmxpBbkzOk",
    authDomain: "denver-bootcamp-ter.firebaseapp.com",
    databaseURL: "https://denver-bootcamp-ter.firebaseio.com",
    projectId: "denver-bootcamp-ter",
    storageBucket: "denver-bootcamp-ter.appspot.com",
    messagingSenderId: "987968792145",
    appId: "1:987968792145:web:cb9d01c00cfff4a645fa70"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();

//button for adding trains
//calling the document creating an on click event listener to the add train button which then calles the anonymous function 
$(document).on("click", "#add-train-btn", function (event) {
    //this stop the forms behavior
    event.preventDefault();
    //console.log("working")

    //grabs user input
    var trainName = $("#trainName").val().trim();
    var destination = $("#destination").val().trim();
    var firstTrain = $("#firstTrain").val().trim();
    var frequency = $("#frequency").val().trim();

    //  // Creates local "temporary" object for holding train data
    var newTrain = {
        trainName: trainName,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency
    }

    // Uploads train data to the firebase database
    database.ref().push(newTrain);

    // Logs everything to console
    console.log(newTrain.trainName);
    console.log(newTrain.destination);
    console.log(newTrain.firstTrain);
    console.log(newTrain.frequency);


    // Clears all of the text-boxes
    $("#trainName").val("");
    $("#destination").val("");
    $("#firstTrain").val("");
    $("#frequency").val("");
});

//  Create Firebase event for adding train to the database and a row in the html table when a user adds an entry
database.ref().on("child_added", function
    (childSnapshot) {

    // Store everything into a variable.
    var newTr = childSnapshot.val().trainName;
    var newD = childSnapshot.val().destination;
    var newF = childSnapshot.val().firstTrain;
    var newFq = childSnapshot.val().frequency;

    // train Info
    console.log(newTr);
    console.log(newD);
    console.log(newF);
    console.log(newFq);

    // Create the new row
    var newRow = $("<tr>").append(
        $("<td>").text(newTr),
        $("<td>").text(newD),
        $("<td>").text(newF),
        $("<td>").text(newFq),
    );

    // Append the new row to the table
    $("#trainTable > tbody").append(newRow);

})