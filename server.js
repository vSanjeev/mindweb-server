var  net = require('net');
var client = net.connect({port: 13854},
  function() {
    console.log('Connected to Neurosky MindWave Mobile');
  }
);

  client.write(JSON.stringify({
    "enableRawOutput": true,
    "format": "Json"
  }));

client.on('data', function(data) {

  try {
    var d = data.toString();
    // tokenize the received stream
    d = d.split('\r');
    // parse each token as JSON object
    d.forEach(function(item) { 
      var val = JSON.parse(item);
   
      if (val.eSense) {
        console.log(val);
      }
    });
  }
  catch (err) {}
});

client.on('end', function() {
  console.log('Neurosky MindWave Mobile disconnected');
});
