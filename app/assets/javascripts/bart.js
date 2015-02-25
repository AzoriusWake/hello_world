$(document).ready(function(){
  $("#bart-form").on('submit', function(e){
    e.preventDefault();
    bartAjaxRequest = $.ajax({
      url: "/bart",
      type: "post",
      data: $(this).serialize()
    });

    bartAjaxRequest.done(function(server_data){
      string = '<h1>' + server_data.responseText + '</h1>'
      $("#bart-box").innerhtml(string)
    });

    bartAjaxRequest.fail(function(server_data){
      $("#bart-box-box").html('')
      $("#bart-box-box").append(server_data.responseText)
    });
  });

});
