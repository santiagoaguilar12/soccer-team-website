

$(document).ready(function () {
  $(document).resize();
    $('.tabular .item').click(function(){
      $('.tabular .active ').removeClass('active');
      $(this).addClass('active');
    });  
    
    $('.head-menu .item').click(function(){
      $('.head-menu .active ').removeClass('active');
      $(this).addClass('active');
    }); 
    
    $('.ui.dropdown')
        .dropdown()
    ;
    
    $("#if_student_div input").click(function(){
     if( $( "#no_check" ).prop( "checked" )){
       $("#academic_info_fill input").prop("disabled", true);
      // alert("input");
     }
     if( $( "#yes_check" ).prop( "checked" )) {
              $("#academic_info_fill input").prop("disabled", false);

     }
    });
    
    
    
    // Get the element with id="defaultOpen" and click on it
    document.getElementById("defaultOpen").click();

    
    // $('.tabular.menu .item').tab();
});

function openTab(evt, tabName) {
  // Declare all variables
  var i, tabcontent, tablinks;

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";
}

$(window).resize(function(){
  if ($("body").width() < 767) {
    // $('#tab-menu').addClass('inverted');
    $('#tab-menu').addClass('icon');
    $('#tab-menu').addClass('large');
    // $('#tab-menu').addClass('borderless');

    // $('#tab-menu').addClass('labeled');

    $('#tab-menu').removeClass('tabular');
    $('.menu-text').hide();
  } else {
    $('.menu-text').show();

    // $('#tab-menu').removeClass('inverted');
    $('#tab-menu').removeClass('icon');
    // $('#tab-menu').removeClass('labeled');
    $('#tab-menu').removeClass('large');



    $('#tab-menu').addClass('tabular');  
  }
  if($("body").width() < 400 ){
    $(".ui.head-menu").addClass("mini");
  }else{
    $(".ui.head-menu").removeClass("mini");
  }
  
})

$(window).resize(function(){
  if ($("body").width() < 600){
    $('#filters-form .selection.dropdown').addClass('mobile-filter-fields');  
  }else{
    $('#filters-form .selection.dropdown').removeClass('mobile-filter-fields');

  }
})