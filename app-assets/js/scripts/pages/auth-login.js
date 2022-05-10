/*=========================================================================================
  File Name: auth-login.js
  Description: Auth login js file.
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy  - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: PIXINVENT
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/
$(document).ready(function(){
  $("#c_usuario").keypress(function(e) {
      //no recuerdo la fuente pero lo recomiendan para
      //mayor compatibilidad entre navegadores.
      var code = (e.keyCode ? e.keyCode : e.which);
      if(code==13){
        $("#c_clave").focus();
      }
  });
  $("#c_clave").keypress(function(e) {
      //no recuerdo la fuente pero lo recomiendan para
      //mayor compatibilidad entre navegadores.
      var code = (e.keyCode ? e.keyCode : e.which);
      if(code==13){
          $(".Acceder").click();
      }
  });
});


$(function () {
  'use strict';

  var pageLoginForm = $('.auth-login-form');
  
  // jQuery Validation
  // --------------------------------------------------------------------
 

  $(".Acceder").click(function(){ 
    
    //variable
    var parametros = {
      "c_usuario" : $('#c_usuario').val().toUpperCase() ,
      "c_clave" : $('#c_clave').val().toUpperCase() ,
       "tipo": $('#tipo').val()
    };

    //validacion
		pageLoginForm.validate({
      rules: {
        'c_usuario': {
          required: true,
          email: false
        },
        'c_clave': {
          required: true
        }
      }
    });

    if($('#c_usuario').val()=='' || $('#c_clave').val()==''){
       $("#resultado").html("Los campos de usuario y clave son requeridos"); 
       return false;
    }


    //peticion api
    $.ajax({
      type: 'POST', 
      url: getCookie('api')+'auth/login', 
      data: parametros,
      beforeSend: function () {
        $("#resultado").html("Procesando, espere por favor...");
        $('.Acceder').addClass('disabled');
      },
      success:  function (data) {

        //Conexion Correcta
        if(data.access_token){
            $("#resultado").html("");
            sessionStorage.setItem("token", "Bearer "+data.access_token);
            sessionStorage.setItem("inicioSesion", 1);
            document.cookie = "token=Bearer "+data.access_token+";  path=/";
            //
            $.ajax({
              type: 'POST', 
              url: 'auth', 
              data: data,
              success:  function (data) {
                //localStorage.setItem('menu',JSON.stringify(data.menu));
                //var oldData=localStorage.getItem("menu")
                //var oldString=JSON.parse(oldData)
                //alert(oldString)
                window.location.href="/reportes/";
              }
            });
            //
        }else{
          $("#resultado").html("");
          alert(data.error)
          sessionStorage.clear()
          localStorage.clear()
          $('.Acceder').removeClass('disabled');
        }
            
      }
    }).fail(function (jqXHR, textStatus, errorThrown){
        $("#resultado").html("Error al consultar el servicio: "+ textStatus +" "+ errorThrown); 
        $('.Acceder').removeClass('disabled');

    });

    


	});

  
});

