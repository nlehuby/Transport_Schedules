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
    document.getElementById("liste").innerHTML = "<div class='panel panel-warning'>\
                        <div class='panel-body'>Vous n'avez pas de fiches horaires enregistrées. Commencez par rechercher un arrêt  </div></div>"
  }
  else
  {
    document.getElementById("liste").innerHTML = '';
    for (i=0; i<LSlength; i++)
    {
      if (localStorage.key(i).indexOf(FH_version) == -1)
      {
        alert("une nouvelle version de l'application est disponible, vos favoris ont été réinitialisés.");
        localStorage.clear();
        document.getElementById("liste").innerHTML = "<div class='panel panel-warning'><div class='panel-body'>Vous n'avez pas de fiches horaires enregistrées. Commencez par rechercher un arrêt  </div></div>"
      }
      else
      {
          fiche_horaire = $.parseJSON(localStorage[localStorage.key(i)]);
          var div_list = document.createElement("div");
          dep_id = "departure_" + fiche_horaire.code_route + "_" + fiche_horaire.code_arret;
          lien = 'FH.html#fromliste?route='+ fiche_horaire.code_route +'&arret='+ fiche_horaire.code_arret;
          div_list.className = "panel panel-warning";
          var div_header = document.createElement("div");
          div_header.className = "panel-heading";
          div_header.innerHTML = '<b>'+fiche_horaire.arret+'</b>';
          div_list.appendChild(div_header);
          
          var div_content = document.createElement("div");
          div_content.className = "panel-body";
          div_content.innerHTML += '<p><img src="icons/icon32x32.png"></img><b>Bus</b> '+fiche_horaire.ligne+' ('+fiche_horaire.reseau+')</p>'
          div_content.innerHTML += '<p><b>vers</b> '+fiche_horaire.direction+'</p>'
          div_content.innerHTML += '<span id="' + dep_id + '">' + '--' + '</span><br>'
          div_content.innerHTML += '<a id="'+localStorage.key(i)+'" class="pull-right">Supprimer</a>'
          div_content.innerHTML += '<a href='+lien+'>Tous les horaires</a>'          
          div_list.appendChild(div_content);
          

          document.getElementById("liste").appendChild(div_list);
          
          Navitia_get_next_dep(fiche_horaire.code_arret, fiche_horaire.code_route)
          
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



function Navitia_get_next_dep(code_arret,code_route)  {
   console.log('appel navitia : récupération des prochains passages')
   var now = new Date()
   var navitia_params = "routes/" + code_route + "/stop_areas/" + code_arret + "/departures?from_datetime=" + now.toLocaleFormat('%Y%m%dT%H%M%S');
   //console.log(navitia_params);
   $.ajax({
        url: "https://api.navitia.io/v1/coverage/"+ navitia_coverage + "/" + navitia_params,
        dataType: 'json',
        global: true,
        error: function(data) {console.log("échec de l'appel navitia - on doit être hors ligne'")},
        success: function(data) {
            //console.log(data['departures']) //DEBUG    
            var next_dep = "";
            //je ne veux garder que le prochain passage
            for (var i = 0; i < 1; ++i) { 
                heures = data['departures'][i]['stop_date_time']['departure_date_time'].slice(9, 11).toString();
                minutes = data['departures'][i]['stop_date_time']['departure_date_time'].slice(11, 13).toString();
                next_dep += " -->" + heures + "h" + minutes;
                }
            dep_id = "departure_" + code_route + "_" + code_arret
            document.getElementById(dep_id).innerHTML = next_dep
            
            }
        });
    
}


/* intelligence de la page */
$(document).ready(function(){
    $.material.init();
    $.ajaxSetup( {
       beforeSend: function(xhr) { xhr.setRequestHeader("Authorization", "Basic " + btoa(navitia_api_key + ":" )); }
       });
          
    List_FH_from_localStorage();
    
});

