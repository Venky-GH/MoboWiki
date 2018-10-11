var register = document.getElementById('register_sub');
register.onclick = function () {

    var request = new XMLHttpRequest();


    request.onreadystatechange = function () {
      if (request.readyState === XMLHttpRequest.DONE) {
          // Take some action
          if (request.status === 200) {
              alert('Registered successfully! Go ahead and Login!');
              register.value = 'Registered!';
          } else {
              alert('Could not register! Try Again!');
              register.value = 'Register';
          }
      }
    };


    var username = document.getElementById('r_un').value;
    var password = document.getElementById('r_pw').value;
    request.open('POST','/create-user', true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.send(JSON.stringify({username: username, password: password}));
};

var submit = document.getElementById('login_sub');
submit.onclick = function () {
  var username = document.getElementById('l_un').value;
  var password = document.getElementById('l_pw').value;

    var request = new XMLHttpRequest();

    request.onreadystatechange = function () {
      if (request.readyState === XMLHttpRequest.DONE) {

          if (request.status === 200) {
            alert('Credentials Valid!');
            call();
          } else if (request.status === 403) {
            alert('Invalid Credentials! Try again!');
          } else if (request.status === 500) {
              alert('Something went wrong on the server');
          } else {
              alert('Something went wrong on the server');
          }
      }
    }
    request.open('POST', '/login', true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.send(JSON.stringify({username: username, password: password}));
};

function call () {
  location.href="/ui/home.html";
}

function loadLoggedInUser (username) {
  alert(username);
  call();
}

function loadLogin () {
    // Check if the user is already logged in
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                loadLoggedInUser(this.responseText);
            }
        }
    };
    
    request.open('GET', '/check-login', true);
    request.send(null);
}

loadLogin();