const uws = require('uWebSockets.js');
const util = require('util');

const decoder = new util.TextDecoder();
const ROOM1 = 'ROOM1';
const PORT = 5555;

const app = uws.App().ws('/*', {

  open: (ws) => {
    ws.subscribe(ROOM1);
    console.log('user connected');
  },

  message: (ws, message) => {
    const decodedMsg = decoder.decode(message);
    ws.publish(ROOM1, decodedMsg);
  }
})

app.listen(PORT, (listenSocket) => {
  if (listenSocket) {
    console.log('Listening to port ' + PORT);
  }
});




