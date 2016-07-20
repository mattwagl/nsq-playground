const dockerNames = require('docker-names'),
      nsq = require('nsqjs');

const Reader = nsq.Reader;

const workerName = dockerNames.getRandomName();

const reader = new Reader('pubsub-queue', `worker-channel-${workerName}`, {
  lookupdHTTPAddresses: '192.168.99.100:4161'
});

reader.connect();

reader.on('message', function (msg) {
  console.log(`Worker ${workerName} received message: ${msg.id}`, msg.body.toString());

  setTimeout(() => {
    console.log(`Worker ${workerName} finishe message: ${msg.id}`);
    msg.finish();
  }, 0.1 * 1000);
});
