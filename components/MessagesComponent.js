import React from 'react'
import { ListItem } from '@mui/material'
import dynamic from 'next/dynamic'
import { Paper } from '@mui/material'
import { InitStateComponent } from './InitStateComponent'
import { InitThoughtsComponent } from './InitThoughtsComponent'
import { CycleReportComponent } from './CycleReportComponent'
import { SystemMessageComponent } from './SystemMessageComponent'

export const MessagesComponent = ({ messages }) => {
  return messages.map((message, index) => (
    <Paper
      sx={{ margin: '16px auto' }}
      key={message.id ? message.id : `${index}-${new Date().toISOString()}`}
    >
      <ListItem disableGutters={true}>
        {!!message.init_state && InitStateComponent(message)}
        {!!message.init_thoughts && InitThoughtsComponent(message)}
        {!!message.this_cycle && CycleReportComponent(message)}
        {!!message.message && SystemMessageComponent(message)}
      </ListItem>
    </Paper>
  ))
}
