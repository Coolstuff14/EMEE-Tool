$( document ).ready(function() {

function madLyrics(data){
  res1 = JSON.stringify(jsonPath(data, "$..CoordinatePoint"));
  //console.log(res1);
  //$("#output").html(res1);
  $.each(res1, function(key, item){
     $("#output").html(item._xCoordinate);
   });
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
