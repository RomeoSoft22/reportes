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
          visible:false,
          targets: 3,
          render: function (data, type, full, meta) {
            var $role = full['f_registro'].substring(0,19);
            return $role;
          }
        },
        {
          // User Status
          targets: 4,
          visible:false,
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
              '<a href="'+full['n_perfil']+'/edit'+
              '" class="dt-button editar" data-bs-toggle="modal" data-bs-target="#editUser">' +
              feather.icons['edit'].toSvg({ class: 'font-small-4 me-50' }) +
              'Asignar Opciones de Menu</a>'           
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
        Search: 'Buscar',
        searchPlaceholder: 'Buscar..'
      },
      // Buttons with Dropdown
      buttons: [
        {
          extend: 'collection',
          className: 'btn btn-outline-secondary dropdown-toggle me-2 hidden',
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



  //CARGA DATOS PARA EDIT
  $('.user-list-table tbody').on('click', 'tr td a.editar', function () {
      var fila = $(this).closest('tr');
      var id = parseInt(fila.find('td:eq(1)').text());

      //seteos de variables
      $("#edit_n_menu").val(id);
      $("#all").prop( "checked", false );
      

      //carga de MENU
      $.ajax({
          type: 'GET',
          dataType: "json",
          url: url_api + 'menu',
          headers: {
              "Authorization" : sessionStorage.getItem('token')
          },
          }).done(function( msg ) { 
            if(!msg.error){
              //seteos de variables
              var menu = "",
                  total = msg.data.length,
                  ultimo= 0;
              $('#detalle_menu').find('tbody').empty();
              
              for(var i=0;i<total;i++){
                if(msg.data[i].n_nivel=='0'){
                  menu += "<tr>"+
                    "<td class='text-start' colspan='3'>"+msg.data[i].x_menu+"</td>"+
                    "<td>"+
                      "<div class='form-check d-flex justify-content-center'>"+
                        "<input class='form-check-input opcion_menu' type='checkbox' id='p"+msg.data[i].n_menu+"' name='p"+msg.data[i].n_menu+"' >"+
                      "</div>"+
                    "</td>"+
                  "</tr>";

                  for(var i0=0;i0<total;i0++){
                    if(msg.data[i].n_menu==msg.data[i0].n_nivel){
                      menu += "<tr>"+
                        "<td></td>"+
                        "<td class='text-start' colspan='2'>"+msg.data[i0].x_menu+"</td>"+
                        "<td>"+
                          "<div class='form-check d-flex justify-content-center'>"+
                            "<input class='form-check-input opcion_menu' type='checkbox' id='p"+msg.data[i0].n_menu+"' name='p"+msg.data[i0].n_menu+"' >"+
                          "</div>"+
                        "</td>"+
                      "</tr>";

                      for(var i1=0;i1<total;i1++){
                        if(msg.data[i0].n_menu==msg.data[i1].n_nivel){
                          menu += "<tr>"+
                            "<td></td>"+
                            "<td></td>"+
                            "<td class='text-start'>"+msg.data[i1].x_menu+"</td>"+
                            "<td>"+
                              "<div class='form-check d-flex justify-content-center'>"+
                                "<input class='form-check-input opcion_menu' type='checkbox' id='p"+msg.data[i1].n_menu+"' name='p"+msg.data[i1].n_menu+"' >"+
                              "</div>"+
                            "</td>"+
                          "</tr>";
                          if(ultimo<msg.data[i1].n_menu){
                            ultimo=msg.data[i1].n_menu;
                          }
                        }
                      }
                      if(ultimo<msg.data[i0].n_menu){
                        ultimo=msg.data[i0].n_menu;
                      }
                    }
                  }
                  if(ultimo<msg.data[i].n_menu){
                    ultimo=msg.data[i].n_menu;
                  }
                }
                $("#edit_total").val(ultimo);

              }
              $('#detalle_menu').find('tbody').append(menu);
            }else{
                alertPrev('warning', 'Validación',msg.error)
            }
            
            

            //carga de opciones de menu
            $.ajax({
                type: 'GET',
                dataType: "json",
                url: url_api + 'menuListar/'+id,
                headers: {
                    "Authorization" : sessionStorage.getItem('token')
                },
                }).done(function( msg ) { 
                  if(!msg.error){
                    var total = msg.length;
                    for(i=0;i<total;i++){
                      if(msg[i].l_activo=='S'){
                        $('#p'+msg[i].n_menu).prop( "checked", true );
                      }
                    }
                  }else{
                      alertPrev('warning', 'Validación',msg.error)
                  }                 


                }).fail(function (jqXHR, textStatus, errorThrown){
                  alertPrev('info', 'Problemas al consumir el servicio!',"El siguiente error ha ocurrido: "+ textStatus +" "+ errorThrown);
                  console.log('Error:'+jqXHR.responseJSON.message);
            });


          }).fail(function (jqXHR, textStatus, errorThrown){
            alertPrev('info', 'Problemas al consumir el servicio!',"El siguiente error ha ocurrido: "+ textStatus +" "+ errorThrown);
            console.log('Error:'+jqXHR.responseJSON.message);
      });
      
      
   
      
  } );



  //proceso de edicion
  if (editUserForm.length) {
    
    //evento
    editUserForm.on('submit', function (e) {
      e.preventDefault();
      $.ajax({
        type: 'PUT',
        dataType: "json",
        url: url_api +'menuperfil/'+$("#edit_n_menu").val(),
        headers: {
            "Authorization" : sessionStorage.getItem('token')
        },
        data: $('.edit-user').serialize()
        }).done(function( msg ) { 
          if(!msg.error){
            //tabla.ajax.reload(null,false);
            editUserSidebar.modal('hide');
            //limpiamos formulario
            $("#edit_n_menu").val('');
            $("#edit_total").val('');
            alertPrev('success', 'Modificado Correctamente','');
          }else{
              alertPrev('warning', 'Validación',msg.error)
          }                 


        }).fail(function (jqXHR, textStatus, errorThrown){
          alertPrev('info', 'Problemas al consumir el servicio!',"El siguiente error ha ocurrido: "+ textStatus +" "+ errorThrown);
          console.log('Error:'+jqXHR.responseJSON.message);
     });
    });


  }




$("#all").on('click', function(){

  if($('#all').is(':checked')){
    $('.opcion_menu').prop( "checked", true );
  }else{
    $('.opcion_menu').prop( "checked", false );
  }

});
  

});


