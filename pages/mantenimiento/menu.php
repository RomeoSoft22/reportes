
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
                                        <th>MENU</th>
                                        <th>URL</th>
                                        <th>URL PAGE</th>
                                        <th>ICONO</th>
                                        <th>ORDEN</th>
                                        <th>NIVEL</th>
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
                                        <h5 class="modal-title" id="exampleModalLabel">Nuevo Menu</h5>
                                    </div>
                                    <div class="modal-body flex-grow-1">
                                        <div class="mb-1">
                                            <label class="form-label" for="x_menu">Menu</label>
                                            <input type="text" class="form-control dt-full-name" id="x_menu" placeholder="Menu" name="x_menu" />
                                        </div>
                                        <div class="mb-1">
                                            <label class="form-label" for="x_url">URL Dominio</label>
                                            <input type="text" class="form-control dt-full-name" id="x_url" placeholder="URL Dominio" name="x_url" />
                                        </div>
                                        <div class="mb-1">
                                            <label class="form-label" for="x_url_page">URL Página</label>
                                            <input type="text" class="form-control dt-full-name" id="x_url_page" placeholder="URL Página" name="x_url_page" />
                                        </div>
                                        <div class="mb-2">
                                            <label class="form-label" for="x_icono">Icono</label>
                                            <select id="x_icono" name="x_icono" class="select2-icons form-select">
                                                <option value="grid" data-icon="grid">grid</option>
                                                <option value="circle" data-icon="circle">circle</option>
                                                <option value="airplay" data-icon="airplay">airplay</option>
                                                <option value="users" data-icon="users">users</option>
                                                <option value="user-plus" data-icon="user-plus">user-plus</option>
                                                <option value="terminal" data-icon="terminal">terminal</option>
                                                <option value="activity" data-icon="activity">activity</option>
                                                <option value="archive" data-icon="archive">archive</option>
                                                <option value="arrow-down-circle" data-icon="arrow-down-circle">arrow-down-circle</option>
                                                <option value="book-open" data-icon="book-open">book-open</option>
                                                <option value="book" data-icon='book'>book</option>
                                                <option value="clipboard" data-icon='clipboard'>clipboard</option>
                                                <option value="box" data-icon='box'>box</option>
                                                <option value="bookmark" data-icon='bookmark'>bookmark</option>
                                                <option value="award" data-icon='award'>award</option>
                                                <option value="cpu" data-icon='cpu'>cpu</option>
                                                <option value="database" data-icon='database'>database</option>
                                                <option value="external-link" data-icon='external-link'>external-link</option>
                                                <option value="file-plus" data-icon='file-plus'>file-plus</option>
                                                <option value="inbox" data-icon='inbox'>inbox</option>
                                                <option value="layers" data-icon='layers'>layers</option>
                                                <option value="navigation" data-icon='navigation'>navigation</option>
                                            </select>
                                        </div>
                                        <div class="mb-2">
                                            <label class="form-label" for="n_nivel">Nivel - Sub nivel</label>
                                            <select id="n_nivel" name="n_nivel" class="select2 form-select">
                                                <?php 
                                                    $data_length = count($data_menu);
                                                    for($i=0;$i<$data_length;$i++){
                                                        if($data_menu[$i]['n_nivel']=='0'){
                                                            ?>
                                                <option value="<?=$data_menu[$i]['n_menu']?>"><?=$data_menu[$i]['x_menu']?></option>
                                                            <?php
                                                            for($i0=0;$i0<$data_length;$i0++){
                                                                if($data_menu[$i]['n_menu']==$data_menu[$i0]['n_nivel']){
                                                ?>
                                                <option value="<?=$data_menu[$i0]['n_menu']?>"><?=$data_menu[$i]['x_menu']." - ".$data_menu[$i0]['x_menu']?></option>
                                                <?php
                                                                }
                                                            }
                                                        }
                                                    } 
                                                 ?>
                                            </select>
                                        </div>
                                        <div class="mb-2">
                                            <label class="form-label" for="n_orden">Orden</label>
                                            <select id="n_orden" name="n_orden" class="select2 form-select">
                                                <?php for($i=0;$i<=20;$i++){?>
                                                <option value="<?=$i?>"><?=$i?> Orden</option>
                                                <?php } ?>
                                            </select>
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
                                        <h5 class="modal-title" id="exampleModalLabel">Editar Menu</h5>
                                    </div>
                                    <div class="modal-body flex-grow-1">
                                    <div class="mb-1">
                                            <label class="form-label" for="edit_x_menu">Menu</label>
                                            <input type="text" class="form-control dt-full-name" id="edit_x_menu" placeholder="Menu" name="edit_x_menu" />
                                            <input type="hidden" class="form-control dt-full-name" id="edit_n_menu" placeholder="Menu" name="edit_n_menu" />
                                        </div>
                                        <div class="mb-1">
                                            <label class="form-label" for="edit_x_url">URL Dominio</label>
                                            <input type="text" class="form-control dt-full-name" id="edit_x_url" placeholder="URL Dominio" name="edit_x_url" />
                                        </div>
                                        <div class="mb-1">
                                            <label class="form-label" for="edit_x_url_page">URL Página</label>
                                            <input type="text" class="form-control dt-full-name" id="edit_x_url_page" placeholder="URL Página" name="edit_x_url_page" />
                                        </div>
                                        <div class="mb-2">
                                            <label class="form-label" for="edit_x_icono">Icono</label>
                                            <select id="edit_x_icono" name="edit_x_icono" class="select2-icons form-select">
                                                <option value="grid" data-icon="grid">grid</option>
                                                <option value="circle" data-icon="circle">circle</option>
                                                <option value="airplay" data-icon="airplay">airplay</option>
                                                <option value="users" data-icon="users">users</option>
                                                <option value="user-plus" data-icon="user-plus">user-plus</option>
                                                <option value="terminal" data-icon="terminal">terminal</option>
                                                <option value="activity" data-icon="activity">activity</option>
                                                <option value="archive" data-icon="archive">archive</option>
                                                <option value="arrow-down-circle" data-icon="arrow-down-circle">arrow-down-circle</option>
                                                <option value="book-open" data-icon="book-open">book-open</option>
                                                <option value="book" data-icon='book'>book</option>
                                                <option value="clipboard" data-icon='clipboard'>clipboard</option>
                                                <option value="box" data-icon='box'>box</option>
                                                <option value="bookmark" data-icon='bookmark'>bookmark</option>
                                                <option value="award" data-icon='award'>award</option>
                                                <option value="cpu" data-icon='cpu'>cpu</option>
                                                <option value="database" data-icon='database'>database</option>
                                                <option value="external-link" data-icon='external-link'>external-link</option>
                                                <option value="file-plus" data-icon='file-plus'>file-plus</option>
                                                <option value="inbox" data-icon='inbox'>inbox</option>
                                                <option value="layers" data-icon='layers'>layers</option>
                                                <option value="navigation" data-icon='navigation'>navigation</option>
                                            </select>
                                        </div>
                                        <div class="mb-2">
                                            <label class="form-label" for="edit_n_nivel">Nivel - Sub nivel</label>
                                            <select id="edit_n_nivel" name="edit_n_nivel" class="select2 form-select">
                                                <?php 
                                                    $data_length = count($data_menu);
                                                    for($i=0;$i<$data_length;$i++){
                                                        if($data_menu[$i]['n_nivel']=='0'){
                                                            ?>
                                                <option value="<?=$data_menu[$i]['n_menu']?>"><?=$data_menu[$i]['x_menu']?></option>
                                                            <?php
                                                            for($i0=0;$i0<$data_length;$i0++){
                                                                if($data_menu[$i]['n_menu']==$data_menu[$i0]['n_nivel']){
                                                ?>
                                                <option value="<?=$data_menu[$i0]['n_menu']?>"><?=$data_menu[$i]['x_menu']." - ".$data_menu[$i0]['x_menu']?></option>
                                                <?php
                                                                }
                                                            }
                                                        }
                                                    } 
                                                 ?>
                                            </select>
                                        </div>
                                        <div class="mb-2">
                                            <label class="form-label" for="edit_n_orden">Orden</label>
                                            <select id="edit_n_orden" name="edit_n_orden" class="select2 form-select">
                                                <?php for($i=0;$i<=20;$i++){?>
                                                <option value="<?=$i?>"><?=$i?> Orden</option>
                                                <?php } ?>
                                            </select>
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