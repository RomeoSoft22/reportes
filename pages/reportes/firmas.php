
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
                            <h2 class="content-header-title float-start mb-0">Firmas Asociadas</h2>
                            <div class="breadcrumb-wrapper">
                                <ol class="breadcrumb">
                                    <li class="breadcrumb-item"><a href="<?=$url?>">Inicio</a>
                                    </li>
                                    <li class="breadcrumb-item"><a href="#">Reportes SIJ</a>
                                    </li>
                                    <li class="breadcrumb-item active">Firmas Asociadas
                                    </li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
                <?php include('pages/principal/opcion.php'); ?>
            </div>
            <!-- NavBar interno -->

            <?php
                $data_send = array('ejes'=>'N');
                $data_send = http_build_query($data_send, '', '&');
                $header = array(
                    "Content-Type: application/x-www-form-urlencoded",
                    "Content-Length: ".strlen($data_send)
                );
                $opciones = array(
                    'http'=>array(
                        'method'=>"POST",
                        'content'=>$data_send,
                        'header' => implode("\r\n", $header)
                    )
                );
                
                $contexto = stream_context_create($opciones);
                $data = json_decode( file_get_contents($api.'ConsultaDistrito',false,$contexto), true);
                $data_length = count($data);
                
            ?>

            <div class="content-body">

                <div class="card">
                    <div class="card-header pb-50">
                        <h5> Filtros de Busqueda </h5>
                    </div> 
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-6 col-12">
                                <label class="form-label" for="c_provincia">Distrito</label>
                                <div class="mb-1">
                                    <select class="select2 form-select" id="c_provincia">
                                        <option>Seleccionar Distrito</option>
                                        <?php
                                            for($i=0;$i<$data_length;$i++){ 
                                                echo "<option value='".$data[$i]['c_provincia']."' >".$data[$i]['x_nom_provincia']."</option>";
                                            }    
                                        ?>
                                    </select>
                                </div>                             
                            </div>
                            <div class="col-md-6 col-12">
                                <label class="form-label" for="c_sede">Sede</label>
                                <div class="mb-1">
                                    <select class="select2 form-select" id="c_sede">
                                    </select>
                                </div>                             
                            </div>
                            <div class="mb-md-0 mb-2 col-md-6 col-12">
                                <label class="form-label" for="anio">A??o</label>
                                <div class="mb-1">
                                    <select class="select2 form-select" id="anio">
                                        <?php 
                                            for($i=2018;$i<=$anoActual;$i++){
                                                $anoSelect= $i==$anoActual ? 'selected':'';
                                                echo "<option value='$i' ".$anoSelect.">$i</option>";
                                            }
                                        ?>
                                    </select>
                                </div>
                            </div>
                            <div class="mb-md-0 mb-2 col-md-6 col-12">
                                <label class="form-label"></label>
                                <div class="mb-12">
                                <button type="button" id="buscarRP" class="btn btn-primary me-1 waves-effect waves-float waves-light">
                                    <i class="ficon" data-feather="search"></i> Buscar
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
                                        <th style="width: 20%">SEDE</th>
                                        <th style="width: 15%">PERFIL</th>
                                        <th style="width: 10%">USUARIO</th>
                                        <th style="width: 10%">FECHA ASOCIACION</th>
                                        <th style="width: 10%">FECHA VIGENCIA</th>
                                        <th style="width: 25%">TOKEN</th>
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

    