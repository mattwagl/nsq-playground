const dockerNames = require('docker-names'),
      nsq = require('nsqjs');

const Reader = nsq.Reader;

const workerName = dockerNames.getRandomName();

const reader = new Reader('work-queue', 'worker-channel', {
  lookupdHTTPAddresses: '192.168.99.100:4161'
});

reader.connect();

reader.on('message', function (msg) {
  console.log(`Worker ${workerName} received message: ${msg.id}`, msg.body.toString());
  msg.finish();
});
