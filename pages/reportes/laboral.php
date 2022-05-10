
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
                            <h2 class="content-header-title float-start mb-0">Juzgados Laborales</h2>
                            <div class="breadcrumb-wrapper">
                                <ol class="breadcrumb">
                                    <li class="breadcrumb-item"><a href="<?=$url?>">Inicio</a>
                                    </li>
                                    <li class="breadcrumb-item"><a href="#">Reportes SIJ</a>
                                    </li>
                                    <li class="breadcrumb-item active">Juzgados Laborales
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
                        <div class="row">
                            <div class="mb-md-0 mb-2 col-md-4 col-12">
                                <div class="col-md-6 mb-1">
                                    <label class="form-label" for="select-anio">Año</label>
                                    <div class="mb-1">
                                        <select class="select2 form-select" id="select-anio">
                                            <?php 
                                                for($i=2018;$i<=$anoActual;$i++){
                                                    $anoSelect= $i==$anoActual ? 'selected':'';
                                                    echo "<option value='$i' ".$anoSelect.">$i</option>";
                                                }
                                            ?>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="mb-md-0 mb-2 col-md-4 col-12">
                                <div class="col-md-6 mb-1">
                                    <label class="form-label" for="select-mes">Mes</label>
                                    <div class="mb-1">
                                        <select class="select2 form-select" id="select-mes">
                                            <option value="01" <?='01'==$mesActual ? 'selected':'';?>>Enero</option>
                                            <option value="02" <?='02'==$mesActual ? 'selected':'';?>>Febrero</option>
                                            <option value="03" <?='03'==$mesActual ? 'selected':'';?>>Marzo</option>
                                            <option value="04" <?='04'==$mesActual ? 'selected':'';?>>Abril</option>
                                            <option value="05" <?='05'==$mesActual ? 'selected':'';?>>Mayo</option>
                                            <option value="06" <?='06'==$mesActual ? 'selected':'';?>>Junio</option>
                                            <option value="07" <?='07'==$mesActual ? 'selected':'';?>>Julio</option>
                                            <option value="08" <?='09'==$mesActual ? 'selected':'';?>>Agosto</option>
                                            <option value="09" <?='09'==$mesActual ? 'selected':'';?>>Setiembre</option>
                                            <option value="10" <?='10'==$mesActual ? 'selected':'';?>>Octubre</option>
                                            <option value="11" <?='11'==$mesActual ? 'selected':'';?>>Noviembre</option>
                                            <option value="12" <?='12'==$mesActual ? 'selected':'';?>>Diciembre</option>
                                        </select>
                                    </div>
                                </div>                                
                            </div>
                            <div class="mb-md-0 mb-2 col-md-4 col-12">
                                <div class="col-md-6 mb-1">
                                    <label class="form-label"></label>
                                    <div class="mb-2">
                                    <button type="button" id="buscarRP" class="btn btn-primary me-1 waves-effect waves-float waves-light">
                                        <i class="ficon" data-feather="search"></i> Buscar
                                    </div>
                                </div>                                
                            </div>
                        </div>
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
                                        <th style="width: 30px">ITEM</th>
                                        <th>SEDE             </th>
                                        <th>INSTANCIA</th>
                                        <th style="width: 30px">EJE</th>
                                        <th style="width: 30px">FISICA</th>
                                        <th style="width: 30px">TOTAL</th>
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
