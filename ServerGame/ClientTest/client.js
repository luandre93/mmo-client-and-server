//---------------------client----------------------
var net = require("net");
// creating a custom socket client and connecting it....
var client = new net.Socket();
client.connect({
  port: 3000,
});

client.on("connect", function () {
  console.log("Client: connection established with server");

  console.log("---------client details -----------------");
  var address = client.address();
  var port = address.port;
  var family = address.family;
  var ipaddr = address.address;
  console.log("Client is listening at port" + port);
  console.log("Client ip :" + ipaddr);
  console.log("Client is IP4/IP6 : " + family);

  // writing data to server
  client.write("positionPlayer");
});

client.setEncoding("utf8");

client.on("data", function (data) {
  console.log("Data from server:" + data);
});

setTimeout(function () {
  client.end("Bye bye server");
}, 5000);
