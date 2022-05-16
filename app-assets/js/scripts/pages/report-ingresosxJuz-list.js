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
  
    //variables iniciales
    var url_api = getCookie('api'),
        consultaSQL = "ConsultaIngresosXJuz",
        dtUserTable = $('.user-list-table'),
        jqForm = $('#val-formulario'),
        id = 1, 
        Dataparams = {
          c_instancia : $("#c_instancia").val(),
          c_especialidad : $("#c_especialidad").val(),
          c_usuario : $("#c_usuario").val(),
          fecha : $("#fecha").val()
        };
  

    //Parametro Inicial
    var getParameters = function(){
        return Dataparams;
    }      
    //Parametro de Busqueda
    var setParameters = function(){
      Dataparams = {
          c_instancia : $("#c_instancia").val(),
          c_especialidad : $("#c_especialidad").val(),
          c_usuario : $("#c_usuario").val(),
          fecha : $("#fecha").val()
      };
    } 



    //validacion del formulario
    if (jqForm.length) {
        jqForm.validate({
            rules: {
              'crovincia': {
                required: true
              }
            }
          });
    }
    $("#fecha").focusout(function(){
        if ($("#fecha").val()!=""){
            $("#fecha").removeClass('is-invalid');
        }
    });
    $(".select2-selection").focusout(function(){
        if ($("#c_instancia").val().length>1){
            $("#c_instancia").removeClass('error');
        }
    });
    $(".select2-selection").focusout(function(){
      if ($("#c_especialidad").val().length>1){
          $("#c_especialidad").removeClass('error');
      }
  });


    
  
  
      //Metodo de busqueda
      $("#buscarRP").click(function(){
          var crovincia = $("#c_instancia").val(),
              fecha = $("#fecha").val();
            
              if(jqForm.validate){
                $("#c_instancia").addClass('error');
                $("#c_especialidad").addClass('error');
              }

          if(fecha!="" && crovincia!=""){
            $("#c_instancia").removeClass('error');
            $("#c_especialidad").removeClass('error');
            $("#fecha").removeClass('is-invalid');
            id = 1;
            setParameters();
            tabla.ajax.url(url_api+consultaSQL).load();
          }else{
              if (c_instancia=="") $("#c_instancia").addClass('error');
              if (c_especialidad=="") $("#c_especialidad").addClass('error');
              if (fecha=="") $("#fecha").addClass('is-invalid');
          }         
      });
  
      
  
    // Carga inicial del Reporte
    if (dtUserTable.length) {
      var tabla = dtUserTable.DataTable({
        ajax: {
          url:url_api+consultaSQL,
          //data: {anio:anio,mes:$("#select-mes").val()}
          type: "POST",
          data: function ( d ) {
              var Dataparams = getParameters();
              var params = jQuery.isEmptyObject(Dataparams) ? d : Dataparams;
              return params;
          },
          beforeSend: function() {
            $('#buscarRP').addClass('disabled');
            $.blockUI({
              message: '<div class="spinner-border text-white" role="status"></div>',
              timeout: 50000,
              css: {
                backgroundColor: 'transparent',
                border: '0'
              },
              overlayCSS: {
                opacity: 0.5
              }
            });
          },
          complete: function(){
            $.unblockUI(); 
            $('#buscarRP').removeClass('disabled');
          }
        }, 
        //dataType: 'json',
        //contentType: 'application/json; charset=utf-8',
        //type: "GET", 
        columns: [
          // columns according to JSON
          { data: '' },
          { data: 'n_unico' },
          { data: 'n_incidente' },
          { data: 'x_formato' },
          { data: 'f_ingreso' },
          { data: 'n_documento' },
          { data: 'x_nom_instancia' },
          { data: 'n_cant_folios' },
          { data: 'x_desc_motivo_ingreso' },
          { data: 'x_nom_usuario' },
          { data: 'x_tasa_judicial' },
          { data: 'c_usuario' },
        ],
        columnDefs: [
          {
            // item
            targets: 0,
            responsivePriority: 4,
            render: function (data, type, full, meta) {
              var $name = id++;            
              return $name;
            }
          },
          {
            targets: 1,
            visible: false,
            render: function (data, type, full, meta) {
              var $datos = full['n_unico'];
              return $datos;
            }
          },
          {
            targets: 2,
            visible: false,
            render: function (data, type, full, meta) {
              var $datos = full['n_incidente'];
              return $datos;
            }
          },
          {
            targets: 3,
            render: function (data, type, full, meta) {
              var $datos = full['x_formato'];
              return $datos;
            }
          },
          {
            targets: 4,
            render: function (data, type, full, meta) {
              var $datos = full['f_ingreso'].substr(0,19);
              return $datos;
            }
          },
          {
            targets: 5,
            render: function (data, type, full, meta) {
              var $datos = full['n_sec_ingreso']+' - '+full['n_ano_ingreso'];
              return $datos;
            }
          },
          {
            targets: 6,
            render: function (data, type, full, meta) {
              var $datos = full['x_nom_instancia'];
              return $datos;
            }
          },
          {
            targets: 7,
            render: function (data, type, full, meta) {
              var $datos = full['n_cant_folios'];
              return $datos;
            }
          },
          {
            targets: 8,
            render: function (data, type, full, meta) {
              var $datos = full['x_desc_motivo_ingreso'];
              return $datos;
            }
          },
          {
            targets: 9,
            render: function (data, type, full, meta) {
              var $datos = full['x_nom_usuario'];
              return $datos;
            }
          },
          {
            targets: 10,
            render: function (data, type, full, meta) {
              var $datos = full['x_tasa_judicial'];
              return $datos;
            }
          },
          {
            targets: 11,
            visible: false,
            render: function (data, type, full, meta) {
              var $datos=full['c_usuario']
              return $datos;
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
                exportOptions: { columns: [0, 3, 4, 5, 6, 7, 8, 9, 10] }
              },
              {
                extend: 'csv',
                text: feather.icons['file-text'].toSvg({ class: 'font-small-4 me-50' }) + 'Csv',
                className: 'dropdown-item',
                exportOptions: { columns: [0, 3, 4, 5, 6, 7, 8, 9, 10] }
              },
              {
                extend: 'excel',
                text: feather.icons['file'].toSvg({ class: 'font-small-4 me-50' }) + 'Excel',
                className: 'dropdown-item',
                exportOptions: { columns: [0, 3, 4, 5, 6, 7, 8, 9, 10] }
              },
              {
                extend: 'pdf',
                text: feather.icons['clipboard'].toSvg({ class: 'font-small-4 me-50' }) + 'Pdf',
                className: 'dropdown-item',
                exportOptions: { columns: [0, 3, 4, 5, 6, 7, 8, 9, 10] }
              },
              {
                extend: 'copy',
                text: feather.icons['copy'].toSvg({ class: 'font-small-4 me-50' }) + 'Copiar',
                className: 'dropdown-item',
                exportOptions: { columns: [0, 3, 4, 5, 6, 7, 8, 9, 10] }
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
                return 'Detalle del ' + data['x_formato'];
              }
            }),
            type: 'column',
            renderer: function (api, rowIdx, columns) {
              var data = $.map(columns, function (col, i) {
                return col.columnIndex !== 11 // ? Do not show row in modal popup if title is blank (for check box)
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
          sLengthMenu: 'Mostrar _MENU_',
          search: 'Buscar',
          searchPlaceholder: 'Buscar..',
          paginate: {
            // remove previous & next text from pagination
            previous: '&nbsp;',
            next: '&nbsp;'
          }
        },
        initComplete: function () {
          //$('#buscarRP').removeClass('disabled');
        }
      });
    }
  
  
  
  
  
  
  
  });
  
  
  
  