var nsq = require('nsqjs');

var reader = new nsq.Reader('work-queue', 'worker-channel', {
  lookupdHTTPAddresses: '127.0.0.1:4161'
});

reader.connect();

reader.on('message', function (msg) {
  console.log('Received message [%s]', msg.id, msg.body.toString());
  msg.finish();
});
