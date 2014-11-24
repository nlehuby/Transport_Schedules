var online = false; // We'll assume we aren't online.

var fiche_horaire = {};

var qsRoute = getParameterByName('route');
var qsArret = getParameterByName('arret');

check_offline();

function check_offline(){
    // are-we online ?
    var request = new window.XMLHttpRequest({mozSystem: true});
    request.open('HEAD', 'http://www.mozilla.org/robots.txt', true);
    request.timeout = 1000;

    request.addEventListener('load', function(event) {
       console.log('Are we online ?', event);
       online = true;
       if (online == true)
    {
       console.log(qsArret)
       console.log('Affichage FH depuis navitia')
       Navitia_get_FH(qsArret,qsRoute);
    }
    else
    {
        console.log(qsArret)
        console.log('Affichage FH depuis localStorage')
        localStorage_get_FH(qsArret,qsRoute);
    }
    });

    var offlineAlert = function(event) {
       console.log('We are likely offline:', event);
         localStorage_get_FH(qsArret,qsRoute);
    }

    request.addEventListener('error', offlineAlert);
    request.addEventListener('timeout', offlineAlert);

    request.send(null);

    
}

$(document).ready(function(){
    $.ajaxSetup( {
    xhr: function() {return new window.XMLHttpRequest({mozSystem: true});}
    });
    
    
  
});

function localStorage_get_FH(Arret, Route){
    console.log('Affichage FH depuis localStorage')
    
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
    console.log(FH_data_object)
            document.getElementById("arret").innerHTML = FH_data_object.arret;
            document.getElementById("ligne").innerHTML = FH_data_object.ligne;
            document.getElementById("direction").innerHTML = FH_data_object.direction;
            
            var j = 0;
            while (j < FH_data_object.minuit.length)
            {
                var span_min = document.createElement("span");
                span_min.innerHTML = FH_data_object.minuit[j];
                document.getElementById("min00").appendChild(span_min);
                ++j;
            }
            j = 0;
            while (j < FH_data_object.unAM.length)
            {
                var span_min = document.createElement("span");
                span_min.innerHTML = FH_data_object.unAM[j];
                document.getElementById("min01").appendChild(span_min);
                ++j;
            }
            j = 0;
            while (j < FH_data_object.deuxAM.length)
            {
                var span_min = document.createElement("span");
                span_min.innerHTML = FH_data_object.deuxAM[j];
                document.getElementById("min02").appendChild(span_min);
                ++j;
            }
            j = 0;
            while (j < FH_data_object.troisAM.length)
            {
                var span_min = document.createElement("span");
                span_min.innerHTML = FH_data_object.troisAM[j];
                document.getElementById("min03").appendChild(span_min);
                ++j;
            }
            j = 0;
            while (j < FH_data_object.quatreAM.length)
            {
                var span_min = document.createElement("span");
                span_min.innerHTML = FH_data_object.quatreAM[j];
                document.getElementById("min04").appendChild(span_min);
                ++j;
            }
            j = 0;
            while (j < FH_data_object.cinqAM.length)
            {
                var span_min = document.createElement("span");
                span_min.innerHTML = FH_data_object.cinqAM[j];
                document.getElementById("min05").appendChild(span_min);
                ++j;
            }
            j = 0;
            while (j < FH_data_object.sixAM.length)
            {
                var span_min = document.createElement("span");
                span_min.innerHTML = FH_data_object.sixAM[j];
                document.getElementById("min06").appendChild(span_min);
                ++j;
            }
            j = 0;
            while (j < FH_data_object.septAM.length)
            {
                var span_min = document.createElement("span");
                span_min.innerHTML = FH_data_object.septAM[j];
                document.getElementById("min07").appendChild(span_min);
                ++j;
            }
            j = 0;
            while (j < FH_data_object.huitAM.length)
            {
                var span_min = document.createElement("span");
                span_min.innerHTML = FH_data_object.huitAM[j];
                document.getElementById("min08").appendChild(span_min);
                ++j;
            }
            j = 0;
            while (j < FH_data_object.neufAM.length)
            {
                var span_min = document.createElement("span");
                span_min.innerHTML = FH_data_object.neufAM[j];
                document.getElementById("min09").appendChild(span_min);
                ++j;
            }
            j = 0;
            while (j < FH_data_object.dixAM.length)
            {
                var span_min = document.createElement("span");
                span_min.innerHTML = FH_data_object.dixAM[j];
                document.getElementById("min10").appendChild(span_min);
                ++j;
            }
            j = 0;
            while (j < FH_data_object.onzeAM.length)
            {
                var span_min = document.createElement("span");
                span_min.innerHTML = FH_data_object.onzeAM[j];
                document.getElementById("min11").appendChild(span_min);
                ++j;
            }
            j = 0;
            while (j < FH_data_object.midi.length)
            {
                var span_min = document.createElement("span");
                span_min.innerHTML = FH_data_object.midi[j];
                document.getElementById("min12").appendChild(span_min);
                ++j;
            }
            j = 0;
            while (j < FH_data_object.unPM.length)
            {
                var span_min = document.createElement("span");
                span_min.innerHTML = FH_data_object.unPM[j];
                document.getElementById("min13").appendChild(span_min);
                ++j;
            }
            j = 0;
            while (j < FH_data_object.deuxPM.length)
            {
                var span_min = document.createElement("span");
                span_min.innerHTML = FH_data_object.deuxPM[j];
                document.getElementById("min14").appendChild(span_min);
                ++j;
            }
            j = 0;
            while (j < FH_data_object.troisPM.length)
            {
                var span_min = document.createElement("span");
                span_min.innerHTML = FH_data_object.troisPM[j];
                document.getElementById("min15").appendChild(span_min);
                ++j;
            }
            j = 0;
            while (j < FH_data_object.quatrePM.length)
            {
                var span_min = document.createElement("span");
                span_min.innerHTML = FH_data_object.quatrePM[j];
                document.getElementById("min16").appendChild(span_min);
                ++j;
            }
            j = 0;
            while (j < FH_data_object.cinqPM.length)
            {
                var span_min = document.createElement("span");
                span_min.innerHTML = FH_data_object.cinqPM[j];
                document.getElementById("min17").appendChild(span_min);
                ++j;
            }
            j = 0;
            while (j < FH_data_object.sixPM.length)
            {
                var span_min = document.createElement("span");
                span_min.innerHTML = FH_data_object.sixPM[j];
                document.getElementById("min18").appendChild(span_min);
                ++j;
            }
            j = 0;
            while (j < FH_data_object.septPM.length)
            {
                var span_min = document.createElement("span");
                span_min.innerHTML = FH_data_object.septPM[j];
                document.getElementById("min19").appendChild(span_min);
                ++j;
            }
            j = 0;
            while (j < FH_data_object.huitPM.length)
            {
                var span_min = document.createElement("span");
                span_min.innerHTML = FH_data_object.huitPM[j];
                document.getElementById("min20").appendChild(span_min);
                ++j;
            }
            j = 0;
            while (j < FH_data_object.neufPM.length)
            {
                var span_min = document.createElement("span");
                span_min.innerHTML = FH_data_object.neufPM[j];
                document.getElementById("min21").appendChild(span_min);
                ++j;
            }
            j = 0;
            while (j < FH_data_object.dixPM.length)
            {
                var span_min = document.createElement("span");
                span_min.innerHTML = FH_data_object.dixPM[j];
                document.getElementById("min22").appendChild(span_min);
                ++j;
            }
            j = 0;
            while (j < FH_data_object.onzePM.length)
            {
                var span_min = document.createElement("span");
                span_min.innerHTML = FH_data_object.onzePM[j];
                document.getElementById("min23").appendChild(span_min);
                ++j;
            }              
}

function Navitia_get_FH(code_arret,code_route)  {
   console.log('appel navitia : récupération de la fiche horaire')
   var navitia_params = "stop_areas/" + code_arret + "/routes/" + code_route + "/stop_schedules?date_time=20141122T010000";
   $.ajax({
        url: "http://"+ navitia_api_key+":@api.navitia.io/v1/coverage/"+ navitia_coverage + "/" + navitia_params,
        dataType: 'json',
        global: true,
        error: function(data) {console.log(data); localStorage_get_FH(qsArret,qsRoute);},
        success: function(data) {
            //console.log(data)
            fiche_horaire.code_arret = data['stop_schedules'][0]['stop_point']['stop_area']['id']
            fiche_horaire.code_route =  data['stop_schedules'][0]['route']['id']            
            fiche_horaire.arret = data['stop_schedules'][0]['stop_point']['name']
            fiche_horaire.ligne = data['stop_schedules'][0]['route']['line']['code']
            fiche_horaire.direction = data['stop_schedules'][0]['route']['direction']['stop_point']['name']
            fiche_horaire.minuit = []
            fiche_horaire.unAM = []
            fiche_horaire.deuxAM = []
            fiche_horaire.troisAM = []
            fiche_horaire.quatreAM = []
            fiche_horaire.cinqAM = []
            fiche_horaire.sixAM = []
            fiche_horaire.septAM = []
            fiche_horaire.huitAM = []
            fiche_horaire.neufAM = []
            fiche_horaire.dixAM = []
            fiche_horaire.onzeAM = []
            fiche_horaire.midi = []
            fiche_horaire.unPM = []
            fiche_horaire.deuxPM = []
            fiche_horaire.troisPM = []
            fiche_horaire.quatrePM = []
            fiche_horaire.cinqPM = []
            fiche_horaire.sixPM = []
            fiche_horaire.septPM = []
            fiche_horaire.huitPM = []
            fiche_horaire.neufPM = []
            fiche_horaire.dixPM = []
            fiche_horaire.onzePM = []
            fiche_horaire.notes = []

            //parcours des notes - à ajouter quand une section sera prévue dans le HTML (TODO)
            /*
            for (var j = 0; j < data['notes'].length; ++j) {
                fiche_horaire['notes'].push(data['notes'][j]['value'])
            }*/

            for (var i = 0; i < data['stop_schedules'][0]['date_times'].length; ++i) {
                heures = data['stop_schedules'][0]['date_times'][i]['date_time'].slice(9, 11).toString()
                minutes = data['stop_schedules'][0]['date_times'][i]['date_time'].slice(11, 13).toString()

                /*
                if (data['stop_schedules'][0]['date_times'][i]['links'][0]) // si j'ai une note
                {
                    minutes += ' '

                    for (var j = 0; j < fiche_horaire.notes.length; ++j) { //je parcours les notes
                        if (data['stop_schedules'][0]['date_times'][i]['links'][0]['id'] == data['notes'][j]['id']) // quand je trouve la bonne
                        {
                            //créer autant d'étoiles en js
                            for (var k = 0; k <= j; k++) {
                                
                                minutes += "*"
                            }
                        }
                    }
                }*/

                if (heures == '13') {
                    fiche_horaire.unPM.push(minutes)
                }
                if (heures == '14') {
                    fiche_horaire.deuxPM.push(minutes)
                }
                if (heures == '15') {
                    fiche_horaire.troisPM.push(minutes)
                }
                if (heures == '16') {
                    fiche_horaire.quatrePM.push(minutes)
                }
                if (heures == '17') {
                    fiche_horaire.cinqPM.push(minutes)
                }
                if (heures == '18') {
                    fiche_horaire.sixPM.push(minutes)
                }
                if (heures == '19') {
                    fiche_horaire.septPM.push(minutes)
                }
                if (heures == '20') {
                    fiche_horaire.huitPM.push(minutes)
                }
                if (heures == '21') {
                    fiche_horaire.neufPM.push(minutes)
                }
                if (heures == '22') {
                    fiche_horaire.dixPM.push(minutes)
                }
                if (heures == '23') {
                    fiche_horaire.onzePM.push(minutes)
                }
                if (heures == '00') {
                    fiche_horaire.minuit.push(minutes)
                }
                if (heures == '01') {
                    fiche_horaire.unAM.push(minutes)
                }
                if (heures == '02') {
                    fiche_horaire.deuxAM.push(minutes)
                }
                if (heures == '03') {
                    fiche_horaire.troisAM.push(minutes)
                }
                if (heures == '04') {
                    fiche_horaire.quatreAM.push(minutes)
                }
                if (heures == '05') {
                    fiche_horaire.cinqAM.push(minutes)
                }
                if (heures == '06') {
                    fiche_horaire.sixAM.push(minutes)
                }
                if (heures == '07') {
                    fiche_horaire.septAM.push(minutes)
                }
                if (heures == '08') {
                    fiche_horaire.huitAM.push(minutes)
                }
                if (heures == '09') {
                    fiche_horaire.neufAM.push(minutes)
                }
                if (heures == '10') {
                    fiche_horaire.dixAM.push(minutes)
                }
                if (heures == '11') {
                    fiche_horaire.onzeAM.push(minutes)
                }
                if (heures == '12') {
                    fiche_horaire.midi.push(minutes)
                }
            }

            console.log(JSON.stringify(fiche_horaire));
            display_FH(fiche_horaire)
            
            var $add = document.getElementById("add");
$add.onclick = function(){
  alert("Sélection horaire enregistrée.");
    localStorage.setItem(fiche_horaire.code_arret+':'+fiche_horaire.code_route, JSON.stringify(fiche_horaire));
}
   
        }
        });
    
}



var $list = document.getElementById("list");
$list.onclick = function(){
  window.location.href = "liste.html";
}

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
