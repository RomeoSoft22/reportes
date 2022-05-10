<div class="main-menu menu-fixed menu-light menu-accordion menu-shadow" data-scroll-to-active="true">
        <div class="navbar-header">
            <ul class="nav navbar-nav flex-row">
                <li class="nav-item me-auto"><a class="navbar-brand" href="/reportes/">
                        <h2 class="brand-text">Sistema de Reportes</h2>
                    </a>
                </li>
                <li class="nav-item nav-toggle">
                    <a class="nav-link modern-nav-toggle pe-0" data-bs-toggle="collapse">
                        <i class="d-block d-xl-none text-primary toggle-icon font-medium-4" data-feather="x"></i>
                        <i class="d-none d-xl-block collapse-toggle-icon font-medium-4  text-primary" data-feather="disc" data-ticon="disc"></i>
                    </a>
                </li>
            </ul>
        </div>
        <div class="shadow-bottom"></div>
        <div class="main-menu-content">
            <ul class="navigation navigation-main" id="main-menu-navigation" data-menu="menu-navigation">
                <?php
                    $abrir_nav="";
                    if($id=='')
                        $abrir_nav='class="nav-item has-sub open"';                    
                    else 
                        $abrir_nav="class='nav-item'";

                    
                    $data_length = count($data_menu);
                    for($i=0;$i<$data_length;$i++)
                    {

                        //identificamos prinere nivel
                        if($data_menu[$i]['n_nivel']=='0'){
                ?>

                <li <?=$abrir_nav?>>
                    <a class="d-flex align-items-center" href="<?=$data_menu[$i]['x_url']?>">
                        <i data-feather="<?=$data_menu[$i]['x_icono']?>"></i>
                        <span class="menu-title text-truncate" data-i18n="Reportes"><?=$data_menu[$i]['x_menu']?></span>
                        <span class="badge badge-light-warning rounded-pill ms-auto me-1"><?=$data_menu[$i]['sub_menu']?></span>
                    </a>

                    <?php
                        if($data_menu[$i]['sub_menu']>=1){
                            echo '<ul class="menu-content">';
                            for($i0=0;$i0<$data_length;$i0++){
                                if($data_menu[$i]['n_menu']==$data_menu[$i0]['n_nivel']){
                                    if($data_menu[$i0]['sub_menu']=='0'){
                    ?>

                        <li <?=($url_actual==$data_menu[$i0]['x_url'])?'class="active"':'';?>>
                            <a class="d-flex align-items-center" href="<?=$data_menu[$i0]['x_url']?>">
                                <i data-feather="<?=$data_menu[$i0]['x_icono']?>"></i>
                                <span class="menu-item text-truncate" data-i18n="eCommerce"><?=$data_menu[$i0]['x_menu']?></span>
                            </a>
                        </li>

                        <?php
                                }
                                else{
                        ?>

                        <li>
                            <a class="d-flex align-items-center" href="<?=$data_menu[$i0]['x_url']?>">
                                <i data-feather="<?=$data_menu[$i0]['x_icono']?>"></i>
                                <span class="menu-item text-truncate" data-i18n="Second Level"><?=$data_menu[$i0]['x_menu']?></span>
                            </a>                            
                            <ul class="menu-content">
                                <?php 
                                        for($i1=0;$i1<$data_length;$i1++){
                                            if($data_menu[$i0]['n_menu']==$data_menu[$i1]['n_nivel']){
                                ?>
                                <li <?=($url_actual==$data_menu[$i1]['x_url'])?'class="active"':'';?>>
                                    <a class="d-flex align-items-center" href="<?=$data_menu[$i1]['x_url']?>">
                                        <i data-feather="<?=$data_menu[$i1]['x_icono']?>"></i>
                                        <span class="menu-item text-truncate" data-i18n="Third Level"><?=$data_menu[$i1]['x_menu']?></span>
                                    </a>
                                </li>
                                <?php 
                                            } 
                                        }
                                ?>
                            </ul>
                        </li>
                    <?php   
                                    }
                                }                                                             
                            }
                        echo '</ul>';
                        }
                    ?>

                </li>

                            <?php
                        }
                    
                ?>

                

                <?php } ?>
                
                

            </ul>
        </div>
    </div>