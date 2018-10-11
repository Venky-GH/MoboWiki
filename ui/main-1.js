getu();

var wid = document.getElementById('getid').value;

console.log(wid);

function getu(){
  var request = new XMLHttpRequest();

  request.onreadystatechange = function(){
    if(request.readyState === XMLHttpRequest.DONE){
      if(request.status === 200){
        var sv = this.responseText;
        document.getElementById('test').innerHTML = `<span class="glyphicon glyphicon-flash"></span> Hey ${sv}`;
      }
      else{
        alert('Something went wrong');
      }
    }
  };

  request.open('GET','/check-login', true);
  request.send(null);
}

var lgot = document.getElementById('Lo');
lgot.onclick = function() {
  var request = new XMLHttpRequest();


  request.onreadystatechange = function () {
    if (request.readyState === XMLHttpRequest.DONE) {

        if (request.status === 200) {
            alert('Logged out successfully');
            location.href = '/';
        } else {
            alert('Try again!');
        }
    }
  };

  request.open('GET','/logout', true);
  request.send(null);
};

var dispw = document.getElementById('wlst');
dispw.onclick = function(){
  var request = new XMLHttpRequest();

  var con = document.getElementById('content');
  request.onreadystatechange = function(){
    if(request.readyState === XMLHttpRequest.DONE){

      if(request.status === 200) {
        var sv = JSON.parse(request.responseText);
        var sv1 = "<div><ul>";
        for(var i = 0; i < sv.length; i++){
          sv1 += `<li><h4 class="b">${sv[i].brand} ${sv[i].phone_name}</h4></li>`;
        }
        sv1 += "</ul></div>";
        con.innerHTML = sv1;
      }
      else {
        alert('Try again!');
      }
    }
  };
  request.open('GET', '/showwl', true);
  request.send(null);
};

var wishl = document.getElementById('wish');
wishl.onclick = function(){
  var request = new XMLHttpRequest();


  request.onreadystatechange = function () {
    if (request.readyState === XMLHttpRequest.DONE) {

        if (request.status === 200) {
          //console.log(sid);
          wishl.innerHTML = `Added to Wishlist`;
          wishl.className = 'btn btn-danger pi si';
        } else {
            //console.log(sid);
            wishl.className = 'btn btn-danger pi si';
            wishl.innerHTML = `Already Added to Wishlist`;

        }
    }
  };

  request.open('POST', '/addwl', true);
  request.setRequestHeader('Content-Type', 'application/json');
  request.send(JSON.stringify({wishlist_id: wid}));
};

var clr = document.getElementById('clear');
clr.onclick = function(){
  var request = new XMLHttpRequest();


  request.onreadystatechange = function () {
    if (request.readyState === XMLHttpRequest.DONE) {

        if (request.status === 200) {
          var c = document.getElementById('content');
          alert('All the items were successfully removed!');
          c.innerHTML = '<p>No Items Added!</p>';
        } else {
            alert('Try Again!');
        }
    }
  };

  request.open('GET', '/clearwl', true);
  request.send(null);
};

var rem = document.getElementById('remwish');
rem.onclick = function(){
  var request = new XMLHttpRequest();


  request.onreadystatechange = function () {
    if (request.readyState === XMLHttpRequest.DONE) {

        if (request.status === 200) {
          //console.log(sid);
          rem.innerHTML = `Successfully Removed`;
          rem.className = 'btn btn-warning pi si';
        } else {
            //console.log(sid);
            alert('Item not Present in the Wishlist. Kindly Add it before you choose to remove!');

        }
    }
  };

  request.open('POST', '/removewl', true);
  request.setRequestHeader('Content-Type', 'application/json');
  request.send(JSON.stringify({wishlist_id: wid}));
};

function getcomments(){
  var request = new XMLHttpRequest();
  var dc = document.getElementById('dispcom');

  request.onreadystatechange = function(){
    if(request.readyState === XMLHttpRequest.DONE)
    {
      if(request.status === 200){
        var fg = JSON.parse(request.responseText);
        var ga = ``;
        for(var i = 0; i < fg.length; i++)
        {
          ga += `<div class="well"><div class="col-sm-6"><h4>${fg[i].username}</h4></div><div class="col-sm-6" style="text-align:right;"><h4> ${fg[i].created.split('T')[0]}</h4></div>
          <div style="margin-left:1.5%;font-size:122%">~${fg[i].comment}</div></div>`;
        }
        dc.innerHTML = ga;
      }
      else{
        alert('Error in loading Comments!');
      }
    }
  };
  request.open('POST', '/dispcom', true);
  request.setRequestHeader('Content-Type', 'application/json');
  request.send(JSON.stringify({phone_id: wid}));
}


var af = document.getElementById('addcom');
af.onclick = function(){
  var request = new XMLHttpRequest();
  var se = document.getElementById('typecom');
  var s = se.value;

  request.onreadystatechange = function(){
    if(request.readyState === XMLHttpRequest.DONE){
      if(request.status === 200){
        se.value = " ";
        alert('Submitted Successfully!');
        getcomments();
      }
      else {
        alert('Try again!');
      }
    }
  };

  console.log(s);
  console.log(wid);
  request.open('POST', '/addcomment', true);
  request.setRequestHeader('Content-Type', 'application/json');
  request.send(JSON.stringify({comment: s, phone_id: wid}));
};

getcomments();
