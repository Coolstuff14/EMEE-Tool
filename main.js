$( document ).ready(function() {

function madLyrics(data){
  res1 = jsonPath(data, "$..Floor[1]..CoordinatePoint");
  //console.log(res1);
  //$("#output").html(res1._xCoordinate);
  //var w = window.open();
  var np = $("#newhtml").html();
  var $np = $('<div>').append($.parseHTML(np));
  //$(w.document.body).html(np);
  var multW = 9 ;
  var multH = 10 ;

  $.each(res1, function(key, item){
      var x1 = item[0]._xCoordinate*multW
      var x2 = item[1]._xCoordinate*multW
      var y1 = item[0]._yCoordinate*multH
      var y2 = item[1]._yCoordinate*multH
      $("#output").line(x1,y1,x2,y2,{zindex:1001, color:'red'});
   });

   var lines = $("#output").html();
   $np.find("#drawhere").append(lines);

   var out = "text/json;charset=utf-8," + encodeURIComponent($np.html());

   $('<a href="data:' + out + '" download="data.html">download JSON</a>').appendTo('#output');
}

$( "#btnLoad" ).click(function() {
  onOpenChange();
});


function loadFile() {
  var input, file, fr;

  if (typeof window.FileReader !== 'function') {
    alert("The file API isn't supported on this browser yet.");
    return;
  }

  input = document.getElementById('fileinput');
  if (!input) {
    alert("Um, couldn't find the fileinput element.");
  }
  else if (!input.files) {
    alert("This browser doesn't seem to support the `files` property of file inputs.");
  }
  else if (!input.files[0]) {
    alert("Please select a file before clicking 'Load'");
  }
  else {
    file = input.files[0];
    jsn = $.getJSON(file);
    $("#output").html();
    madLyrics(jsn);
    // fr = new FileReader();
    // fr.onload = receivedText;
    // fr.readAsText(file);
  }}

function onOpenChange() {
    var filePath = $("#fileinput").val();
    var startIndex = filePath.indexOf('\\') >= 0 ? filePath.lastIndexOf('\\') : filePath.lastIndexOf('/');
    var filename = filePath.substring(startIndex);
    if(filename.indexOf('\\') === 0 || filename.indexOf('/') === 0) {
        filename = filename.substring(1);
    }

    $.ajax({
        url: filename,
        success: onOpenLoad
    });
}

function onOpenLoad(fileContent) {
    var data = JSON.parse(JSON.stringify(fileContent));
    madLyrics(data);
    // do something with the data
}
});
