var topics = ["Batman", "Superman", "Wonder Woman", "The Flash", "Green Lantern", "Hawkgirl", "Aquaman", "Cyborg", "Martian Manhunter", "Black Canary", "Green Arrow"];


function initialTopics() {
    
    $("#base-buttons").empty();

    for (var i = 0; i < topics.length; i++) {

        var base = $("<button>");
        base.attr("type", "button")
        base.attr("data-superhero", topics[i]);
        base.text(topics[i]);
        base.addClass("btn btn-primary btn-lg");
        $("#base-buttons").append(base);
    }
}

function getGifs() {
    $(".btn").on("click", function () {

        var superhero = $(this).attr("data-superhero");

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            superhero + "&api_key=wTIy6ye2FbLyVIx0pWsTgPst3UEb7XaO&rating=pg&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            var results = response.data;

            for (var i = 0; i < results.length; i++) {

                var giphy = $("<div>");
                var superHero = $("<img>");
                var rating = results[i].rating;
                var h6 = $("<h6>").text("Rating: " + rating);
                
                giphy.addClass("gifs-1");
                giphy.addClass("gifs-2");
                superHero.attr("src", results[i].images.fixed_height_still.url);
                superHero.attr("data-still", results[i].images.fixed_height_still.url);
                superHero.attr("data-state", "still");
                superHero.attr("data-animate", results[i].images.fixed_height.url);
                superHero.addClass("gif");

                giphy.prepend(h6);
                giphy.prepend(superHero);

                var click = $(this).data('clicks');
                if (click) {
                    $("#gifs-1").prepend(giphy);
                } else {
                    $("#gifs-2").prepend(giphy);
                };
                $(this).data('clicks', !click);
            }
        });
    });
}


//function empty() {
//    var x;
//    x = document.getElementById("roll-input").value;
//    if (x == "") {
//        alert("Enter a Valid Roll Number");
//        return false;
//    };
//}

function animate() {
    $(".gif").unbind().on("click", function () {

        var state = $(this).attr("data-state");

        if (state == "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });
}

$("#search-supers").on("click", function (event) {
    event.preventDefault();
    var superhero = $("#gif-search").val().trim();

    topics.push(superhero);
    initialTopics();
    getGifs();
});

$(document).on("click", ".base-buttons", getGifs);
$(document).on("click", ".gif", animate);

window.onload = function () {

    initialTopics();
    getGifs();
}
