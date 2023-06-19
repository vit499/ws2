import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import wsStore from "../store/WsStore";

const OutMes = observer(() => {
  const [postContent, setPostContent] = useState("");
  const send = () => {
    wsStore.sendMessage(postContent);
    setPostContent("");
  };
  return (
    <div>
      <div>
        <textarea
          cols={40}
          value={postContent}
          onChange={(e) => setPostContent(e.target.value)}
        />
        <button style={{ marginLeft: "10px" }} onClick={() => send()}>
          {" > "}
        </button>
        {/* {wsStore._connectStatus === "Connected" && (
          <button
            style={{ marginLeft: "10px" }}
            onClick={() => wsStore.Disconnect()}
          >
            {" Dis"}
          </button>
        )} */}
      </div>
    </div>
  );
});

export default OutMes;
