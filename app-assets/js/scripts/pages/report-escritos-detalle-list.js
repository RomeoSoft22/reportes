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
        consultaSQL = "ConsultaEscritoDetalle",
        dtUserTable = $('.user-list-table'),
        jqForm = $('#val-formulario'),
        id = 1, 
        Dataparams = {
            c_provincia : $("#c_provincia").val(),
            fecha : $("#fecha").val()
        };
  

    //Parametro Inicial
    var getParameters = function(){
        return Dataparams;
    }      
    //Parametro de Busqueda
    var setParameters = function(){
      Dataparams = {
          c_provincia : $("#c_provincia").val(),
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
        if ($("#c_provincia").val().length>1){
            $("#c_provincia").removeClass('error');
        }
    });


    
  
  
      //Metodo de busqueda
      $("#buscarRP").click(function(){
          var crovincia = $("#c_provincia").val(),
              fecha = $("#fecha").val();
            
              if(jqForm.validate){
                $("#c_provincia").addClass('error');
              }

          if(fecha!="" && crovincia!=""){
            $("#c_provincia").removeClass('error');
            $("#fecha").removeClass('is-invalid');
            id = 1;
            setParameters();
            tabla.ajax.url(url_api+consultaSQL).load();
          }else{
              if (c_provincia=="") $("#c_provincia").addClass('error');
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
          { data: 'INSTANCIA' },
          { data: 'ENE' },
          { data: 'FEB' },
          { data: 'MAR' },
          { data: 'ABR' },
          { data: 'MAY' },
          { data: 'JUN' },
          { data: 'JUL' },
          { data: 'AGO' },
          { data: 'SEP' },
          { data: 'OCT' },
          { data: 'NOV' },
          { data: 'DIC' },
          { data: 'TOTAL' }
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
            render: function (data, type, full, meta) {
              var $datos = full['INSTANCIA'];
              return $datos;
            }
          },
          {
            targets: 2,
            render: function (data, type, full, meta) {
              var $datos = full['ENE'];
              return $datos;
            }
          },
          {
            targets: 3,
            render: function (data, type, full, meta) {
              var $datos = full['FEB'];
              return $datos;
            }
          },
          {
            targets: 4,
            render: function (data, type, full, meta) {
              var $datos = full['MAR'];
              return $datos;
            }
          },
          {
            targets: 5,
            render: function (data, type, full, meta) {
              var $datos = full['ABR'];
              return $datos;
            }
          },
          {
            targets: 6,
            render: function (data, type, full, meta) {
              var $datos = full['MAY'];
              return $datos;
            }
          },
          {
            targets: 7,
            render: function (data, type, full, meta) {
              var $datos = full['JUN'];
              return $datos;
            }
          },
          {
            targets: 8,
            render: function (data, type, full, meta) {
              var $datos = full['JUL'];
              return $datos;
            }
          },
          {
            targets: 9,
            render: function (data, type, full, meta) {
              var $datos = full['AGO'];
              return $datos;
            }
          },
          {
            targets: 10,
            render: function (data, type, full, meta) {
              var $datos = full['SEP'];
              return $datos;
            }
          },
          {
            targets: 11,
            render: function (data, type, full, meta) {
              var $datos = full['OCT'];
              return $datos;
            }
          },
          {
            targets: 12,
            render: function (data, type, full, meta) {
              var $datos = full['NOV'];
              return $datos;
            }
          },
          {
            targets: 13,
            render: function (data, type, full, meta) {
              var $datos = full['DIC'];
              return $datos;
            }
          },
          {
            targets: 14,
            render: function (data, type, full, meta) {
              var $datos = full['TOTAL'];
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
        language: {
          sLengthMenu: 'Mostrar _MENU_',
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
                exportOptions: { columns: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14] }
              },
              {
                extend: 'csv',
                text: feather.icons['file-text'].toSvg({ class: 'font-small-4 me-50' }) + 'Csv',
                className: 'dropdown-item',
                exportOptions: { columns: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14] }
              },
              {
                extend: 'excel',
                text: feather.icons['file'].toSvg({ class: 'font-small-4 me-50' }) + 'Excel',
                className: 'dropdown-item',
                exportOptions: { columns: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14] }
              },
              {
                extend: 'pdf',
                text: feather.icons['clipboard'].toSvg({ class: 'font-small-4 me-50' }) + 'Pdf',
                className: 'dropdown-item',
                exportOptions: { columns: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14] }
              },
              {
                extend: 'copy',
                text: feather.icons['copy'].toSvg({ class: 'font-small-4 me-50' }) + 'Copiar',
                className: 'dropdown-item',
                exportOptions: { columns: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14] }
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
                return 'Detalle del ' + data['INSTANCIA'];
              }
            }),
            type: 'column',
            renderer: function (api, rowIdx, columns) {
              var data = $.map(columns, function (col, i) {
                return col.columnIndex !== 15 // ? Do not show row in modal popup if title is blank (for check box)
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
          //$('#buscarRP').removeClass('disabled');
        }
      });
    }
  
  
  
  
  
  
  
  });
  
  
  
  