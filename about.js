$(document).ready(function() {
    $.material.init();
});

/* liens dans la page */
var $accueil = document.getElementById("accueil");
$accueil.onclick = function(){
  window.location.href = "liste.html";
}

document.getElementById("coverage").innerHTML = "(" + navitia_coverage_label +")";


