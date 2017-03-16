// array to hold comic book characters
var topics = ["Batman", "Wonder Woman", "Aquaman", "Spiderman", "Superman"];


// displays gifs when particular button clicked
// $("button").on("click", function() {
function getComicGif() {
	// empty "showComics" div so page clears gifs each time
	$("#showComics").empty();

	// grabbing and storing data-name property value from button
	var comic = $(this).attr("data-name");

	// constructing queryURL using comic book character name
	var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + comic + "&api_key=dc6zaTOxFJmzC&limit=10";

	// performing an AJAX request with queryURL
	$.ajax({
		url: queryURL,
		method: "GET"
	})
	// after data comes back from the request
	.done(function(response) {
		// storing data from AJAX request in the results variable
		console.log(response);

		var results = response.data;

		// remove previously clicked gifs from page

		// looping through each result
		for (var i = 0; i < results.length; i++){

			// creating and storing a div tag
			var comicDiv = $("<div>");

			// creating paragraph tag to storing rating info
			var para = $("<p>").text("Rating: " + results[i].rating);

			// creating and storing image tag
			var comicImage = $("<img>");
			// setting the src attr of image to a property pulled from "results"
			comicImage.attr("src", results[i].images.fixed_height.url);

			// add "gif" class to each comicImage
			comicImage.addClass("gif");

			// giving comicImage 'data-state' attribute and setting it to 'active'
			comicImage.attr("data-state", "active");

			// appending paragraph and image tag to comicDiv
			comicDiv.append(para);
			comicDiv.append(comicImage);

			// prepend comicDiv to HTML page in "#showComics" div
			$("#showComics").prepend(comicDiv);
		}
	});
}

// function that changes gif state from active to still or vice versa
$(document).on("click", ".gif", function() {

	// getting state and source of gif 
	var state = $(this).attr("data-state");
	console.log("state: " + state);
	var source = $(this).attr("src");
	console.log("source: " + source);

	// if state is active, slice the .gif extension from the end of url then add "_s" 
	// to make gif still 
	if (state === "active"){
		var still = source.slice(0,-4) + "_s" + source.slice(-4);
		console.log("still: " + still);
		$(this).attr("src", still);
		$(this).attr("data-state", "still");
	}
	else {
		var acti = source.slice(0, -6)+".gif";
		console.log("active: " + acti);
		$(this).attr("src", acti);
		$(this).attr("data-state", "active");
	}
});

// function to display comic gifs
function createButtons() {
	// deleting comic buttons prior to adding new comic buttons
	$("#comicButtons").empty();

	// loop through array of comic book characters
	for (var i = 0; i < topics.length; i++){
		// dynamically generate buttons for each comic in array
		var button = $("<button>");
		// adding comic class to button
		button.addClass("comic");
		// adding a data-attribute
		button.attr("data-name", topics[i]);
		// providing initial button text
		button.text(topics[i]);
		// adding button to "comicButtons" div
		$("#comicButtons").append(button);
	}

}

// event handler for when user clicks submit button
$("#addComic").on("click", function(event) {
	// preventing the button from trying to submit the form
	event.preventDefault();
	// storing comic book character's name
	var comic = $("#comic-name").val().trim();

	// push user input into initial array
	topics.push(comic);

	// call createButton function to display buttons 
	createButtons();
});

// adding a click event listener to all elements with a class of "comic"
$(document).on("click", ".comic", getComicGif);

// calling createButtons to display initial buttons
createButtons();