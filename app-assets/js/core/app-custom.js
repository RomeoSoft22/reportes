
function alertPrev(icon, title, text){
    //warning, error, success, info
    Swal.fire({
        title: title,
        text: text,
        icon: icon,
        customClass: {
          confirmButton: 'btn btn-'+icon
        },
        buttonsStyling: false
      });
}