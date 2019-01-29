$(document).ready( function () {
    var topics = ["Brooklyn Nine-Nine", "The Good Place", "Killing Eve", "Rupaul's Drag Race", "Stranger Things", "The Haunting of Hill House", "The Office", ];
    console.log(topics);

    //display the gifs when you press the buttons
    function displayTv () {
        $("#gifView").empty();
        var show = $(this).attr("search")
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + show + "&api_key=HptjIyavRuRYCyM0OLKbBfcCeobV2xqi&limit=10";
        console.log(queryURL);

        $.ajax({
            url: queryURL, 
            method: "GET"
        }).then(function(response) {
            
            //console.log(response);
            var result = response.data;
            console.log(result);

            for (var i=0; i <result.length; i++) { 
            
            //var gifView = $(".gifView")
            var showDiv = $("<div class='showGifs'>");
            var imageTag = $("<img>");
            
            // store rating info
            var rating = "<p> Rating: " + result[i].rating + "</p>"; 
            console.log(rating)
            
            //store gif info
            var gifURL = result[i].images.fixed_height.url;
            console.log(gifURL);

            //store still info
            var stillURL = result[i].images.fixed_height_still.url;
            console.log(stillURL);
            
            imageTag.attr("src", stillURL);
            imageTag.addClass("tvGif");
            imageTag.attr("data-state", "still");
            imageTag.attr("data-still", stillURL);
            imageTag.attr("data-animate", gifURL);
            
            showDiv.append(imageTag);
            showDiv.append(rating);  
            

            $("#gifView").prepend(showDiv);

        };


        });
    };

    //display buttons when the page is loaded 
    function displayButtons() {
        $("#buttonsView").empty();

        for (var i = 0; i <topics.length; i++) {
            var a = $("<button>");
            a.addClass("btn");
            a.addClass("showClass");
            a.attr("search", topics[i]);
            a.text(topics[i]);
            $("#buttonsView").append(a);
        };
    };

    displayButtons();

   
    //click event to add new show to buttons 
    $("#addShow").on("click", function(event) {
        event.preventDefault();
        var show = $("#tvInput").val().trim();
        console.log(show);
        topics.push(show);
        console.log(topics);
        displayButtons();
    });

    //click button to show gifs of show 
    $(document).on("click", ".showClass", displayTv);


    //click button to change the still to gif 
    $(document).on("click", ".tvGif", movingGifs);

    function movingGifs() {
        var state = $(this).attr("data-state");
        if (state == "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        }
        else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
     };

});