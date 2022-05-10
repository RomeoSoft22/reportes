
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
                            <h2 class="content-header-title float-start mb-0">Módulo de Violencia</h2>
                            <div class="breadcrumb-wrapper">
                                <ol class="breadcrumb">
                                    <li class="breadcrumb-item"><a href="<?=$url?>">Inicio</a>
                                    </li>
                                    <li class="breadcrumb-item"><a href="#">Procesa</a>
                                    </li>
                                    <li class="breadcrumb-item active">Módulo de Violencia
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

                <div class="card">
                    <div class="card-header pb-50">
                        <h5> Filtros de Busqueda </h5>
                    </div> 
                    <div class="card-body">
                        <form id="val-formulario">
                            <div class="row">
                                <div class="col-md-6 col-12">
                                    <label class="form-label" for="c_distrito">Distrito</label>
                                    <div class="mb-1">
                                        <select class="select2 form-select" id="c_distrito">
                                        <option value='0'>Seleccionar Distrito</option>
                                        <option value="VILLA MARIA DEL TRIUNFO">VILLA MARIA DEL TRIUNFO</option>                                                   
                                        <option value="SAN JUAN DE MIRAFLORES">SAN JUAN DE MIRAFLORES</option>                                             
                                        <option value="VILLA EL SALVADOR">VILLA EL SALVADOR</option>                                                   
                                        <option value="CHORRILLOS">CHORRILLOS</option>                                                   
                                        <option value="LURIN">LURIN</option>                                                   
                                        <option value="PACHACAMAC">PACHACAMAC</option>                                                   
                                        <option value="PUNTA HERMOSA">PUNTA HERMOSA</option>                                                   
                                        <option value="PUNTA NEGRA">PUNTA NEGRA</option>                                                   
                                        <option value="SAN BARTOLO">SAN BARTOLO</option>                                                   
                                        <option value="SANTA MARIA DEL MAR">SANTA MARIA DEL MAR</option>                                                   
                                        <option value="PUCUSANA">PUCUSANA</option>
                                        </select>
                                    </div>                             
                                </div>
                                <div class="col-md-6 col-12" >
                                    <label class="form-label" for="fecha">Rango de Fechas</label>
                                    <input type="text" id="fecha" class="form-control flatpickr-range" placeholder="YYYY-MM-DD to YYYY-MM-DD" />                          
                                </div>
                                <div class="mb-md-0 mb-2 col-md-6 col-12">
                                    <label class="form-label"></label>
                                    <div class="mb-12">
                                    <button type="button" id="buscarRP" class="btn btn-primary me-1 waves-effect waves-float waves-light">
                                        <i class="ficon" data-feather="search"></i> Buscar
                                    </div>    
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                

                <!-- users list start -->
                <section class="app-user-list">
                    
                    <!-- list and filter start -->
                    <div class="card">
                        <div class="card-datatable table-responsive pt-0">
                            <table class="user-list-table table">
                                <thead class="table-light">
                                    <tr>
                                        <th style="width: 10px;">ITEM </th>
                                        <th style="width: 20px;">FECHA </th>
                                        <th>DISTRITO </th>
                                        <th>JUZGADO </th>
                                        <th>EXPEDIENTE </th> 
                                    </tr>
                                </thead>
                            </table>
                        </div>

                    </div>
                    <!-- list and filter end -->
                </section>
                <!-- users list ends -->

            </div>
        </div>
    </div>
    <!-- END: Content-->
