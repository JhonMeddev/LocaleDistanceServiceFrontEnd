function testeAJAX(){
    var a = $("#a").val();
    var b = $("#b").val();
    
    $.post( "soma.php", { num1: a, num2: b })
        .done(function( data ) {
            $("#r").html(data);
        });
}