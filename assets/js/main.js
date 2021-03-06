$(document).ready(function (){
    var animals = ['skunk', 'alligator', 'tiger', 'lion', 'cat', 'dog']



$('#animal-btn').on("click",".animalButton" ,function (){
    event.preventDefault()
    $('#gifReturns').empty()
    

    var button = $(this).val();
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + button + "&api_key=xpFZlL1dYVR4dpqAQDNgOCTpbT9ZkTqr";
    
        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function(response) {
          console.log(response);
            let result = response.data
          result.forEach(element => {
              
              const wrapper = $("<div>")
               $("<p>").text("rating: " + element.rating).appendTo(wrapper)
              
              $("<img>").attr("src", element.images.fixed_height.url)
              .data('is-still',false)
              .data('still',element.images.fixed_height_still.url)
              .data('moving',element.images.fixed_height.url)
              .addClass('gif')
              .appendTo(wrapper)
              
              
              $('#gifReturns').append(wrapper)
              
          });
          
        });
    
})

$('#newButtonForm').on('submit', function (event) {
        event.preventDefault()
            var newButton = $('#newButtonName').val()
            console.log(newButton)
            animals.push(newButton)
            rendersButtons()
    })

    $('#gifReturns').on("click",".gif" ,function (){
      let isStill = $(this).data('is-still')
      let stillUrl = $(this).data('still')
      let movingUrl = $(this).data('moving')
      console.log(isStill)
      console.log(stillUrl)
      console.log(movingUrl)
      //For isStill to be true the gif was still when we clicked on it
      if(isStill){
      //because the gif was still we changed the source we change the source to the moving Url
      //at the same time we need to change the is-still data prop to false so we know this gif is moving next time we click on it
        $(this).attr('src', movingUrl).data('is-still', false)
      }else{
        $(this).attr('src', stillUrl).data('is-still', true)
      }

    })

    
    function rendersButtons (){
        $('#animal-btn').empty()
        for (let index = 0; index < animals.length; index++) {
            var button = $('<button>').addClass('animalButton').text(animals[index]).val(animals[index])
            $('#animal-btn').append(button)
                    }
                    
    }
    rendersButtons()
})