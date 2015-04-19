window.addEventListener("load", function() {
  console.log("Bienvenue sur la page d'ajout");
});

code_arret = ''

$(document).ready(function(){
    /* gestion de l'authentification navitia */
    $.ajaxSetup( {
    beforeSend: function(xhr) { xhr.setRequestHeader("Authorization", "Basic " + btoa(navitia_api_key + ":" )); }
    });
    
    /* autocomplétion sur zone d'arrêt */
   $( "#stop_area_search" ).autocomplete({
         source: function( request, response) {
         $.ajax({
            url: "https://api.navitia.io/v1/coverage/"+ navitia_coverage + "/places?type[]=stop_area",
            dataType: "json",
            data: {
            q: request.term
            },
            success: function( data ) {
               ListData = [];
               for (var i = 0; i < data['places'].length; i++) {
                  //ListData.push(data['places'][i]['name'])
                  ListData.push({"id": data['places'][i]['id'], "value": data['places'][i]['name']})
                  }
               //console.log(ListData)
               response(ListData);
               code_arret = data['places'][0]['id']
               }
            });
         },
         minLength: 3,
         select: function(event, ui){
             code_arret = ui.item.id;
             }
       
   });
});

    /* affichage des routes */
   $("#addbutton").on('click', function () {      
           if ($('#stop_area_search').val()!='')
            {  
             //vider la liste des routes
                document.getElementById("directions_list").innerHTML = '';
                
             //appeler navitia et afficher les résultats
             console.log('appel navitia : récupération des lignes et directions')
             navitia_params = "physical_modes/physical_mode:Bus/stop_areas/" + code_arret + "/routes"
             $.ajax({
                    url: "https://api.navitia.io/v1/coverage/"+ navitia_coverage + "/" + navitia_params,
                    dataType: "json",
                    success: function( data ) {
                       //console.log(data) // DEBUG
                       for (var i = 0; i < data['routes'].length; i++) {
                          var elem_dir = document.createElement("div");
                          elem_dir.innerHTML ='<a href="FH.html#fromadd?route='+ data['routes'][i]['id'] +'&arret='+  code_arret +'">Ligne '+data['routes'][i]['line']['code'] +", direction "+ data['routes'][i]['direction']['name'] +'</a>';
                          elem_dir.className = "elem_dir";
                          document.getElementById("directions_list").appendChild(elem_dir);
                       }
                       }
                    });

            }
    });

var $list = document.getElementById("list");
$list.onclick = function(){
  window.location.href = "liste.html";
}
