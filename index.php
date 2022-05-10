<?php
session_start();

if(!isset($_SESSION['token']))
    header ("Location: login");

@$id = $_REQUEST['id'];
include("config.php");

$data_menu = json_decode( file_get_contents($api.'menuListar/'.$_SESSION['n_perfil']), true );
$url_actual = "http://" .$_SERVER["HTTP_HOST"].$_SERVER["REQUEST_URI"];
$url_actual = str_replace($url,'',$url_actual);

?>

<!DOCTYPE html>
<html class="loading" lang="es" data-textdirection="ltr">
<!-- BEGIN: Head-->
<?php include('pages/principal/header.php'); ?>
<!-- END: Head-->

<!-- BEGIN: Body-->

<body class="vertical-layout vertical-menu-modern  navbar-floating footer-static " data-open="click" data-menu="vertical-menu-modern" data-col="">
    
    <!-- BEGIN: Header-->
    <?php include('pages/principal/header-nav.php'); ?>
    <!-- END: Header-->


    <!-- BEGIN: Main Menu-->
    <?php include('pages/principal/menu.php'); ?>
    <!-- END: Main Menu-->

    <!-- BEGIN: Content-->
    <?php 

        if($url_actual ==''){
            include('pages/principal/body.php');
        }
        else{
            for($i=0;$i<$data_length;$i++)
            {
                $navbar_1 = $data_menu[$i]['x_url'];
                $navbar_2 = $data_menu[$i]['x_menu'];
                if($data_menu[$i]['x_url']==$url_actual) {
                    $nombre_fichero = trim($data_menu[$i]['x_url_page']).$data_menu[$i]['x_url'].'.php';
                    if (file_exists($nombre_fichero)) {
                        include($nombre_fichero); 
                    } else {
                        include('pages/errors/mantenimiento.php'); 
                    }
                }
            }
        }

    ?>
    <!-- END: Content-->

    <div class="sidenav-overlay"></div>
    <div class="drag-target"></div>

    <!-- BEGIN: Footer-->
    <?php include('pages/principal/footer.php'); ?>
    <!-- END: Footer-->


    <!-- BEGIN: Vendor JS-->
    <script src="app-assets/vendors/js/vendors.min.js"></script>
    <!-- BEGIN Vendor JS-->

    <!-- BEGIN: Page Vendor JS-->
    <script src="app-assets/vendors/js/charts/apexcharts.min.js"></script>
    <script src="app-assets/vendors/js/extensions/toastr.min.js"></script>
    <!-- END: Page Vendor JS-->

    <!-- BEGIN: Theme JS-->
    <script src="app-assets/js/core/app-menu.js"></script>
    <script src="app-assets/js/core/app.js"></script>
    <script src="app-assets/js/core/app-custom.js"></script>
    <!-- END: Theme JS-->

    <?php
        if($id==''){
    ?>
    <!-- BEGIN: Page JS-->
    <script src="app-assets/js/scripts/pages/dashboard-ecommerce.js"></script>
    <!-- END: Page JS-->
    <?php            
        }
    ?>

    <?php
        if($id>='1'){
    ?>
    <!-- BEGIN: Page Vendor JS-->
    <script src="app-assets/vendors/js/forms/select/select2.full.min.js"></script>
    <script src="app-assets/vendors/js/tables/datatable/jquery.dataTables.min.js"></script>
    <script src="app-assets/vendors/js/tables/datatable/dataTables.bootstrap5.min.js"></script>
    <script src="app-assets/vendors/js/tables/datatable/dataTables.responsive.min.js"></script>
    <script src="app-assets/vendors/js/tables/datatable/dataTables.select.min.js"></script>
    <script src="app-assets/vendors/js/tables/datatable/responsive.bootstrap5.js"></script>
    <script src="app-assets/vendors/js/tables/datatable/datatables.buttons.min.js"></script>
    <script src="app-assets/vendors/js/tables/datatable/dataTables.rowGroup.min.js"></script>
    <script src="app-assets/vendors/js/tables/datatable/jszip.min.js"></script>
    <script src="app-assets/vendors/js/tables/datatable/pdfmake.min.js"></script>
    <script src="app-assets/vendors/js/tables/datatable/vfs_fonts.js"></script>
    <script src="app-assets/vendors/js/tables/datatable/buttons.html5.min.js"></script>
    <script src="app-assets/vendors/js/tables/datatable/buttons.print.min.js"></script>
    <script src="app-assets/vendors/js/forms/validation/jquery.validate.min.js"></script>
    <script src="app-assets/vendors/js/forms/cleave/cleave.min.js"></script>
    <script src="app-assets/vendors/js/forms/cleave/addons/cleave-phone.us.js"></script>
    <script src="app-assets/vendors/js/pickers/pickadate/picker.js"></script>
    <script src="app-assets/vendors/js/pickers/pickadate/picker.date.js"></script>
    <script src="app-assets/vendors/js/pickers/pickadate/picker.time.js"></script>
    <script src="app-assets/vendors/js/pickers/flatpickr/flatpickr.min.js"></script>
    <script src="app-assets/vendors/js/extensions/sweetalert2.all.min.js"></script>
    <script src="app-assets/vendors/js/extensions/polyfill.min.js"></script>
    <!-- END: Page Vendor JS-->
    <!-- BEGIN: Page JS-->
    <?php if($url_actual!=''){ ?>
    <script src="app-assets/js/scripts/pages/report-<?=$url_actual?>-list.js"></script>
    <!--?php include("pages/reportes/js/laboral.php"); ?-->
    <?php } ?>
    <script src="app-assets/js/scripts/forms/form-select2.js"></script>
    <script src="app-assets/js/scripts/forms/pickers/form-pickers-reportes.js"></script>
    <!-- END: Page JS--> 
    <?php            
        }
    ?>
   

    
    <script>
        $(window).on('load', function() {
            if (feather) {
                feather.replace({
                    width: 14,
                    height: 14
                });
            }
        });

        var isRtl = $('html').attr('data-textdirection') === 'rtl';
          // On load Toast
        if(sessionStorage.getItem("inicioSesion")==1){
            setTimeout(function () {
                toastr['success'](
                'Has iniciado sesión correctamente en el Sistema de Reportes. Ahora puedes empezar a explorar!',
                '👋 Bienvenido <br><?=$_SESSION['x_usuario']?>!',
                {
                    closeButton: true,
                    tapToDismiss: false,
                    rtl: isRtl
                }
                );
            }, 2000);
            sessionStorage.setItem("inicioSesion", 2);
        }
        

    </script>
</body>
<!-- END: Body-->

</html>