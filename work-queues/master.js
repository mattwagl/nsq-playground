var nsq = require('nsqjs');

var reader = new nsq.Reader('sample_topic', 'test_channel', {
  lookupdHTTPAddresses: '127.0.0.1:4161'
});

reader.connect();

reader.on('message', function (msg) {
  console.log('Received message [%s]', msg.id);

  function touch() {
    if (!msg.hasResponded) {
      console.log('Touch [%s]', msg.id);
      msg.touch();
      // Touch the message again a second before the next timeout.
      setTimeout(touch, msg.timeUntilTimeout() - 1000);
    }
  }

  function finish() {
    console.log('Finished message [%s]: %s', msg.id, msg.body.toString());
    msg.finish();
  }

  console.log('Message timeout is %f secs.', msg.timeUntilTimeout() / 1000);
  setTimeout(touch, msg.timeUntilTimeout() - 1000);

  // Finish the message after 2 timeout periods and 1 second.
  setTimeout(finish, msg.timeUntilTimeout() * 2 + 1000);
});
