$(document).ready(function () {
    $('.tabular .item').click(function(){
      $('.tabular .active ').removeClass('active');
      $(this).addClass('active');
    });  
    
    $('.head-menu .item').click(function(){
      $('.head-menu .active ').removeClass('active');
      $(this).addClass('active');
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