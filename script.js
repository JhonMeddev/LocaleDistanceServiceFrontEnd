// Anexa um manipulador de envio ao formulário
$( "#searchForm" ).submit(function( event ) {
    
 
    // Evita que o formulário faça seu envio normal
    event.preventDefault();
   
    // Obtém alguns valores dos elementos da página:
    var $form = $( this ),
      term = $form.find( "input[name='n1']" ).val(),
      term1 = $form.find( "input[name='n2']" ).val(),
      url = $form.attr( "action" );

      if (term != "" && term1 != ""){

        //Preenche os campos com "..." enquanto consulta webservice.
        $("#distancia").val("...");

     // Envia os dados usando post
            $.ajax({
            type: "POST",
            url: "http://localhost:8080/hello-world/",
            data: JSON.stringify({
                n1: term,
                n2: term1,
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function(dados){
                $("#placeholder").text("")
                $(".distancia").css("display","flex")

                //Atualiza os campos com os valores da consulta.
                $("#local1").text(dados.waypoints[0].name);
                $("#local2").text(dados.waypoints[1].name);
                var distancia = dados.routes[0].distance
                $("#distancia").text(distancia);
                $('.km').mask('000.000,0'+' KM', {reverse: true});
                
        },
            error: function(err) {
                $("#local1").text("");
                $("#local2").text("");
                $("#distancia").text("");
                $(".distancia").css("")
                alert("Coordenadas não encontrada.");
            }
        });
    }
   
  });