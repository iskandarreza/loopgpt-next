import React from 'react'
import { ListItem } from '@mui/material'
import dynamic from 'next/dynamic'
import { Paper } from '@mui/material'
import { InitStateComponent } from './InitStateComponent'
import { InitThoughtsComponent } from './InitThoughtsComponent'
import { CycleReportComponent } from './CycleReportComponent'
import { SystemMessageComponent } from './SystemMessageComponent'

export const DynamicReactJson = dynamic(import('react-json-view'), {
  ssr: false,
})

export const MessagesComponent = ({ messages }) => {
  return messages.map((message, index) => (
    <Paper
      key={message.id ? message.id : `${index}-${new Date().toISOString()}`}
    >
      <ListItem disableGutters={true}>
        {!!message.init_state && InitStateComponent(message)}
        {!!message.init_thoughts && InitThoughtsComponent(message)}
        {
          !!message.this_cycle && CycleReportComponent(message)
          // <span>{JSON.stringify(message.this_cycle)}</span>
          // .map(({k,v}, i) => {
          //   <span key={`${message.id}-${k}-${i}`}><strong>{k[i]}:</strong>{v[i]}</span>
          // })}
          // .map((key) => JSON.stringify([key, message.init_thoughts[key]]))
        }
        {!!message.message && SystemMessageComponent(message)}
      </ListItem>
    </Paper>
  ))
}

export const CycleProgress = ({ progress }) => {
  console.log(progress)
  let progressArr = progress.split(/\r?\n|\r|\n/g).map((s) => s.slice(2))
  console.log({ progressArr })

  return ''
}
