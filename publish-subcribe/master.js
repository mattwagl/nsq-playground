const nsq = require('nsqjs'),
      Writer = nsq.Writer;

const writer = new Writer('192.168.99.100', 4150);

let messageId = 0;

writer.connect();

writer.on('ready', () => {
  setInterval(() => {
    console.log(`Do some work, slave! ${messageId}`);
    writer.publish('pubsub-queue', `Do some work, slave! ${messageId}`,  err => {
      if (err) { return console.error(err.message); }
      console.log('Message sent successfully');
    });
    messageId++;
  }, 1 * 1000);
});

writer.on('closed', function () {
  console.log('Writer closed');
});

process.on('exit', () => {
  writer.close();
});
