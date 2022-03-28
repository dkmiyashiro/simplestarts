var projVis = false;
var aboutVis = false;

var aboutCard = document.getElementById("aboutCard");
var projCard1 = document.getElementById("henlo");
var projCard2 = document.getElementById("henlo2");
var projCard3 = document.getElementById("henlo3");

window.onload = function init(){
    // Initialize collapse button
    $(".button-collapse").sideNav();
}

hideCard = function(card){
    card.classList ? card.classList.remove('scale-in') : card.className -= ' scale-in';
}

showCard = function(card){
    //card.classList ? card.classList.remove('scale-out') : card.className -= ' scale-out';
    card.classList ? card.classList.add('scale-in') : card.className += ' scale-in';
}

projClick = function(){
  if(aboutVis){
    hideCard(aboutCard);
    aboutVis = false;
  }

  window.setTimeout(function(){
      aboutCard.style.display = "none";
      projCard1.style.display = "";
      projCard2.style.display = "";
      projCard3.style.display = "";
    },100);
    window.setTimeout(function(){
      if(projVis){
        hideCard(projCard1);
        hideCard(projCard2);
        hideCard(projCard3);
        projVis = false;
      }else{
        showCard(projCard1);
        showCard(projCard2);
        showCard(projCard3);
        projVis = true;
      }
    },100)
  }

aboutClick = function(){
  if(projVis){
    hideCard(projCard1);
    hideCard(projCard2);
    hideCard(projCard3);
    projVis = false;
  }

  window.setTimeout(function(){
      projCard1.style.display = "none";
      projCard2.style.display = "none";
      projCard3.style.display = "none";
      aboutCard.style.display = "";
    },100);
    
  window.setTimeout(function(){
    if(aboutVis){
      hideCard(aboutCard);
      aboutVis = false;
    }else{
      showCard(aboutCard);
      aboutVis = true;
    }
  },100);
    console.log(document.getElementById("aboutCard").style.display)

}
