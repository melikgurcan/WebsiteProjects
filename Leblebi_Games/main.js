
$(document).ready(function(){
    $("#sect1").click(function(){
      $("#1bir").show();
      $("#1iki, #1uc").hide();
    });
    $("#sect2").click(function(){
      $("#1iki").show();
      $("#1bir, #1uc").hide();
    });
    $("#sect3").click(function(){
      $("#1uc").show();
      $("#1bir, #1iki").hide();
    });

    $("#sect4").click(function(){
        $("#2bir").show();
        $("#2iki, #2uc").hide();
      });
      $("#sect5").click(function(){
        $("#2iki").show();
        $("#2bir, #2uc").hide();
      });
      $("#sect6").click(function(){
        $("#2uc").show();
        $("#2bir, #2iki").hide();
      });

      $("#leb").click(function(){
        var audio = document.getElementById('leblebi');
        audio.play();
    });
  });