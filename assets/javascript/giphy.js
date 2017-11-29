var topics = ["cats", "capybaras", "puppies", "owls"];
// var animal = $("#animal-input").val().trim();

var myButtons = {};

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

//button creator 
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

    topics.push(animal);

    // Calling renderButtons which handles the processing of the animal array
    renderButtons();
});


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


                var gifRating = $("<p>").text("Rating: " + results[i].rating);
                $("#gifs-appear-here").append(gifRating);

                var gifImage = $("<img>");
                gifImage.attr("src", results[i].images.fixed_height.url);
                //tried setting the gifImage.attr to still at the end but would not animate when clicked
                // gifImage.attr("src", results[i].images.fixed_height_still.url);
                animalDiv.append(gifRating);
                animalDiv.append(gifImage);

                $("#gifs-appear-here").prepend(animalDiv);
            }

            //calling functions
            displayButtons();
            renderButtons();
            

        })


//makes the gifs start and stop with a click?
//could not get this part to work:(

$("#gif-Buttons").on("click", function() {
	
    var state = $(this).attr("data-state");
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");

    }
});

})