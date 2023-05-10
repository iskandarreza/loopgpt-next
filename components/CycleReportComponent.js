import React from "react";
import { CycleProgress, DynamicReactJson } from "./MessagesComponent";
import { CycleNumberComponent } from "./CycleNumberComponent";

export function CycleReportComponent(message) {
  return <>
    <CycleNumberComponent cycleNumber={message.this_cycle.cycle} />
    {!!message.this_cycle.cycle_progress &&
      <CycleProgress progress={message.this_cycle.cycle_progress} />}
    <DynamicReactJson name={"this_cycle"} src={message.this_cycle} theme={"harmonic"} collapsed />
  </>;
}
