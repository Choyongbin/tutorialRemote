var idx; //현재노트의 번호
var num=0; //노트의 총개수
var renote ;

CKEDITOR.replace('content', {
  height: '500px',
  startupFocus:false
});

$(document).ready(function() {
  renote=false;
  idx = 0;
});

function reNote(){
 $('.note[id='+idx+'] ').children('.noteTitle').text($('#title').val());
 $('.note[id='+idx+'] ').children('.noteContent').html(CKEDITOR.instances.content.getData());
 saveDB($('.noteTitle').val(),$('.noteContent').html());
}

function saveNote() {
  var title = document.getElementById("title").value;
  var content = CKEDITOR.instances.content.getData();

 if(renote == true){
   reNote();
   $('#title').val('');
   CKEDITOR.instances.content.setData('');
 }

 else{

  if(title.length<=0) {
    alert("Create Title");
  }

  else if (content.length<=0) {
    alert("Create Note");
  }

  else {  
    var c = CKEDITOR.instances.content.getData();
    num++;
    idx = num;
    var doc = '';
    doc += '<div id='+idx+' class ="note" onclick="loadNote($(this).attr(\'id\'));" >';
    doc += '<p class="noteTitle">'+$('#title').val()+'</p>';
    doc += '<div class="noteContent">'+c+'</div>';
    doc += '</div>';

    $('#noteTable').append(doc);
    $('#title').val('');
    CKEDITOR.instances.content.setData('');
    saveDB($('.noteTitle').val(),$('.noteContent').html());
  }
}
  renote = false;
}

function loadNote(index) {
  idx = index;
  var title = $('.note[id=' + index + ']').children('.noteTitle').text();
  var note = $('.note[id=' + index + ']').children('.noteContent').html();
  CKEDITOR.instances.content.setData(note);
  $('#title').val(title);
  renote =true;
}

function clearNote(){
  $('.note[id ='+idx+']').remove();
  $('#title').val('');
  CKEDITOR.instances.content.setData('');
  renote=false;
  deleteDB();
}

function search(){
  var text = $('#search').val();
  $('.noteContent:contains(#'+text+')').css("border","1px red");
  
}

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyB6HLTPDS3jHNLiy8NNa1hBzpLlD20u_oU",
    authDomain: "note-c361b.firebaseapp.com",
    databaseURL: "https://note-c361b.firebaseio.com",
    projectId: "note-c361b",
    storageBucket: "note-c361b.appspot.com",
    messagingSenderId: "160423385220"
  };
  firebase.initializeApp(config);

function saveDB(noteTitle,noteContent){
  firebase.database().ref('note/'+idx).update({
  Title : noteTitle,
  Content : noteContent  
  });
}

function deleteDB(note){
  firebase.database().ref('note/'+note.idx).remove();
}

function loadDB(){
  $(document).ready(function(){
    $ajax({
      url : dataabaseURL+"/note.json",
      method : "GET",
      success : function(note) {
          for(var i=0; i<note.length; i++){
            $("#content").html(note[i].noteContent);
            $("#title").text(note[i].noteTitle);
          }
        } 
    });
  });
}





