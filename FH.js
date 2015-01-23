/* variables globales utilisées */
var fiche_horaire = {};

var qsRoute = getParameterByName('route');
var qsArret = getParameterByName('arret');

var nb_retry = 0;

/* intelligence de la page */
$(document).ready(function(){
    $.ajaxSetup( {
       xhr: function() {return new window.XMLHttpRequest({mozSystem: true});}
       });
    /* scroll sur les horaires à venir */
    //TODO : pourquoi ça marche pas ?!
    $("html, body").animate({ scrollTop: $('#min19').offset().top }, 1000);
    
    console.log("FH arrêt : " + qsArret + " ; route : " + qsRoute);
    
    console.log('Affichage FH depuis localStorage');
    localStorage_get_FH(qsArret,qsRoute);   

    console.log("Tentative d'affichage FH depuis navitia");
    Navitia_get_FH(qsArret,qsRoute);
});

/* liens dans la page */
var $list = document.getElementById("list");
$list.onclick = function(){
  window.location.href = "liste.html";
}

var $add = document.getElementById("add");
$add.onclick = function(){
    alert("Sélection horaire enregistrée.");
    localStorage.setItem(fiche_horaire.code_arret+':'+fiche_horaire.code_route, JSON.stringify(fiche_horaire));
}

/* fonctions utilisées */
function localStorage_get_FH(Arret, Route){
    console.log('localStorage : récupération de la fiche horaire')
    
    var fiche_horaire = {};
    var fiche_horaire_json;

    LSlength = localStorage.length;
    for (i=0; i<LSlength; i++)
    {
      fiche_horaire_json = $.parseJSON(localStorage[localStorage.key(i)]);
      fiche_horaire = fiche_horaire_json;
      if (fiche_horaire.code_route == Route && fiche_horaire.code_arret == Arret)
      {
          display_FH(fiche_horaire);
      }
    }
}

function display_FH(FH_data_object)  {
    //console.log(FH_data_object) //DEBUG
            document.getElementById("arret").innerHTML = FH_data_object.arret;
            document.getElementById("ligne").innerHTML = FH_data_object.ligne;
            document.getElementById("direction").innerHTML = FH_data_object.direction;   
    
            //traitement des notes
            var j = 0;
            document.getElementById("notes").innerHTML = ""
            while (j < FH_data_object.notes.length)
            {
                var div = document.createElement("div");
                div.innerHTML = FH_data_object.notes[j];
                document.getElementById("notes").appendChild(div);
                ++j;
            }    
       
            //traitement des horaires
            for (var i = 0; i < 25; ++i) {            
                var j = 0;
                while (j < FH_data_object.horaires[i].length)
                {
                    var span_min = document.createElement("span");
                    span_min.innerHTML = FH_data_object.horaires[i][j];
                    if (j == 0) {document.getElementById("min"+ i.toString()).innerHTML = "" }
                    document.getElementById("min"+ i.toString()).appendChild(span_min);
                    ++j;
                }
            }
    
            


}

function retry_on_navitia_error(data, code_arret,code_route){
    //console.log(data); //DEBUG
    if (nb_retry < 2){
        nb_retry ++;
        console.log("Tentative d'affichage FH depuis navitia");
        Navitia_get_FH(qsArret,qsRoute);
    }
    else {
        console.log("nombre d'essai d'appel navitia dépassé. On doit être hors ligne")
        //TODO : afficher un truc à l'utilisateur ?
    }
}

function Navitia_get_FH(code_arret,code_route)  {
   console.log('appel navitia : récupération de la fiche horaire')
   //TODO : passer la date du jour !
   var navitia_params = "stop_areas/" + code_arret + "/routes/" + code_route + "/stop_schedules?from_datetime=20150123T010000";
   $.ajax({
        url: "http://"+ navitia_api_key+":@api.navitia.io/v1/coverage/"+ navitia_coverage + "/" + navitia_params,
        dataType: 'json',
        global: true,
        error: function(data) {retry_on_navitia_error(data, code_arret,code_route)},
        success: function(data) {
            //console.log(data) //DEBUG
            fiche_horaire.code_arret = data['stop_schedules'][0]['stop_point']['stop_area']['id']
            fiche_horaire.code_route =  data['stop_schedules'][0]['route']['id']            
            fiche_horaire.arret = data['stop_schedules'][0]['stop_point']['name']
            fiche_horaire.ligne = data['stop_schedules'][0]['route']['line']['code']
            fiche_horaire.direction = data['stop_schedules'][0]['route']['direction']['stop_point']['name']
            
            fiche_horaire.horaires = []
            fiche_horaire.notes = []

            // init horaires - création à vide
            for (var j = 0; j < 25; ++j) {
                fiche_horaire['horaires'].push([])
            }
            
            // init notes avec données navitia
            for (var j = 0; j < data['notes'].length; ++j) {
                ma_note = ''
                for (var k = data['notes'].length - j; k > 0 ; k--) {    
                    ma_note += "*"
                  }
                ma_note += ' : ' + data['notes'][j]['value']
                fiche_horaire['notes'].push(ma_note)
                
            }
            fiche_horaire['notes'].reverse();

            //analyse des données horaires navitia
            for (var i = 0; i < data['stop_schedules'][0]['date_times'].length; ++i) {
                heures = data['stop_schedules'][0]['date_times'][i]['date_time'].slice(9, 11).toString()
                minutes = data['stop_schedules'][0]['date_times'][i]['date_time'].slice(11, 13).toString()

                
                if (data['stop_schedules'][0]['date_times'][i]['links'][0]) // si j'ai une note
                {
                    //minutes += ' '

                    for (var j = 0; j < fiche_horaire.notes.length; ++j) { //je parcours les notes
                        if (data['stop_schedules'][0]['date_times'][i]['links'][0]['id'] == data['notes'][j]['id']) // quand je trouve la bonne
                        {
                            //créer autant d'étoiles en js
                            for (var k = data['notes'].length - j; k > 0 ; k--) {
                                
                                minutes += "*"
                            }
                        }
                    }
                }

                fiche_horaire.horaires[parseInt(heures)].push(minutes)
            }

            //console.log(JSON.stringify(fiche_horaire)); //DEBUG
            display_FH(fiche_horaire)
            

   
        }
        });
    
}

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}