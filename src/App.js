import './App.css';
import { useEffect, useState } from "react";
import { HubConnectionBuilder } from '@microsoft/signalr';
import { Card, ProgressBar } from "react-bootstrap";

function App() {
  const [hubConnection, setHubConnection] = useState(null);
  const [quantity, setQuantity] = useState(0);
  

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
          hubConnection.on('ReceiveMessage', message => {
            setQuantity(message)
            console.log(message);
          });

        })
        .catch(e => console.log('Connection failed: ', e));
    }
  }, [hubConnection]);

  return (
    <div className="App">
      <Card
        bg={"success"}
        style={{ width: '18rem' }}
        className="mb-2"
        text={'white'}
        style={{ width: '18rem' }}
      >
        <Card.Header>SignalR Rocks!</Card.Header>
        <Card.Body>
          <Card.Title> Quantidade Atual </Card.Title>
          <Card.Text style={{fontSize: 62}}>
            {quantity}
          </Card.Text>
          <ProgressBar now={quantity} />
        </Card.Body>
      </Card>
    </div>
  );
}

export default App;
