
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

                    <!-- Modal to add new user starts-->
                    <div class="modal modal-slide-in new-user-modal fade" id="newUser">
                            <div class="modal-dialog">
                                <form class="add-new-user modal-content pt-0" id="add-new-user">
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">×</button>
                                    <div class="modal-header mb-1">
                                        <h5 class="modal-title" id="exampleModalLabel">Nuevo Perfil</h5>
                                    </div>
                                    <div class="modal-body flex-grow-1">
                                        <div class="mb-1">
                                            <label class="form-label" for="x_perfil">Perfil</label>
                                            <input type="text" class="form-control dt-full-name" id="x_perfil" placeholder="Nuevo Perfil" name="x_perfil" />
                                        </div>
                                        <div class="mb-2">
                                            <label class="form-label" for="l_activo">Estado</label>
                                            <select id="l_activo" name="l_activo" class="select2 form-select">
                                                <option value="S">Activo</option>
                                                <option value="N">Inactivo</option>
                                            </select>
                                        </div>
                                        <button type="submit" class="btn btn-primary me-1 data-submit">Grabar</button>
                                        <button type="reset" class="btn btn-outline-secondary" data-bs-dismiss="modal">Cancel</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <!-- Modal to add new user Ends-->
                        <!-- Modal to add edit user starts-->
                        <div class="modal modal-slide-in edit-user-modal fade" id="editUser">
                            <div class="modal-dialog">
                                <form class="edit-user modal-content pt-0">
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">×</button>
                                    <div class="modal-header mb-1">
                                        <h5 class="modal-title" id="exampleModalLabel">Editar Perfil</h5>
                                    </div>
                                    <div class="modal-body flex-grow-1">
                                        <div class="mb-1">
                                            <label class="form-label" for="edit_x_perfil">Perfil</label>
                                            <input type="text" class="form-control dt-full-name" id="edit_x_perfil" placeholder="Editar Perfil" name="edit_x_perfil" />
                                            <input type="hidden" id="edit_n_perfil" name="edit_n_perfil" />
                                        </div>
                                        <div class="mb-2">
                                            <label class="form-label" for="edit_l_activo">Estado</label>
                                            <select id="edit_l_activo" name="edit_l_activo" class="select2 form-select">
                                                <option value="S">Activo</option>
                                                <option value="N">Inactivo</option>
                                            </select>
                                        </div>
                                        <button type="submit" class="btn btn-primary me-1 data-submit">Grabar</button>
                                        <button type="reset" class="btn btn-outline-secondary" data-bs-dismiss="modal">Cancel</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <!-- Modal to add edit user Ends-->
                </section>
                <!-- users list ends -->

            </div>
        </div>
    </div>
    <!-- END: Content-->