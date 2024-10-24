var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Hi! Im Automated AEM GC Starter :)');
});

app.get('/gc', function (req, res) {
  res.send('Starting GC!');
  startGC();
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
  const intervalInMinutes = process.env.GARBAGE_COLLECTOR_INTERVAL;
  const INTERVAL = intervalInMinutes * 60 * 1000;
  setInterval(() => {
    console.log("Running Offline Compation!");
    startGC();
  }, INTERVAL);
});

async function initOfflineCompaction(host) {
  url = host + "/system/console/jmx/org.apache.jackrabbit.oak%3Aname%3Drepository+manager%2Ctype%3DRepositoryManagement/op/startDataStoreGC/boolean";
  fetch(url, {
      "headers": {
        "accept": "*/*",
        "cache-control": "no-cache",
        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
        "x-requested-with": "XMLHttpRequest",
        "Authorization": "Basic YWRtaW46YWRtaW4="
      },
      "referrer": "http://host.docker.internal:4502/system/console/jmx/org.apache.jackrabbit.oak%3Aname%3Drepository+manager%2Ctype%3DRepositoryManagement",
      "referrerPolicy": "strict-origin-when-cross-origin",
      "body": "markOnly=false",
      "method": "POST",
      "mode": "cors",
      "credentials": "include"
    })
    .then(data => console.log(data));
}

async function startGC() {
  await initOfflineCompaction("http://host.docker.internal:4502");
  await initOfflineCompaction("http://host.docker.internal:4503");
}