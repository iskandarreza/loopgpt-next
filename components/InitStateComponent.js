import React from "react";
import { Box, ListItemIcon, ListItemText } from "@mui/material";
import AddTaskIcon from '@mui/icons-material/AddTask';
import SettingsIcon from '@mui/icons-material/Settings';
import { DynamicReactJson } from "./MessagesComponent";
import { CycleNumberComponent } from "./CycleNumberComponent";

export function InitStateComponent(message) {
  return <>
    <CycleNumberComponent cycleNumber={message.init_state.cycle} />
    <Box sx={{ display: "flex", flexDirection: "column", padding: "16px" }}>

      <ListItemText>
        <Box sx={{ display: "flex" }}>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <DynamicReactJson name={"init_state"} src={message.init_state} theme={"harmonic"} collapsed />
        </Box>
      </ListItemText>

      <ListItemText>
        <Box sx={{ display: "flex" }}>
          <ListItemIcon>
            <AddTaskIcon />
          </ListItemIcon>
          <span>{message.init_state["goals"]}</span>
        </Box>
      </ListItemText>
    </Box>
  </>;
}
