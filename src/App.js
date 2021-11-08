import './App.css';
import { useEffect, useState } from "react";
import { HubConnectionBuilder } from '@microsoft/signalr';

function App() {
  const [hubConnection, setHubConnection] = useState(null);

  useEffect(() => {
    const hubConnection = new HubConnectionBuilder()
      .withUrl('https://localhost:5001/signalrhub')
      .withAutomaticReconnect()
      .build();
    setHubConnection(hubConnection);
  }, []);

  useEffect(() => {
    if (hubConnection) {
      hubConnection.start()
        .then(result => {
          console.log('Connected!');
        })
        .catch(e => console.log('Connection failed: ', e));
    }
  }, [hubConnection]);

  return (
    <div className="App">
      <h1>SignalR Works</h1>
    </div>
  );
}

export default App;
