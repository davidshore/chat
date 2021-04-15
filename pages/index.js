import styles from '../styles/Home.module.css'
import { useEffect, useState } from 'react';

let websocket;

export default function Home() {

  useEffect(() => {
    connectToWebSocket();
  }, [])

  const [connected, setConnected] = useState(false);
  const [message, setMessage] = useState('');
  const [log, setLog] = useState([]);

  function sendMessage(e) {
    e.preventDefault();
    websocket.send(message);
    setMessage('');
  }

  function connectToWebSocket() {
    const url = 'ws://localhost:5555';
    websocket = new WebSocket(url);

    websocket.onopen = () => {
      console.log('websocket open');
      setConnected(true);
    }

    websocket.onmessage = (e) => {
      console.log(e.data);
      setLog(oldArray => [...oldArray, e.data]);
    }

    websocket.onclose = () => {
      console.log('websocket closed');
      setConnected(false);
    }

    websocket.onerror = (e) => {
      console.error(e);
    }
  }


  return (
    <div className={styles.container}>
      {connected ? 'connected' : 'offline'}
      <form onSubmit={sendMessage} >
        <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
        <button type="submit">Send</button>
      </form>
      <div style={{ marginTop: '20px', width: '500px', height: '300px', overflow: "scroll", border: '1px solid gray' }} >
        {log.map((item, index) => {
          return <div key={index}  >{item}</div>
        })}
      </div>
    </div>
  )
}
