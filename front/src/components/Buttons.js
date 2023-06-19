import React from "react";
import { observer } from "mobx-react-lite";
import wsStore from "../store/WsStore";

const Buttons = observer(() => {
  return (
    <div className="mb-2">
      {wsStore._connectStatus !== "Connected" && (
        <button className="me-2" onClick={() => wsStore.wsTryConnect()}>
          Connect
        </button>
      )}
    </div>
  );
});

export default Buttons;
