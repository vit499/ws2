//import "./App.css";
import "./bootstrap.css";
import { useEffect } from "react";
import wsStore from "./store/WsStore";
import Ws from "./components/Ws";

const App = () => {
  useEffect(() => {
    console.log("app init");
    wsStore.Init();
    return () => wsStore.Disconnect();
  }, []);

  return (
    <div>
      <Ws />
    </div>
  );
};

export default App;
