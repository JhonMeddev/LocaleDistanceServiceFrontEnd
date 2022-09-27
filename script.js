
        $(document).ready(function() {

            function limpa_formulário() {
                // Limpa valores do formulário de coordenadas.
                $("#n1").text("");
                $("#n2").text("");
            }
            
            //Quando o campo cep perde o foco.
            $("#n2").blur(function() {

                //Novas variáveis "n1" e "n2".
                var n1 = $("#n1").val();
                var n2 = $("#n2").val();

                //Verifica se os campos possui valor informado.
                if (n1 != "" && n2 != "") {

                    $("#placeholder").text("")
                    $(".distancia").css("display","flex")

                        //Preenche os campos com "..." enquanto consulta webservice.
                        $("#distancia").val("...");

                        //Consulta o webservice viacep.com.br/
                        $.getJSON("https://router.project-osrm.org/route/v1/driving/"+ n1 + ";" + n2 , function(dados) {

                            if (!("erro" in dados)) {
                                //Atualiza os campos com os valores da consulta.
                                $("#local1").text(dados.waypoints[0].name);
                                $("#local2").text(dados.waypoints[1].name);
                                $("#distancia").text(dados.routes[0].distance + " KM");

                            } //end if.
                            else {
                                //CEP pesquisado não foi encontrado.
                                limpa_formulário();
                                alert("Coordenadas não encontrado.");
                            }
                        });

                } //end if.
                else {
                    //cep sem valor, limpa formulário.
                    limpa_formulário();
                }
            });

        });