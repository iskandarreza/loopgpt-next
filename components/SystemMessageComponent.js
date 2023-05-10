import React from "react";
import { Alert } from "@mui/material";

export function SystemMessageComponent(message) {
  return <>
    {/* <span>{message.this_cycle.cycle}</span>  */}

    <Alert severity="info">{message.message.content}</Alert>
  </>;
}
