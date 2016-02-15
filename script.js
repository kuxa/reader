$(document).ready(function()
 {
  procenta = 0;
  $("#divek").show();
  $("#nastaveni").hide();
  
  $.get('lol.txt', function(data) 
   {
    $("#divek").html(data);
    if (localStorage.pozice)
     {
      $('body').scrollTop(localStorage.pozice);
     }
  
    $(window).scroll(function (event) 
     {
      scroll = $(window).scrollTop();
      if ($("#divek").is(":visible"))
       {
        localStorage.pozice = scroll;
        procenta = parseInt(scroll)/$(document).height()*100;
        $("#lista").css(
         {
          'width' : procenta+"%",
          'opacity' : '1',
          'transition' : 'none'
         });
        setTimeout(function(){ $("#lista").css({ 'opacity':'0.5', 'transition':'opacity 5s linear'}); }, 2000);
       }   
     });

    if (localStorage.velikost)
     {
      $("#divek").css("font-size", hodnota);   
      $("#font-size").text(hodnota);     
     }
  }, 'text');



  $("#ikona").click(function() 
   {
    nastaveni();
   });
 });

function nastaveni()
 {
  if ($("#divek").is(":visible"))	
   {
    $("#vyska").html(Math.round(procenta*100)/100); 

    $('#divek').hide();  
    $('#nastaveni').show();

    if ($("#divek").css("opacity") >= 1)
     $("#opacity-plus").prop("disabled", true);
      else
       if ($("#divek").css("opacity") <= 0.1)
        $("#opacity-minus").prop("disabled", true);

    if (parseInt($("#divek").css("font-size"))/16 >= 3)
     $("#font-size-plus").prop("disabled", true);
      else
       if (parseInt($("#divek").css("font-size"))/16 <= 0.5)
        $("#font-size-minus").prop("disabled", true);      
   }
    else
     {
      $('#divek').show();
      $('#nastaveni').hide();
      $('body').scrollTop(localStorage.pozice);
     }
 }

souhlas = false;

function zmenit(typ, toto)
 {
  if (typ == "font-size" && souhlas != true)
   {
    if (!confirm("Změna velikosti písma může ovlivnit záložku v knize!"))
     return false;
      else
       souhlas = true;
   }
  var hodnota = parseFloat($("#divek").css(typ));
  if (typ == "font-size")
   var hodnota = hodnota/16; 
  if (toto.val() == "+")
   var hodnota = hodnota+0.1;
    else
     var hodnota = hodnota-0.1;
  var hodnota = Math.round(hodnota*10)/10;
  if ((typ == "opacity" && (hodnota <= 0.1 || hodnota >= 1)) || (typ == "font-size" && (hodnota <= 0.5 || hodnota >= 1.5)))
   {
    if (typ == "font-size")
     var hodnota = Math.round(hodnota*10)/10+"em"; 
    toto.prop('disabled', true);
    if (hodnota == 0.1 || hodnota == 1 || parseFloat(hodnota) == 0.5 || parseFloat(hodnota) == 1.5)
     {
      $("#divek").css(typ, hodnota);   
      $("#"+typ).text(hodnota); 
      if (typ == "font-size")
       localStorage.velikost = hodnota; 
     }
   } 
    else
     {
      if (typ == "font-size")
       var hodnota = Math.round(hodnota*10)/10+"em";       
      $("#"+typ+"-minus, #"+typ+"-plus").prop('disabled', false);
      $("#divek").css(typ, hodnota);   
      $("#"+typ).text(hodnota);
      if (typ == "font-size")
       localStorage.velikost = hodnota;        
     }
 } 
