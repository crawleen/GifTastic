var topics = ["Paris", "London", "Denver", "Vancouver"];    

function displayPlace() {

  var place = $(this).attr("data-place");
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + place + "&api_key=dc6zaTOxFJmzC&limit=10";

  $.ajax({
      url: queryURL,
      method: "GET"
    })
    .done(function(response) {
      var results = response.data;

      for (var i = 0; i < results.length; i++) {
        var gifDiv = $("<div class='gif'>");

        var rating = results[i].rating;

        var p = $("<p>").text("Rating: " + rating);
        var animateURL = results[i].images.fixed_height.url;
        var stillURL = results[i].images.fixed_height_still.url;
        var placeImage = $("<img data-state='still' data-animate='"+animateURL+"' data-still='"+stillURL+"''>");
        placeImage.attr("src", stillURL);

        gifDiv.prepend(p);
        gifDiv.prepend(placeImage);

        $("#gifs-appear-here").prepend(gifDiv);
      }
    });
};

function renderButtons() {    
  $("#buttons-view").empty();

  for (var i = 0; i < topics.length; i++) {
    var a = $("<button>");
    a.addClass("place");
    a.attr("data-place", topics[i]);
    a.text(topics[i]);
    $("#buttons-view").append(a);
  }
}

$("#add-place").on("click", function(event) {
  event.preventDefault();
  var place = $("#place-input").val().trim();

  topics.push(place);

  renderButtons();

});

$(document).on("click", ".place", displayPlace);   
$(document).on("click", "img", animateStillGif); 

function animateStillGif() {
  let state = $(this).attr("data-state");
  if(state === 'still')
  {
    let newSrc = $(this).attr('data-animate');
    $(this).attr('src',newSrc);
    $(this).attr('data-state','animate');
  }
  else{
    let newSrc = $(this).attr('data-still');
    $(this).attr('src',newSrc);
    $(this).attr('data-state','still');
  }
}

renderButtons();
