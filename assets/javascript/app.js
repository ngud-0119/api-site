var topicArray = ["Coffee", "Pizza", "Sushi", "Burritos", "Steak", "Seafood", "Barbeque", "Tacos", "Nachos", "Sweet Tea", "La Croix", "Perrier"];



    function displayGifButtons(){
        $("#button-display").empty(); 
        for (var i = 0; i < topicArray.length; i++){
            var gifButton = $("<button class='m-1'>");
            gifButton.addClass("food btn btn-primary");
            gifButton.attr("data-name", topicArray[i]);
            gifButton.text(topicArray[i]);
            $("#button-display").append(gifButton);
        }

    }


    function addNewButton(){
        $("#addGif").on("click", function(){
        var food = $("#newFood").val().trim();
        if (food == ""){
          return false;
        }
        topicArray.push(food);
    
        displayGifButtons();
        return false;
        });
    }

    function showGifs(){
        var foodChoice = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + foodChoice + "&api_key=ahbCxqFdx1cR2Kf5VDqdp3djLKDGm81E&limit=10";
        $.ajax({
            url: queryURL,
            method: 'GET'
        })
        .done(function(response) {
            $("#gifs-go-here").empty();
            var results = response.data;
            if (results == ""){
              return false;
            }
            for (var i=0; i< results.length; i++){
    
                var gifDiv = $("<div>");
                gifDiv.addClass("gifDiv col-sm-12 col-lg-3 border border-primary");
                var gifRating = $("<p>").text("Rating: " + results[i].rating);
                var gifTitle = $("<p>").text("Title: " + results[i].title);
                var gifAdded = $("<p>").text("Date and time added to GIPHY: " + results[i].import_datetime);
                gifDiv.append(gifRating);
                gifDiv.append(gifTitle);
                gifDiv.append(gifAdded);
                var gifImage = $("<img>");
                gifImage.attr("src", results[i].images.fixed_width_still.url); 
                gifImage.attr("data-still",results[i].images.fixed_width_still.url); 
                gifImage.attr("data-animate",results[i].images.fixed_width.url); 
                gifImage.attr("data-state", "still"); 
                gifImage.addClass("image");
                gifDiv.append(gifImage);
                $("#gifs-go-here").prepend(gifDiv);
            }
        });

    }

    displayGifButtons();
    addNewButton();

    $(document).on("click", ".food", showGifs);
    $(document).on("click", ".image", function(){
    var state = $(this).attr('data-state');
    if ( state == 'still'){
        $(this).attr('src', $(this).data('animate'));
        $(this).attr('data-state', 'animate');
    }else{
        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-state', 'still');
    }

    });
