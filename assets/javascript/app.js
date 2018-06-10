var topicArray = ["Pizza", "Sushi", "Burritos", "Steak", "Seafood", "Barbeque"];



    function displayGifButtons(){
        $("#button-display").empty(); 
        for (var i = 0; i < topicArray.length; i++){
            var gifButton = $("<button class='m-2'>");
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

    console.log(topicArray);

    displayGifButtons();
    addNewButton();
