import React from "react";
import { observer } from "mobx-react-lite";
import wsStore from "../store/WsStore";

const Mes = observer(() => {
  return <div>{wsStore.Message}</div>;
});

export default Mes;
