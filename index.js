var express = require('express')
var bodyParser = require('body-parser')
var request = require('request')
var app = express()

var sql = require('mssql')
var sqlInstance = require("mssql")
var nodemailer = require('nodemailer')

app.use(bodyParser.json())

app.set('port', (process.env.PORT || 4000))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

var dbConfig = {
    user: 'sa',
    password: 'P@ssw0rd1234',
    server: 'demomagic2.southeastasia.cloudapp.azure.com', 
    database: 'LinebotDB',
    port:1433,
    options: {
        encrypt: false // Use this if you're on Windows Azure
    }                      
};

app.post('/webhook', (req, res) => {
    var msg = req.body.events[0].message.text
    var sender = req.body.events[0].source.userId
    var replyToken = req.body.events[0].replyToken
    console.log(text, sender, replyToken)
    console.log(typeof sender, typeof text)
    var conn = new sql.ConnectionPool(dbConfig);
    conn.connect().then(function () {
                  var req = new sql.Request(conn);
                  req.query('SELECT * FROM Question').then(function (recordset) {
                    
        res.sendStatus(200)
  })
  
  function sendText (sender, msg) {
    let data = {
      to: sender,
      messages: [
        {
          type: 'text',
          text: 'สวัสดีค่ะ'
        }
      ]
    }
    request({
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer {Rz8z1ee8jjPGKgYsiVruxdBDpWA4ryYEh5QKu7KLtb4o1HN3h38LHyWUEoWYOGVolNmGP1fFw7UbxocelHU/0Y/j+b2/jch/cpqEW6dhyi8smlFI+vsQVttuzLtCZPHm5K7MNg39sFK7Z8jWxhv7ngdB04t89/1O/w1cDnyilFU=}'
      },
      url: 'https://api.line.me/v2/bot/message/push',
      method: 'POST',
      body: data,
      json: true
    }, function (err, res, body) {
      if (err) console.log('error')
      if (res) console.log('success')
      if (body) console.log(body)
    })
  }
  
  app.listen(app.get('port'), function () {
    console.log('run at port', app.get('port'))
  })

    })
    .catch(function (err) {
        conn.close();
        res.send(err);
    });        
    })
    .catch(function (err) {
    res.send(err);
    });
    
    app.listen(port, function() {
      console.log('Starting node.js on port ' + port);
  });
