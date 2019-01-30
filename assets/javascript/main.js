$(document).ready(function () {
    //topics//
    var topics = ["dogs", "cats", "rats", "giraffes", "anteaters", "baboons", "spiders", "alligators", "hamsters", "sharks"];

    


    //Next, functions that will show the intial gif buttons, add new buttons, and reset the screen.//
    function showButtons(){
        for(var i = 0; i < topics.length; i++) { 
            var buttonGif = $("<button>");
            buttonGif.addClass("action");
            buttonGif.addClass("btn btn-primary");   ////Having a hard time getting buttons to show, no errors on console, confusing////
            buttonGif.attr("data-name", actions[i]);
            buttonGif.text(actions[i]);
            $("gif-buttons").append(buttonGif);
            
        }
        showButtons();
    }
    console.log(showButtons);
    
    
    function addButton(){
        $("#addGif").on("click", function(){
            var action = $("#action-input").val().trim();
            if(action == ""){
                return false;
            }
            actions.push(action);
            showButtons();
            return false;
        });
        
    }
    addButton();


   
    

 

    function reset(){
        $("reset").on("click", function(){
            actions.pop(action);
            showButtons();
            return false;
        });
        ;
    }
    reset()
    //Make ajax call for animal api function//
    function showGifs (){
        var animals = $(this).attr("data-animal");
        var queryUrl = "http://api.giphy.com/v1/gifs/search?q=" +
        animals + "&api_key=qqxvR0ncrG1P2wZbJkSzvlAEq1jmXsjM&limit=10";
        $.ajax({
            url: queryUrl,
            method: "GET"
        })
        .then(function(response){
            var results = response.data;
            
            

            for(var i = 0; i < results.length; i++){
                //////////////////
                var divGif = $("<div>");
                divGif.addClass("divGif");
                //////////////////
                var ratingGif = $("<p>");
                divGif.append(ratingGif);
                //////////////////
                //Setting the pause effect//
                var imageGif = $("<img>");
                imageGif.attr("src", results[i].images.fixed_height_small_still.url);
                imageGif.attr("data-still",results[i].images.fixed_height_small_still.url); 
                imageGif.attr("data-animate",results[i].images.fixed_height_small.url); 
                imageGif.attr("data-state", "still"); 
                imageGif.addClass("image");
                divGif.append(imageGif);
                ///////////////////
                $("gif-div").prepend(divGif);

            }
        });
    }
    
    
    
    //Event Listeners//
    $(document).on("click", ".action", showGifs);
    $(document).on("click", ".image", function(){
        var state = $(this).attr("data-state");
        if(state == "still"){
            $(this).attr("src", $(this).data("animate"));
            $(this).attr("data-state", "animate");
        }
        else{
            $(this).attr("src", $(this).data("still"));
            $(this).attr("data-state", "still");
        }
    });

    

});













