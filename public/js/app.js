/*v0.0.1
var template = '<div class="row">'+	'<div class="col-sm-12 col-md-12">'+
					'<div class="thumbnail">' +
						'<div class="caption">' +
							'<h3> Hi, my name is __name__</h3>' +
							'<p><a data-show-url="__url__" class="btn btn-primary about" role="button">Button</a></p>' +
						'</div>' +
					'</div>' +
				'</div>'+'</div>';
$(document).ready(function(){
	var actualiza = function(response){
		$("#total").text(response.results.length);
		var personajes = "";
		$.each(response.results, function(i,personaje){
			personajes += template.replace("__name__", personaje.name).replace("__url__", personaje.url);
		});
		$("#people").html(personajes);
		$("#next").attr("data-url", response.next);
		$("#previous").attr("data-url", response.previous);
		if(!response.next){
			$("#next").fadeOut();
		}else{
			$("#next").fadeIn();
		}
		if(!response.previous){
			$("#previous").fadeOut();
		}else{
			$("#previous").fadeIn();
		}
	};

	$.getJSON("http://swapi.co/api/people/",actualiza);

	$("#next").click(function(e){
		e.preventDefault();
		var url = $(this).attr("data-url");
		$.getJSON(url, actualiza);
	});
	$("#previous").click(function(e){
		e.preventDefault();
		var url = $(this).attr("data-url");
		$.getJSON(url, actualiza);
	});

	$("#people").on("click",".about",function(e){
		e.preventDefault();
		console.log("hi");
	})
});
*/
var plantilla = '<option class="opcion-especie" value="__valor__">__familia__</option>';
var plantilla2 = '<div class="row">'+
	'<div class="col-sm-12 col-md-12">'+
			'<div class="thumbnail cuadro">' +
				'<div class="caption">' +
					'<h3> Hi, my name is __name__</h3>' +
					'<p><a data-show-url="__url__" class="btn btn-primary about" role="button">Button</a></p>' +
				'</div>' +
			'</div>' +
		'</div>'+
	'</div>';
$(document).ready(function(){
	$.getJSON("https://swapi.co/api/species/", function(response){
		var especies = "";
		$.each(response.results, function(i,especie){
			var value = "";
			var semiURL ="http://swapi.co/api/people/";
			$.each(especie.people, function(i,url){
				value += url.replace(semiURL,"");
			});
			especies += plantilla
				.replace("__familia__", especie.name)
				.replace("__valor__",value.substring(0,value.length-1));
		});
		$("#select").append(especies);
	});
});
$(".container").on("change","#select",function(){
	$("#contenedor").html("");
	var numeroURL = $(this).val().split("/");
	for(var i=0; i<numeroURL.length;i++){
		$.getJSON("https://swapi.co/api/people/"+numeroURL[i]+"/",function(response){
			var plantillaLlena = plantilla2.replace("__name__",response.name);
			$("#contenedor").append(plantillaLlena);
		});
	};
});
