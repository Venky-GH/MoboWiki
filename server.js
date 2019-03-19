var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;
var bodyParser = require('body-parser');
var crypto = require('crypto');
var getBootstrapNode = require('bootstrap-node');
var bootstrapNode = getBootstrapNode();
var md5 = require('md5');
var session = require('express-session');

var config = {
    // user: 'Mobowiki',
    // database: 'Mobowiki',
    // host: 'mobowiki.cvn4jmb3rmul.us-east-1.rds.amazonaws.com',
    // password: 'Mobowiki'
    user: 'postgres',
    database: 'Mobowiki',
    host: 'localhost',
    password: 'abcd@123456'
};

var app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(session({
    secret: 'someRandomSecretValue',
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 30}
}));

/*function hash (input, salt) {
    // How do we create a hash?
    var hashed = crypto.pbkdf2Sync(input, salt, 10000, 512, 'sha512');
    return ["pbkdf2", "10000", salt, hashed.toString('hex')].join('$');
}*/

var pool = new Pool(config);

app.post('/create-user', function (req, res) {
   var username = req.body.username;
   var password = req.body.password;
   //var salt = crypto.randomBytes(128).toString('hex');
   var dbString = md5(password);
   pool.query('INSERT INTO "user" (username, password) VALUES ($1, $2)', [username, dbString], function (err, result) {
      if (err) {
          res.status(500).send(err.toString());
      } else {
          res.send('User successfully created: ' + username);
      }
   });
});

app.post('/login', function (req, res) {
   var username = req.body.username;
   var password = req.body.password;

   pool.query('SELECT * FROM "user" WHERE username = $1', [username], function (err, result) {
      if (err) {
          res.status(500).send(err.toString());
      } else {
          if (result.rows.length === 0) {
              res.status(403).send('username/password is invalid');
          } else {
              // Match the password
              var dbString = result.rows[0].password;
              //var salt = dbString.split('$')[2];
              var hashedPassword = md5(password); // Creating a hash based on the password submitted and the original salt
              if (hashedPassword === dbString) {

                // Set the session
                req.session.auth = {userId: result.rows[0].id};
                // set cookie with a session id
                // internally, on the server side, it maps the session id to an object
                // { auth: {userId }}

                res.send('credentials correct!');

              } else {
                res.status(403).send('username/password is invalid');
              }
          }
      }
   });
});

app.get('/check-login', function (req, res) {
   if (req.session && req.session.auth && req.session.auth.userId) {
       // Load the user object
       pool.query('SELECT * FROM "user" WHERE id = $1', [req.session.auth.userId], function (err, result) {
           if (err) {
              res.status(500).send(err.toString());
           } else {
              res.send(result.rows[0].username);
           }
       });
   } else {
       res.status(400).send('You are not logged in');
   }
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'modal.html'));
});

app.get('/clearwl', function (req, res) {
  pool.query('DELETE FROM "user_info" WHERE user_id = $1', [req.session.auth.userId], function (err, result) {
    if(err) {
      res.status(500).send(err.toString());
    } else {
      res.status(200).send("Deleted successfully!");
    }
  });
});

app.post('/removewl', function (req, res) {
  var wid = req.body.wishlist_id;
  pool.query('DELETE FROM "user_info" WHERE user_id = $1 AND wishlist_id = $2', [req.session.auth.userId, wid], function (err, result) {
    if(err) {
      res.status(500).send(err.toString());
    } else {
      res.status(200).send('Removed successfully!');
    }
  });
});

app.post('/addwl', function (req, res) {
  var wd = req.body.wishlist_id;
  pool.query('INSERT INTO "user_info" (user_id, wishlist_id) VALUES ($1, $2)', [req.session.auth.userId, wd], function (err, result) {
    if(err) {
      res.status(500).send(err.toString());
    } else {
      res.status(200).send('Added successfully!');
    }
  });
});

app.post('/addcomment', function (req, res) {
  var pid = req.body.phone_id;
  var com = req.body.comment;
  pool.query('INSERT INTO "comment" (user_id,comment,phone_id) VALUES ($1, $2, $3)', [req.session.auth.userId, com, pid], function (err ,result) {
    if (err) {
      res.status(500).send(err.toString());
    } else {
      res.status(200).send('Added successfully!');
    }
  });
});

app.get('/logout', function (req, res) {
   delete req.session.auth;
   res.status(200).send('Logged out!');
});

app.post('/dispcom', function (req, res) {
  var pd = req.body.phone_id;
  pool.query('SELECT * FROM "complete_view" WHERE phone_id = $1 ORDER BY created DESC LIMIT 4', [pd], function (err, result) {
    if (err) {
      res.status(500).send(err.toString());
    } else {
      res.status(200).send(JSON.stringify(result.rows));
    }
  });
});

app.get('/welcome', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'home.html'));
});

app.get('/showwl', function (req, res) {
  pool.query('SELECT * FROM "view_try" WHERE user_id = $1', [req.session.auth.userId], function (err, result) {
    if (err) {
      res.status(500).send(err.toString());
    }
    else {
      res.status(200).send(JSON.stringify(result.rows));
    }
  });
});

app.get('/ui/:fileName', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', req.params.fileName));
});

app.get('/apple/:fileName', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'apple', req.params.fileName));
});

app.get('/samsung/:fileName', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'samsung', req.params.fileName));
});

app.get('/htc/:fileName', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'htc', req.params.fileName));
});

app.get('/google/:fileName', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'google', req.params.fileName));
});

app.get('/lg/:fileName', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'lg', req.params.fileName));
});

app.get('/oneplus/:fileName', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'oneplus', req.params.fileName));
});

app.get('/oppo/:fileName', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'oppo', req.params.fileName));
});

app.get('/lenovo/:fileName', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'lenovo', req.params.fileName));
});

app.get('/xiaomi/:fileName', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'xiaomi', req.params.fileName));
});

app.get('/huawei/:fileName', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'huawei', req.params.fileName));
});

app.get('/moto/:fileName', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'moto', req.params.fileName));
});

app.get('/sony/:fileName', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'sony', req.params.fileName));
});

app.listen(9090, function () {
  console.log('App listening on port 9090!');
});
