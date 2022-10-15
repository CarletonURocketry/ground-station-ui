import "./App.css";
import Title from "./components/Title";
import { useWebsocket } from "./hooks/useWebsocket";

function App() {
  const [data, setData] = useWebsocket("ws://localhost:33845/websocket");

  return (
    <div id="App">
      <Title />
      <p>{JSON.stringify(data)}</p>
    </div>
  );
}

export default App;
