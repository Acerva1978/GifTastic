$(document).on("click", ".sports",function() {
    $("#gifs-appear-here").empty();
  var name = $(this).attr("data-name");
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    name + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10";

    console.log(queryURL);
  $.ajax({
    url: queryURL,
    method: "GET"
  })
    .then(function(response) {
      var results = response.data;

      for (var i = 0; i < results.length; i++) {
        var gifDiv = $("<div>");
        var rating = results[i].rating;
        var p = $("<p>").text("Rating: " + rating);

        var personImage = $("<img>");
        personImage.attr("src", results[i].images.fixed_height_still.url);
        personImage.attr("data-still", results[i].images.fixed_height_still.url);
        personImage.attr("data-animate", results[i].images.fixed_height.url);
        personImage.attr("data-state", "still");
        personImage.addClass("gif");
        gifDiv.prepend(p);
        gifDiv.prepend(personImage);
        
        $("#gifs-appear-here").prepend(gifDiv);
      }
    });
});

$(document).on("click", ".gif", function() {
 var state = $(this).attr("data-state");

  if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }
});

  var sports = ["James Harden", "Michael Jordan", "Messi", "Ronaldo", "Dirk Nowitzki"];
 
  function renderButtons() {

    $("#buttons-view").empty();

   
    for (var i = 0; i < sports.length; i++) {

      
      var a = $("<button>");
   
      a.addClass("sports bg-success");
     
      a.attr("data-name", sports[i]);
     
      a.text(sports[i]);
     
      $("#buttons-view").append(a);
    }
  }


 
  $("#add-person").on("click", function(event) {
    event.preventDefault();
    var sport = $("#person-input").val().trim();
    sports.push(sport);
    // $(this).val("");
    $("#person-input").val("");
    renderButtons();
   });

  
 
   renderButtons();