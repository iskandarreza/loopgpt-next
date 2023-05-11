import React from 'react'
import AddTaskIcon from '@mui/icons-material/AddTask'
import SettingsIcon from '@mui/icons-material/Settings'
import { DynamicReactJson } from '@/pages/chat'
import { CycleNumberComponent } from './shared/CycleNumberComponent'
import { CycleStageContainer } from './shared/CycleStageContainer'
import { IconListLine } from './shared/IconListLine'

export function InitStateComponent(message) {
  return (
    <CycleStageContainer>
      <CycleNumberComponent cycleNumber={message.init_state.cycle} />
      <IconListLine icon={<SettingsIcon />}>
        <span>State: </span>
        <DynamicReactJson
          name={'init_state'}
          src={message.init_state}
          theme={'harmonic'}
          collapsed
        />
      </IconListLine>
      <IconListLine icon={<AddTaskIcon />}>
        <span>Goals: {message.init_state['goals']}</span>
      </IconListLine>
    </CycleStageContainer>
  )
}
