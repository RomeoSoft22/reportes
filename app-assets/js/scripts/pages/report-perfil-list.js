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
    consultaSQL = "perfil",
    dtUserTable = $('.user-list-table'),
    newUserSidebar = $('.new-user-modal'),
    newUserForm = $('.add-new-user'),
    editUserSidebar = $('.edit-user-modal'),
    editUserForm = $('.edit-user'),
    edit = $('.edit'),
    select = $('.select2'),
    dtContact = $('.dt-contact'),
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
        { data: 'n_perfil' },
        { data: 'x_perfil' },
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
            return full['n_perfil'];
          }
        },
        {
          // User full name and username
          targets: 1,
          responsivePriority: 4,
          render: function (data, type, full, meta) {
            var $name = full['n_perfil'];            
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
          targets: 3,
          render: function (data, type, full, meta) {
            var $role = full['f_registro'].substring(0,19);
            return $role;
          }
        },
        {
          // User Status
          targets: 4,
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
            return (
              '<div class="btn-group">' +
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
              exportOptions: { columns: [1, 2, 3, 4] }
            },
            {
              extend: 'csv',
              text: feather.icons['file-text'].toSvg({ class: 'font-small-4 me-50' }) + 'Csv',
              className: 'dropdown-item',
              exportOptions: { columns: [1, 2, 3, 4] }
            },
            {
              extend: 'excel',
              text: feather.icons['file'].toSvg({ class: 'font-small-4 me-50' }) + 'Excel',
              className: 'dropdown-item',
              exportOptions: { columns: [1, 2, 3, 4] }
            },
            {
              extend: 'pdf',
              text: feather.icons['clipboard'].toSvg({ class: 'font-small-4 me-50' }) + 'Pdf',
              className: 'dropdown-item',
              exportOptions: { columns: [1, 2, 3, 4] }
            },
            {
              extend: 'copy',
              text: feather.icons['copy'].toSvg({ class: 'font-small-4 me-50' }) + 'Copiar',
              className: 'dropdown-item',
              exportOptions: { columns: [1, 2, 3, 4] }
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
              return 'Detalle del ' + data['x_perfil'];
            }
          }),
          type: 'column',
          renderer: function (api, rowIdx, columns) {
            var data = $.map(columns, function (col, i) {
              return col.columnIndex !== 5 // ? Do not show row in modal popup if title is blank (for check box)
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
        'x_perfil': {
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
                $("#x_perfil").val('');
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
      var descripcion = fila.find('td:eq(2)').text();
      var fecha = fila.find('td:eq(3)').text();
      var estado = fila.find('td:eq(4)').text();
      if(estado=='Activo') estado = 'S'
      else estado = 'N'
      
      $("#edit_n_perfil").val(id);
      $("#edit_x_perfil").val(descripcion);
      $('#edit_l_activo').val(estado).trigger('change');
   
      
  } );



  //proceso de edicion
  if (editUserForm.length) {
    //validacion
    editUserForm.validate({
      errorClass: 'error',
      rules: {
        'edit_n_perfil': {
          required: true
        },
        'edit_x_perfil': {
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
            url: url_api + consultaSQL+'/'+$("#edit_n_perfil").val(),
            data: $('.edit-user').serialize()
            }).done(function( msg ) { 
              if(!msg.error){
                tabla.ajax.reload(null,false);
                editUserSidebar.modal('hide');
                //limpiamos formulario
                $("#edit_x_perfil").val('');
                $("#edit_n_perfil").val('');
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


  

  // Phone Number
  if (dtContact.length) {
    dtContact.each(function () {
      new Cleave($(this), {
        phone: true,
        phoneRegionCode: 'US'
      });
    });
  }
});


