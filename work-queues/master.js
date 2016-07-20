var nsq = require('nsqjs');

var w = new nsq.Writer('127.0.0.1', 4150);

w.connect();

w.on('ready', function () {
  w.publish('sample_topic', 'it really tied the room together');

  w.publish('sample_topic', [
    'Uh, excuse me. Mark it zero. Next frame.',
    'Smokey, this is not \'Nam. This is bowling. There are rules.'
  ]);

  w.publish('sample_topic', 'Wu?', function (err) {
    if (err) { return console.error(err.message); }
    console.log('Message sent successfully');
    w.close();
  });
});

w.on('closed', function () {
  console.log('Writer closed');
});
