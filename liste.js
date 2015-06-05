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
    document.getElementById("liste").innerHTML = '';
    for (i=0; i<LSlength; i++)
    {
      if (localStorage.key(i).indexOf("version1") == -1)
      {
        alert("une nouvelle version de l'application est disponible, vos favoris ont été réinitialisés.");
        localStorage.clear();
      }
      else
      {
          fiche_horaire = $.parseJSON(localStorage[localStorage.key(i)]);
          var div_list = document.createElement("div");
          div_list.className = "div_list";
          div_list.innerHTML = '<p><a href="FH.html#fromliste?route='+ fiche_horaire.code_route +'&arret='+ fiche_horaire.code_arret +'">' + fiche_horaire.arret + '</p>'
            + '<p>' + fiche_horaire.ligne + ' (' + fiche_horaire.reseau + ')' + '</p>'
            + '<p>' + fiche_horaire.direction + '</a></p>'
            + '<p>' + '<a href="#" id="'+localStorage.key(i)+'"> <font size="2">Supprimer</font></a>' + '</p>' ; // TODO : idéalement, utiliser un appui long plutôt qu'un lien
          document.getElementById("liste").appendChild(div_list);
          
          //gestion de la suppression
          document.getElementById(localStorage.key(i)).onclick = function()
          { 
            localStorage.removeItem(this.id);
            alert('Cette fiche horaire a bien été supprimée');
            List_FH_from_localStorage();
          }      
      }
    }
  }
}

List_FH_from_localStorage();


