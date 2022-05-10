<?php
session_start();
global $menu;

$user_list = json_encode($_REQUEST['user']);
$user_list = json_decode($user_list,false);

$perfil = json_encode($_REQUEST['perfil']);
$perfil = json_decode($perfil,false);

$menu = json_encode($_REQUEST['menu']);
$menu = json_decode($menu,false);

$_SESSION['n_usuario'] = $user_list->n_usuario;;
$_SESSION['c_usuario'] = $user_list->c_usuario;;
$_SESSION['x_nombres'] = $user_list->x_nombres;
$_SESSION['x_ape_paterno'] = $user_list->x_ape_paterno;
$_SESSION['x_ape_materno'] = $user_list->x_ape_materno;
$_SESSION['x_usuario'] = $user_list->x_ape_paterno.' '.$user_list->x_ape_materno.', '.$user_list->x_nombres;
$_SESSION['f_ultimo_ing'] = $user_list->f_ultimo_ing;
$_SESSION['x_dni'] = $user_list->x_dni;
$_SESSION['token'] = $_COOKIE['token'];


$_SESSION['x_perfil'] = $perfil->x_perfil;
$_SESSION['n_perfil'] = $perfil->n_perfil;



?>

