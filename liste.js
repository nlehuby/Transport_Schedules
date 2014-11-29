var $list = document.getElementById("search");
$list.onclick = function()
{
  window.location.href = "add.html";
}

var $about = document.getElementById("about");
$about.onclick = function()
{
  window.location.href = "about.html";
}

function List_FH_from_localStorage()
{
  var fiche_horaire = {};
  var fiche_horaire_json;
  
  LSlength = localStorage.length;
  if (LSlength == 0)
  {
    document.getElementById("liste").innerHTML = "<p style='padding:10px 10px 0px 10px;'>Vous n'avez pas encore enregistré de fiches horaires. Recherchez un arrêt pour commencer.</p><hr>"
  }
  else
  {
    for (i=0; i<LSlength; i++)
    {
      
      fiche_horaire_json = $.parseJSON(localStorage[localStorage.key(i)]);
      fiche_horaire = fiche_horaire_json;
      //document.getElementById("liste").innerHTML = '<p>' + fiche_horaire.arret + '</p>'
      //  + '<p>' + fiche_horaire.ligne + '</p>'
      //  + '<p>' + fiche_horaire.direction + '</p>';
      var div_list = document.createElement("div");
      div_list.className = "div_list";
      div_list.innerHTML = '<p><a href="FH.html?route='+ fiche_horaire.code_route +'&arret='+ fiche_horaire.code_arret +'">' + fiche_horaire.arret + '</a></p>'
        + '<p>' + fiche_horaire.ligne + '</p>'
        + '<p>' + fiche_horaire.direction + '</p>';
      document.getElementById("liste").appendChild(div_list);
    }
  }
}

List_FH_from_localStorage();

//document.getElementById("ligne").innerHTML = fiche_horaire.ligne;
//document.getElementById("direction").innerHTML = fiche_horaire.direction;