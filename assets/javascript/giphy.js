var topics = ["cats", "capybaras", "puppies", "owls"];
// var animal = $("#animal-input").val().trim();

var myButtons = {};
// var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
//        animals + "&api_key=ytsM60erBMxf97CK2CKqPyQHHQyk3EFC=10";
//the =10 limits results to 10
//display the array buttons
//loop over array to create buttons?
function displayButtons() {
    for (var i = 0; i < topics.length; i++) {
        myButtons[topics[i]] = topics;
        $("#addGif").on("click", function(event) {
            event.preventDefault();
        })
    }
}
// var all_short_btns = $("#buttons");
// $.each(all_short_buttons, function(i, item) {
//     alert(item.html());
// });

// $('#data-animal').dialog({
//     autoOpen: false,
//     width: 'auto',
//     buttons: myButtons


// });

function renderButtons() {

    $("#gif-Buttons").empty();

    for (var i = 0; i < topics.length; i++) {
        var a = $("<button>");
        a.addClass("animal");
        a.attr("data-animal", topics[i]);

        a.text(topics[i]);
        $("#gif-Buttons").append(a);

    }
}

$("#addGif").on("click", function(event) {
    event.preventDefault();
    // This line of code will grab the input from the textbox
    var animal = $("#topics-input").val().trim();


    // The animal from the textbox is then added to our array
    topics.push(animal);
    // $(document).on("click", ".animal");

    // Calling renderButtons which handles the processing of our animal array
    renderButtons();
});

// Adding click event listeners to all elements with a class of "animal"
// $(document).on("click", ".animal", displayGifs);

// Calling the renderButtons function to display the intial buttons
renderButtons();



// function displayGifs() {
$("#gif-Buttons").on("click", "button.animal", function() {
    var animal = $(this).attr("data-animal");

    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=ytsM60erBMxf97CK2CKqPyQHHQyk3EFC&q=" + animal + "&limit=10&offset=0&rating=PG-13&lang=en";

    $.ajax({
            url: queryURL,
            method: "GET"
        })
        .done(function(response) {
            // console.log(queryURL);
            console.log(response);

            var imageUrl = response.data.image_original_url;

            var results = response.data;

            for (var i = 0; i < results.length; i++) {

                var animalDiv = $("<div>");
                // animalDiv.addClass("gifDiv");


                var gifRating = $("<p>").text("Rating: " + results[i].rating);
                $("#gifs-appear-here").append(gifRating);

                var gifImage = $("<img>");
                gifImage.attr("src", results[i].images.fixed_height.url);
                // // gifImage.attr("data-still",results[i].images.fixed_height_still.url);
                // gifImage.attr("data-animate",results[i].images.fixed_height.url);
                // gifImage.attr("data-state", "still");
                animalDiv.append(gifRating);
                animalDiv.append(gifImage);

                $("#gifs-appear-here").prepend(animalDiv);
            }

            //calling functions
            displayButtons();
            renderButtons();

        })

})
//makes the gifs start and stop with a click

$("gifImage").on("click", function() {

    var state = $(this).attr("data-state");
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});