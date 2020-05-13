document.getElementById('myForm').addEventListener('submit', saveBookmark);
function saveBookmark(e){
    var siteName=document.getElementById('siteName').value;
    var siteUrl=document.getElementById('siteUrl').value;

    
if(!validateForm(siteName, siteUrl)){
    return false;

}

    var bookmark={
        name:siteName,
        url:siteUrl
    }
    /*localStorage.setItem('test','hello world');
    console.log(localStorage.getItem('test'));
    localStorage.removeItem('test');
    console.log(localStorage.getItem('test'));*/
if(localStorage.getItem('bookmarks')=== null){
    var bookmarks=[];
    bookmarks.push(bookmark);
    localStorage.setItem('bookmarks', JSON.stringify(bookmark));
}else{
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    bookmarks.push(bookmark);
    localStorage.setItem('bookmarks', JSON.stringify(bookmark));

}

fetchBookmarks();

    e.preventDefault();
}

function deleteBookmarks(url){
    var bookmarks=JSON.parse(localStorage.getItem('bookmarks'));
    for(var i=0;i<bookmarks.length;i++){
        if(bookmarks[i].url== url){
            bookmarks.splice(i, 1);


        }

    }
    var bookmarks=JSON.parse(localStorage.getItem('bookmarks'));

    fetchBookmarks();
    
}

function fetchBookmarks(){
    var bookmarks=JSON.parse(localStorage.getItem('bookmarks'));
    var bookMarkesResult=document.getElementById('bookMarkesResult');
    bookMarkesResult.innerHTML='';
    for(var i=0;i<fetchBookmarks.length;i++)
    {
        var name= bookmarks[i].name;
        var url= bookmarks[i].url;

        bookMarkesResult.innerHTML+='<div class="well>'+
                     '<h3>'+name+ 
                     ' <a class="btn btn-default" target="_blank" href="'+url+'">Visit</a>'+
                     ' <a noclick="deleteBookmarks(\''+url+'\')" class="btn btn-danger" href="#">Delete</a>'+
                     '</h3>'+
                     '</div>';

    }

}
function validateForm(siteName,siteUrl){
    if(!siteName || !siteUrl){
        alert('please fill the form')
        return false;
    }

    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  var regex = new RegExp(expression);

  if(siteUrl.match(regex)){
      alert('please use valid url');
      return false;

  }

  return true;
}

