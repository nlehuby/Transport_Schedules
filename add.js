window.addEventListener("load", function() {
  console.log("Bienvenue sur la page d'ajout");
});

code_arret = ''

function Navitia_get_directions_from_stop_area(code)  {
   console.log('appel navitia : récupération des lignes et directions')
     navitia_params = "physical_modes/physical_mode:Bus/stop_areas/" + code + "/routes"
     $.ajax({
            url: "http://"+ navitia_api_key+":@api.navitia.io/v1/coverage/"+ navitia_coverage + "/" + navitia_params,
            dataType: "json",
            success: function( data ) {
               console.log(data)
               for (var i = 0; i < data['routes'].length; i++) {
                  var elem_dir = document.createElement("div");
                  elem_dir.innerHTML ='<a href="index.html?route='+ data['routes'][i]['id'] +'&arret='+  code +'">Ligne '+data['routes'][i]['line']['code'] +", direction "+ data['routes'][i]['direction']['name'] +'</a>';
                  elem_dir.className = "elem_dir";
                  document.getElementById("directions_list").appendChild(elem_dir);
               }
               }
            });
};


$(document).ready(function(){


    $.ajaxSetup( {
    xhr: function() {return new window.XMLHttpRequest({mozSystem: true});}
    });
/* autocomplete stop_area */
   $( "#stop_area_search" ).autocomplete({
         source: function( request, response) {
         $.ajax({
            url: "http://"+ navitia_api_key+":@api.navitia.io/v1/coverage/"+ navitia_coverage + "/places?type[]=stop_area",
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
         minLength: 3
   });
});

   $("#addbutton").on('click', function () {      
           if ($('#stop_area_search').val()!='')
            {  
             //récupérer l'id du stop_area sélectionné par l'utilisateur
             for (var i = 0; i <ListData.length; i++) {
                if (ListData[i]['value'] == $('#stop_area_search').val()){
                   code_arret = ListData[i]['id']
                } 
             }
             //vider la liste des routes
                 //TODO
             //appeler navitia et afficher les résultats
             Navitia_get_directions_from_stop_area(code_arret)  

            //$('#stop_area_search').val("");
            }
    });

var $list = document.getElementById("list");
$list.onclick = function(){
  window.location.href = "liste.html";
}
