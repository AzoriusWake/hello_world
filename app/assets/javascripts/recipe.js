$(document).ready(function(){

  $("#recipe_search").on('submit', function(e){
    e.preventDefault();

    recipeAjaxRequest = $.ajax({
      url: "/dashboard",
      type: "post",
      data: $(this).serialize()
    });

    recipeAjaxRequest.done(function(server_data){
      var img = $(".foodList img");
      var url = $(".foodList a")
      var recipes = server_data.recipes

      for(var i=0; i<7; i++) {
        $(img[i]).attr("src", recipes[i].image_url)
        $(url[i]).attr("href", recipes[i].f2f_url)
      }
    });

    recipeAjaxRequest.fail(function(server_data){
      console.log("fail")
    });
  });

});