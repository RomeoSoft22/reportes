
    <!-- BEGIN: Content-->
    <div class="app-content content ">
        <div class="content-overlay"></div>
        <div class="header-navbar-shadow"></div>
        <div class="content-wrapper container-xxl p-0">
            <!--  NavBar interno -->
            <div class="content-header row">
                <div class="content-header-left col-md-9 col-12 mb-2">
                    <div class="row breadcrumbs-top">
                        <div class="col-12">
                            <h2 class="content-header-title float-start mb-0"><?=$navbar_2?></h2>
                            <div class="breadcrumb-wrapper">
                                <ol class="breadcrumb">
                                    <li class="breadcrumb-item"><a href="<?=$url?>">Inicio</a>
                                    </li>
                                    <li class="breadcrumb-item"><a href="#">Mantenimiento</a>
                                    </li>
                                    <li class="breadcrumb-item active"><?=$navbar_2?>
                                    </li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
                <?php include('pages/principal/opcion.php'); ?>
            </div>
            <!-- NavBar interno -->


            <div class="content-body">
                <!-- users list start -->
                <section class="app-user-list">
    
                    <!-- list and filter start -->
                    <div class="card">
                        <div class="card-datatable table-responsive pt-0">
                            <table class="user-list-table table">
                                <thead class="table-light">
                                    <tr>
                                        <th></th>
                                        <th>ID</th>
                                        <th>PERFIL</th>
                                        <th>F. REGISTRO</th>
                                        <th>ESTADO</th>
                                        <th></th>
                                    </tr>
                                </thead>
                            </table>
                        </div>

                    </div>
                    <!-- list and filter end -->

                    
                        <!-- Modal to add edit user starts-->
                        <div class="modal fade show edit-user-modal" id="editUser">
                            <div class="modal-dialog modal-dialog-centered">
                                <div class="modal-content">
                                    <form class="edit-user modal-content pt-0">
                                        <div class="modal-header bg-transparent">
                                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div class="modal-body flex-grow-1">
                                            <div class="text-center mb-2">
                                                <h1 class="mb-1">Opciones de Menu</h1>
                                                <p>Configuración de acceso al Menu por Perfiles.</p>
                                            </div>
                                            <!-- tabla por fuera inicio -->
                                            <table class="table text-nowrap text-center border-bottom" style="margin-bottom: 0px !important;" >
                                                <thead>
                                                <tr>
                                                    <th class="text-start" colspan="3">MENU</th>
                                                    <th class="text-end">ACCESO&nbsp;&nbsp;<input class='form-check-input' type='checkbox' id='all' name='all' >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                </tbody>
                                            </table>
                                            <!-- tabla por fuera fin -->

                                            <div class="table-responsive" style="height: 300px">
                                                <table class="table text-nowrap text-center border-bottom" id="detalle_menu">
                                                    <tbody>
                                                    </tbody>
                                                </table>
                                            </div>         
                                            
                                            <div class="mb-1">
                                                <input type="hidden" id="edit_n_menu" name="edit_n_menu" />
                                                <input type="hidden" id="edit_total" name="edit_total" />
                                            </div>                               
                                            <div class="col-12 text-center">
                                                <button type="submit" class="btn btn-primary me-1 data-submit">Grabar</button>
                                                <button type="reset" class="btn btn-outline-secondary" data-bs-dismiss="modal">Cancel</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <!-- Modal to add edit user Ends-->
                </section>
                <!-- users list ends -->

            </div>
        </div>
    </div>
    <!-- END: Content-->