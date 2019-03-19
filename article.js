
$(document).ready(function() {

var gifList = ["The Fresh Prince", "Friends", "Seinfeld", "Gilmore Girls", "Home Improvement", "The Simpsons", "Full House", "Whose Line is it Anyways", "Everybody Loves Raymond", "The Nanny"];

// displaygifInfo function re-renders the HTML to display the appropriate content
function displaygifInfo() {

  $(".gif-btn").on("click", function () {
    event.preventDefault();

    var gif = $(this).attr("data-name");

    console.log(gif)

    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=D1qE1NZU91nlObFZ6OY231LeGJa3Us0w&q=" + gif + "&limit=10";


    // Creating an AJAX call for the specific gif button being clicked
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {

      // Storing an array of results in the results variable
      var results = response.data;
      console.log(results)

      // Looping over every result item
      for (var i = 0; i < results.length; i++) {
        // var results = response.data[i].url;

        // Creating a div for the gif
        var gifDiv = $("<div>");

        // Storing the result item's rating
        var rating = results[i].rating;

        // Creating a paragraph tag with the result item's rating
        var p = $("<p>").text("Rating: " + rating);

        // Creating an image tag
        var gifImage = $("<img>");

        // Giving the image tag an src attribute of a proprty pulled off the
        // result item
        gifImage.attr("src", results[i].images.downsized_medium.url);

        // Appending the paragraph and gifImage we created to the "gifDiv" div we created
        gifDiv.append(p);
        gifDiv.append(gifImage);

        // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
        $("#gifs-appear-here").prepend(gifDiv);
      }
    });
  });
}

// Function for displaying gif data
function renderButtons() {

  // Deleting the gifList prior to adding new gifList
  // (this is necessary otherwise you will have repeat buttons)
  $("#buttons-view").empty();

  // Looping through the array of gifList
  for (var i = 0; i < gifList.length; i++) {

    // Then dynamicaly generating buttons for each gif in the array
    // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
    var a = $("<button>");
    // Adding a class of gif-btn to our button
    a.addClass("gif-btn");
    // Adding a data-attribute
    a.attr("data-name", gifList[i]);
    // Providing the initial button text
    a.text(gifList[i]);
    // Adding the button to the buttons-view div
    $("#buttons-view").append(a);
  }
}

// This function handles events where a gif button is clicked
$("#add-gif").on("click", function (event) {
  event.preventDefault();
  // This line grabs the input from the textbox
  var gif = $("#gif-input").val().trim();

  // Adding gif from the textbox to our array
  gifList.push(gif);

  // Calling renderButtons which handles the processing of our gif array
  renderButtons();
});

// Adding a click event listener to all elements with a class of "gif-btn"
$(document).on("click", ".gif-btn", displaygifInfo);

// Calling the renderButtons function to display the intial buttons
renderButtons();


})