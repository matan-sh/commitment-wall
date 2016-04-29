//var data;
function ajax_json_gallery(){
  var url = "../pages/get_uploads.php";
  var hr = new XMLHttpRequest();
  hr.open("GET", url, true);
  hr.setRequestHeader("Content-type", "application/json");
  hr.onreadystatechange = function() {
    if(hr.readyState == 4 && hr.status == 200) {
       data = JSON.parse(hr.responseText);
       wait_for_response();
    }
  }
  hr.send(null);
}

 // setInterval(function(){
 //    $('#uploads').load('../pages/get_uploads.php');
 // },1000);

// /* refresh the pictures every 55 seconds */
// setInterval(function(){
//    ajax_json_gallery();
// },55000);

ajax_json_gallery();

function wait_for_response() {

  (function ( $ ) {

    $('#pictureCols').photocols({
      colswidth : 90,
      itemheight : 90,
      height : 620,
      bgcolor : '#fff',
      opacity: 0.0,
      gap: 2,
      stopOnHover : false,
      data: data});

  }( jQuery ));
}