$(document).ready(function()
{
$("#divek").show();
$("#nastaveni").hide();


$.get('lol.txt', function(data) {
   $("#divek").html(data);
   if (localStorage.pozice)
 {
  $('body').scrollTop(localStorage.pozice);
 }


$(window).scroll(function (event) {
    var scroll = $(window).scrollTop();
    if ($("#divek").is(":visible"))
     localStorage.pozice = scroll;
});
}, 'text');



$("#ikona").click(function() {
  nastaveni();
});
});

function nastaveni()
 {
  if ($("#divek").is(":visible"))	
   {
    $('#divek').hide();  
    $('#nastaveni').show();
   }
    else
     {
      $('#divek').show();
      $('#nastaveni').hide();
      if (localStorage.pozice)
       {
        $('body').scrollTop(localStorage.pozice);
        var procenta = parseInt(localStorage.pozice)/$(document).height()*100;
       }
        else
         {
          var procenta = 0;	
         }
      $("#vyska").html(procenta+"%"); 
     }
 }