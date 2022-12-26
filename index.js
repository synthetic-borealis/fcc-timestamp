// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


app.get("/api/:date", function (req, res) {
  const { date } = req.params;
  const ticksRegex = /\d{5,}/g;
  if (ticksRegex.test(date)) {
    const time = new Date(parseInt(date));
    res.json({
      unix: time.getTime(),
      utc: time.toUTCString(),
    });
  } else if (Number.isNaN(Date.parse(date))) {
    res.json({
      error: 'Invalid Date',
    });
  } else {
    const time = new Date(date);
    res.json({
      unix: time.getTime(),
      utc: time.toUTCString(),
    });
  }
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
