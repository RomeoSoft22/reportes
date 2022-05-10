<?php

    session_start();
    session_destroy();
    setcookie('token','', time()-1);
?>
<script>
    localStorage.clear()
    sessionStorage.clear()
    document.cookie = "token=;  path=/";
</script>
<?php

    header ("Location: /reportes/");

?>