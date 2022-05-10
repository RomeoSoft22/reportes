/*=========================================================================================
    File Name: app-user-list.js
    Description: User List page
    --------------------------------------------------------------------------------------
    Item Name: Vuexy  - Vuejs, HTML & Laravel Admin Dashboard Template
    Author: PIXINVENT
    Author URL: http://www.themeforest.net/user/pixinvent

==========================================================================================*/
$(function () {
  ('use strict');

  var url_api = getCookie('api'),
    consultaSQL = "user",
    dtUserTable = $('.user-list-table'),
    newUserSidebar = $('.new-user-modal'),
    newUserForm = $('.add-new-user'),
    editUserSidebar = $('.edit-user-modal'),
    editUserForm = $('.edit-user'),
    statusObj = {
      'P': { title: 'Pendiente', class: 'badge-light-warning' },
      'S': { title: 'Activo', class: 'badge-light-success' },
      'N': { title: 'Inactivo', class: 'badge-light-secondary' }
    };

  // Carga inicial 
  if (dtUserTable.length) {
    //manejo de errores de dataTable
    $.fn.dataTable.ext.errMode = 'throw';

    var tabla = dtUserTable.DataTable({
      ajax: {
        url : url_api+consultaSQL, // JSON file to add data
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', sessionStorage.getItem('token'));
        },
      },
      dataType: 'json',
      contentType: 'application/json',
      processData: true,
      //type: "GET", 
      columns: [
        // columns according to JSON
        { data: '' },
        { data: 'n_usuario' },
        { data: 'n_perfil' },
        { data: 'x_perfil' },
        { data: 'c_usuario' },
        { data: 'x_nombres' },
        { data: 'x_ape_paterno' },
        { data: 'x_ape_materno' },
        { data: 'x_dni' },
        { data: 'f_registro' },
        { data: 'f_ultimo_ing' },
        { data: 'l_activo' },
        { data: '' }
      ],
      columnDefs: [
        {
          // For Responsive
          className: 'control',
          orderable: false,
          responsivePriority: 2,
          targets: 0,
          render: function (data, type, full, meta) {
            return '';
          }
        },
        {
          // User full name and username
          targets: 1,
          responsivePriority: 4,
          render: function (data, type, full, meta) {
            var $name = full['n_usuario'];            
            return $name;
          }
        },
        {
          // User Role
          targets: 2,
          render: function (data, type, full, meta) {
            var $role = full['x_perfil'];
            return $role;
          }
        },
        {
          // User Role
          visible:false,
          targets: 3,
          render: function (data, type, full, meta) {
            var $role = full['n_perfil'];
            return $role;
          }
        },
        {
          // User full name and username
          targets: 4,
          render: function (data, type, full, meta) {
            var $name = full['c_usuario'];            
            return $name;
          }
        },
        {
          // User full name and username
          targets: 5,
          render: function (data, type, full, meta) {
            var $name = full['x_nombres'];            
            return $name;
          }
        },
        {
          // User full name and username
          targets: 6,
          render: function (data, type, full, meta) {
            var $name = full['x_ape_paterno'];            
            return $name;
          }
        },   
        {
          // User full name and username
          targets: 7,
          render: function (data, type, full, meta) {
            var $name = full['x_ape_materno'];            
            return $name;
          }
        },
        {
          // User full name and username
          targets: 8,
          render: function (data, type, full, meta) {
            var $name = full['x_dni'];            
            return $name;
          }
        },
        {
          // User full name and username
          targets: 9,
          render: function (data, type, full, meta) {
            var $name = full['f_registro'];            
            return $name;
          }
        },      
        {
          // User Role
          targets: 10,
          render: function (data, type, full, meta) {
            var $role = full['f_ultimo_ing'].substring(0,19);
            return $role;
          }
        },
        {
          // User Status
          targets: 11,
          render: function (data, type, full, meta) {
            var $status = full['l_activo'];

            return (
              '<span class="badge rounded-pill ' +
              statusObj[$status].class +
              '" text-capitalized>' +
              statusObj[$status].title +
              '</span>'
            );
          }
        },
        {
          // Actions
          targets: -1,
          title: 'Acción',
          orderable: false,
          render: function (data, type, full, meta) {
            var opciones = "";
            opciones = '<div class="btn-group">' +
              '<a class="btn btn-sm dropdown-toggle hide-arrow" data-bs-toggle="dropdown">' +
              feather.icons['more-vertical'].toSvg({ class: 'font-small-4' }) +
              '</a>' +
              '<div class="dropdown-menu dropdown-menu-end">' +
              '<a href="'+full['n_perfil']+'/edit'+
              '" class="dropdown-item editar" data-bs-toggle="modal" data-bs-target="#editUser">' +
              feather.icons['edit'].toSvg({ class: 'font-small-4 me-50' }) +
              'Editar</a>' +
              '<a href="javascript:;" class="dropdown-item delete-record eliminar">' +
              feather.icons['trash-2'].toSvg({ class: 'font-small-4 me-50' }) +
              'Eliminar</a></div>' +
              '</div>' +
              '</div>'

            return (
              opciones
            );
          }
        }
      ],
      order: [[1, 'asc']],
      dom:
        '<"d-flex justify-content-between align-items-center header-actions mx-2 row mt-75"' +
        '<"col-sm-12 col-lg-4 d-flex justify-content-center justify-content-lg-start" l>' +
        '<"col-sm-12 col-lg-8 ps-xl-75 ps-0"<"dt-action-buttons d-flex align-items-center justify-content-center justify-content-lg-end flex-lg-nowrap flex-wrap"<"me-1"f>B>>' +
        '>t' +
        '<"d-flex justify-content-between mx-2 row mb-1"' +
        '<"col-sm-12 col-md-6"i>' +
        '<"col-sm-12 col-md-6"p>' +
        '>',
      language: {
        LengthMenu: 'Mostrar _MENU_ ',
        search: 'Buscar',
        searchPlaceholder: 'Buscar..'
      },
      // Buttons with Dropdown
      buttons: [
        {
          extend: 'collection',
          className: 'btn btn-outline-secondary dropdown-toggle me-2',
          text: feather.icons['external-link'].toSvg({ class: 'font-small-4 me-50' }) + 'Exportar',
          buttons: [
            {
              extend: 'print',
              text: feather.icons['printer'].toSvg({ class: 'font-small-4 me-50' }) + 'Imprimir',
              className: 'dropdown-item',
              exportOptions: { columns: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] }
            },
            {
              extend: 'csv',
              text: feather.icons['file-text'].toSvg({ class: 'font-small-4 me-50' }) + 'Csv',
              className: 'dropdown-item',
              exportOptions: { columns: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] }
            },
            {
              extend: 'excel',
              text: feather.icons['file'].toSvg({ class: 'font-small-4 me-50' }) + 'Excel',
              className: 'dropdown-item',
              exportOptions: { columns: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] }
            },
            {
              extend: 'pdf',
              text: feather.icons['clipboard'].toSvg({ class: 'font-small-4 me-50' }) + 'Pdf',
              className: 'dropdown-item',
              exportOptions: { columns: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] }
            },
            {
              extend: 'copy',
              text: feather.icons['copy'].toSvg({ class: 'font-small-4 me-50' }) + 'Copiar',
              className: 'dropdown-item',
              exportOptions: { columns: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] }
            }
          ],
          init: function (api, node, config) {
            $(node).removeClass('btn-secondary');
            $(node).parent().removeClass('btn-group');
            setTimeout(function () {
              $(node).closest('.dt-buttons').removeClass('btn-group').addClass('d-inline-flex mt-50');
            }, 50);
          }
        },
        {
          text: 'Nuevo',
          className: 'add-new btn btn-primary me-1',
          attr: {
            'data-bs-toggle': 'modal',
            'data-bs-target': '#newUser'
          },
          init: function (api, node, config) {
            $(node).removeClass('btn-secondary');
          }
        }
      ],
      // For responsive popup
      responsive: {
        details: {
          display: $.fn.dataTable.Responsive.display.modal({
            header: function (row) {
              var data = row.data();
              return 'Detalle del usuario : ' + data['c_usuario'];
            }
          }),
          type: 'column',
          renderer: function (api, rowIdx, columns) {
            var data = $.map(columns, function (col, i) {
              return col.columnIndex !== 12 // ? Do not show row in modal popup if title is blank (for check box)
                ? '<tr data-dt-row="' +
                    col.rowIdx +
                    '" data-dt-column="' +
                    col.columnIndex +
                    '">' +
                    '<td>' +
                    col.title +
                    ':' +
                    '</td> ' +
                    '<td>' +
                    col.data +
                    '</td>' +
                    '</tr>'
                : '';
            }).join('');
            return data ? $('<table class="table"/>').append('<tbody>' + data + '</tbody>') : false;
          }
        }
      },
      language: {
        paginate: {
          // remove previous & next text from pagination
          previous: '&nbsp;',
          next: '&nbsp;'
        }
      },initComplete: function () {
      }
    });
  }

  // NEW REGISTRO
  if (newUserForm.length) {
    newUserForm.validate({
      errorClass: 'error',
      rules: {
        'edit_n_usuario': {
          required: true
        },
        'edit_x_dni': {
          required: true,
          maxlength:8
        },
        'edit_x_nombres': {
          required: true
        },
        'edit_x_ape_paterno': {
          required: true
        },
        'edit_x_ape_materno': {
          required: true
        },
        'edit_n_perfil': {
          required: true
        },
        'edit_l_activo': {
          required: true
        }
      }
    });

    newUserForm.on('submit', function (e) {
      var isValid = newUserForm.valid();
      e.preventDefault();
      if (isValid) {
        $.ajax({
            type: 'POST',
            dataType: "json",
            url: url_api + consultaSQL,
            headers: {
                "Authorization" : sessionStorage.getItem('token')
            },
            data: $('#add-new-user').serialize()
            }).done(function( msg ) { 
              if(!msg.error){
                newUserSidebar.modal('hide');
                tabla.ajax.reload(null,false);
                //limpiamos formulario
                limpiar()
                alertPrev('success', 'Creado Correctamente',msg.error)                

              }else{
                  alertPrev('warning', 'Validación',msg.error)
              }                 


            }).fail(function (jqXHR, textStatus, errorThrown){
              alertPrev('info', 'Problemas al consumir el servicio!',"El siguiente error ha ocurrido: "+ textStatus +" "+ errorThrown)
         });
        
      }
    });
  }


  //CARGA DATOS PARA EDIT
  $('.user-list-table tbody').on('click', 'tr td div div a.editar', function () {
      var fila = $(this).closest('tr');
      var id = parseInt(fila.find('td:eq(1)').text());
      var section = $(".edit-user");

      if(id!=""){
        $.ajax({
            type: 'GET',
            dataType: "json",
            headers: {
                "Authorization" : sessionStorage.getItem('token')
            },
            url: url_api + consultaSQL+'/'+id,
            beforeSend: function() {
              limpiar()
              section.block({
                message: '<div class="spinner-border text-primary" role="status"></div>',
                timeout: 15000,
                css: {
                  backgroundColor: 'transparent',
                  border: '0'
                },
                overlayCSS: {
                  backgroundColor: '#fff',
                  opacity: 0.8
                }
              });
            },
            complete: function(){
              section.unblock(); 
            }
            }).done(function( msg ) { 
              if(!msg.error){
                if(!msg.message){
                  $("#edit_n_usuario").val(id);
                  $("#edit_c_usuario").val(msg.c_usuario);
                  $("#edit_x_dni").val(msg.x_dni);
                  $("#edit_x_nombres").val(msg.x_nombres);
                  $("#edit_x_ape_paterno").val(msg.x_ape_paterno);
                  $("#edit_x_ape_materno").val(msg.x_ape_materno);
                  $("#edit_n_perfil").val(msg.n_perfil).trigger('change');
                  $('#edit_l_activo').val(msg.l_activo).trigger('change');
                }else{
                  alertPrev('warning', 'Deberá de autenticar nuevamente',msg.error)
                }
              }else{
                  alertPrev('warning', 'Validación',msg.error)
              }                 


            }).fail(function (jqXHR, textStatus, errorThrown){
              alertPrev('info', 'Problemas al consumir el servicio!',"El siguiente error ha ocurrido: "+ textStatus +" "+ errorThrown);
              console.log('Error:'+jqXHR.responseJSON.message);
        });

      }else{
        limpiar();
      }
      
   
      
  } );



  //proceso de edicion
  if (editUserForm.length) {
    //validacion
    editUserForm.validate({
      errorClass: 'error',
      rules: {
        'edit_n_usuario': {
          required: true
        },
        'edit_x_dni': {
          required: true,
          maxlength:8
        },
        'edit_x_nombres': {
          required: true
        },
        'edit_x_ape_paterno': {
          required: true
        },
        'edit_x_ape_materno': {
          required: true
        },
        'edit_n_perfil': {
          required: true
        },
        'edit_l_activo': {
          required: true
        }
      }
    });

    //evento
    editUserForm.on('submit', function (e) {
      var isValid = editUserForm.valid();
      e.preventDefault();
      if (isValid) {
        $.ajax({
            type: 'PUT',
            dataType: "json",
            headers: {
                "Authorization" : sessionStorage.getItem('token')
            },
            url: url_api + consultaSQL+'/'+$("#edit_n_usuario").val(),
            data: $('.edit-user').serialize()
            }).done(function( msg ) { 
              if(!msg.error){
                tabla.ajax.reload(null,false);
                editUserSidebar.modal('hide');
                //limpiamos formulario
                limpiar()
                alertPrev('success', 'Modificado Correctamente','');
              }else{
                  alertPrev('warning', 'Validación',msg.error)
              }                 


            }).fail(function (jqXHR, textStatus, errorThrown){
              alertPrev('info', 'Problemas al consumir el servicio!',"El siguiente error ha ocurrido: "+ textStatus +" "+ errorThrown);
              console.log('Error:'+jqXHR.responseJSON.message);
         });
        
      }
    });


  }




  //PROCESO PARA ELIMINAR
  $('.user-list-table tbody').on('click', 'tr td div div a.eliminar', function () {
    var fila = $(this).closest('tr');
    var id = parseInt(fila.find('td:eq(1)').text());
    var descripcion = fila.find('td:eq(2)').text();
    
    //validacion SweetAlert
    Swal.fire({
      title: 'Deseas eliminar el registro : '+id,
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, Eliminar!',
      customClass: {
        confirmButton: 'btn btn-primary',
        cancelButton: 'btn btn-outline-danger ms-1'
      },
      buttonsStyling: false
    }).then(function (result) {
      if (result.value) {
        $.ajax({
          type: 'DELETE',
          dataType: "json",
          headers: {
              "Authorization" : sessionStorage.getItem('token')
          },
          url: url_api + consultaSQL+'/'+id,
          data: {"id":id}
          }).done(function( msg ) { 
            if(!msg.error){
              //actualizamos tabla
              tabla.ajax.reload(null,false);
              //mensaje de confirmacion
              alertPrev('success', 'Eliminado Correctamente','');
            }else{
              //mensaje de alerta
              alertPrev('warning', 'Validación',msg.error)
            }                 


          }).fail(function (jqXHR, textStatus, errorThrown){
            alertPrev('info', 'Problemas al consumir el servicio!',"El siguiente error ha ocurrido: "+ textStatus +" "+ errorThrown);
            console.log('Error:'+jqXHR.responseJSON.message);
       });

      }
    });
 
    
} );



function limpiar(){
  $("#edit_n_usuario").val('');
  $("#edit_c_usuario").val('');
  $("#edit_x_dni").val('');
  $("#edit_x_nombres").val('');
  $("#edit_x_ape_paterno").val('');
  $("#edit_x_ape_materno").val('');
  $("#edit_n_perfil").val(1).trigger('change');
  $('#edit_l_activo').val('N').trigger('change');
}
  

});


