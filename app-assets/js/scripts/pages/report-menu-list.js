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
    consultaSQL = "menu",
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
    var tabla = dtUserTable.DataTable({
      ajax: url_api+consultaSQL, // JSON file to add data
      //dataType: 'json',
      //contentType: 'application/json; charset=utf-8',
      //type: "GET", 
      columns: [
        // columns according to JSON
        { data: '' },
        { data: 'n_menu' },
        { data: 'x_menu' },
        { data: 'x_url' },
        { data: 'x_url_page' },
        { data: 'x_icono' },
        { data: 'n_orden' },
        { data: 'n_nivel' },
        { data: 'f_registro' },
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
            var $name = full['n_menu'];            
            return $name;
          }
        },
        {
          // User Role
          targets: 2,
          render: function (data, type, full, meta) {
            var $role = full['x_menu'];
            return $role;
          }
        },
        {
          // User full name and username
          className: 'hidden',
          visible: false,
          targets: 5,
          render: function (data, type, full, meta) {
            var $name = full['x_icono'];            
            return $name;
          }
        },
        {
          // User full name and username
          className: 'hidden',
          visible: false,
          targets: 6,
          render: function (data, type, full, meta) {
            var $name = full['n_orden'];            
            return $name;
          }
        },
        {
          // User full name and username
          className: 'hidden',
          visible: false,
          targets: 7,
          render: function (data, type, full, meta) {
            var $name = full['n_nivel'];            
            return $name;
          }
        },        
        {
          // User Role
          targets: 8,
          render: function (data, type, full, meta) {
            var $role = full['f_registro'].substring(0,19);
            return $role;
          }
        },
        {
          // User Status
          targets: 9,
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
            var opciones = ""
            if(full['n_menu']==1 || full['n_menu']==19){
                opciones = ''
            }else{
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
            }

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
              exportOptions: { columns: [1, 2, 3, 4, 5, 6] }
            },
            {
              extend: 'csv',
              text: feather.icons['file-text'].toSvg({ class: 'font-small-4 me-50' }) + 'Csv',
              className: 'dropdown-item',
              exportOptions: { columns: [1, 2, 3, 4, 5, 6] }
            },
            {
              extend: 'excel',
              text: feather.icons['file'].toSvg({ class: 'font-small-4 me-50' }) + 'Excel',
              className: 'dropdown-item',
              exportOptions: { columns: [1, 2, 3, 4, 5, 6] }
            },
            {
              extend: 'pdf',
              text: feather.icons['clipboard'].toSvg({ class: 'font-small-4 me-50' }) + 'Pdf',
              className: 'dropdown-item',
              exportOptions: { columns: [1, 2, 3, 4, 5, 6] }
            },
            {
              extend: 'copy',
              text: feather.icons['copy'].toSvg({ class: 'font-small-4 me-50' }) + 'Copiar',
              className: 'dropdown-item',
              exportOptions: { columns: [1, 2, 3, 4, 5, 6] }
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
              return 'Detalle del ' + data['x_menu'];
            }
          }),
          type: 'column',
          renderer: function (api, rowIdx, columns) {
            var data = $.map(columns, function (col, i) {
              return col.columnIndex !== 9 // ? Do not show row in modal popup if title is blank (for check box)
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
      },
      initComplete: function () {
      }
    });
  }

  // NEW REGISTRO
  if (newUserForm.length) {
    newUserForm.validate({
      errorClass: 'error',
      rules: {
        'x_menu': {
          required: true
        },
        'x_url': {
          required: true
        },
        'x_url_page': {
          required: true
        },
        'l_activo': {
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
            url: url_api + consultaSQL+'/'+id,
            beforeSend: function() {
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
                  $("#edit_n_menu").val(id);
                  $("#edit_x_menu").val(msg.x_menu);
                  $("#edit_x_url").val(msg.x_url);
                  $("#edit_x_url_page").val(msg.x_url_page);
                  $("#edit_x_icono").val(msg.x_icono).trigger('change');
                  $("#edit_n_orden").val(msg.n_orden).trigger('change');
                  $("#edit_n_nivel").val(msg.n_nivel).trigger('change');
                  $('#edit_l_activo').val(msg.l_activo).trigger('change');
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
        'edit_x_menu': {
          required: true
        },
        'edit_x_url': {
          required: true
        },
        'edit_x_url_page': {
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
            url: url_api + consultaSQL+'/'+$("#edit_n_menu").val(),
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
  $("#edit_n_menu").val('');
  $("#edit_x_menu").val('');
  $("#edit_x_url").val('');
  $("#edit_x_url_page").val('');
  $("#edit_x_icono").val(0);
  $("#edit_n_orden").val(0);
  $("#edit_n_nivel").val(0);
  $('#edit_l_activo').val('S').trigger('change');
}
  

});


