import React from 'react'
import ScrollableFeed from 'react-scrollable-feed'
import { ListItem } from '@mui/material'
import { Paper } from '@mui/material'
import { CycleReportComponent } from './CycleReportComponent'
import { SystemMessageComponent } from './SystemMessageComponent'
import { useSelector } from 'react-redux'
import { InitMessageComponent } from './InitMessageComponent'

export const MessagesComponent = () => {
  const messages = useSelector((state) => state.uiStates.messages)
  const configState = useSelector((state) => state.configState)
  return (
    <ScrollableFeed>
      {messages.map((message, index) => (
        <Paper
          sx={{ margin: '16px auto' }}
          key={message.id ? message.id : `${index}-${new Date().toISOString()}`}
        >
          <ListItem disableGutters={true}>
            {!!message.init_state &&
              (message.init_state.maxcycles = configState.settings.maxcycles) &&
              InitMessageComponent(message.init_state)}
            {!!message.init_resp && CycleReportComponent(message.init_resp)}
            {!!message.run_tool && CycleReportComponent(message.run_tool)}
            {!!message.message && SystemMessageComponent(message.message)}
          </ListItem>
        </Paper>
      ))}
    </ScrollableFeed>
  )
}
