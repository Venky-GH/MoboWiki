getu();

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

/*function setval(){
  var objects={};
  var data = {};

  data["type"] = "select";
  data["args"] = {};
  data["args"]["table"] = "view_try";
  data["args"]["columns"] = ["*"];
  data["args"]["where"] = {"user_id":key};

  var jsondata = JSON.stringify(data);
  return(jsondata);
}*/